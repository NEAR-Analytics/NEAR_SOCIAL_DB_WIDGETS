const profiles =
  Social.get(["*/profile/name", "*/profile/tags/*"], "final") || {};

const appMetadata =
  Social.get(
    ["*/widget/*/metadata/name", "*/widget/*/metadata/tags/*"],
    "final"
  ) || {};

const appKeys =
  Social.keys(["*/widget/*"], "final", { values_only: true }) || {};

const appFilterTag = "app";
const limitPerGroup = 10;

const computeResults = (term) => {
  const terms = (term || "")
    .toLowerCase()
    .split(/[^\w._-]/)
    .filter((s) => !!s.trim());

  const matchedAccountIds = [];
  const matchedApps = [];
  const MaxSingleScore = 20;
  const MaxScore = MaxSingleScore * 3;

  const computeScore = (s) => {
    s = s.toLowerCase();
    return (
      terms
        .map((term) => {
          const pos = s.indexOf(term);
          return pos >= 0 ? Math.max(1, 20 - pos) : 0;
        })
        .reduce((s, v) => s + v, 0) / terms.length
    );
  };

  // Search people:

  Object.entries(profiles).forEach(([accountId, data]) => {
    const accountIdScore = computeScore(accountId);
    const name = data.profile.name || "";
    const tags = Object.keys(data.profile.tags || {}).slice(0, 10);
    const nameScore = computeScore(name);
    const tagsScore = Math.min(
      20,
      tags.map(computeScore).reduce((s, v) => s + v, 0)
    );
    const score = (accountIdScore + nameScore + tagsScore) / MaxScore;
    if (score > 0) {
      matchedAccountIds.push({ score, accountId, name, tags });
    }
  });

  matchedAccountIds.sort((a, b) => b.score - a.score);
  const people = matchedAccountIds.slice(0, limitPerGroup);

  // Search apps:

  Object.entries(appKeys).forEach(([accountId, data]) => {
    const accountIdScore = computeScore(accountId);
    Object.keys(data.widget).forEach((componentId) => {
      const componentIdScore = computeScore(componentId);
      const metadata = appMetadata[accountId].widget[componentId].metadata;
      const name = metadata.name || "";
      if (appFilterTag && !(metadata.tags && appFilterTag in metadata.tags)) {
        return;
      }
      const tags = Object.keys(metadata.tags || {}).slice(0, 10);
      const nameScore = computeScore(name);
      const tagsScore = Math.min(
        20,
        tags.map(computeScore).reduce((s, v) => s + v, 0)
      );
      const score =
        (accountIdScore / 2 + componentIdScore + nameScore + tagsScore) /
        MaxScore;
      if (score > 0) {
        matchedApps.push({
          score,
          accountId,
          widgetName: componentId,
          widgetSrc: `${accountId}/widget/${componentId}`,
          name,
          tags,
        });
      }
    });
  });

  matchedApps.sort((a, b) => b.score - a.score);
  const apps = matchedApps.slice(0, limitPerGroup);

  // Update state:

  State.update({
    term,
    people,
    apps,
  });
};

return (
  <div>
    <div>
      <input
        type="text"
        value={state.term ?? ""}
        onChange={(e) => computeResults(e.target.value)}
        placeholder="Search..."
      />
      {state.term && (
        <button type="button" onClick={() => computeResults("")}>
          Clear
        </button>
      )}
    </div>

    <div>
      <p>People:</p>

      <ul>
        {state.people &&
          state.people.map((person, i) => (
            <li key={i}>
              {person.name}, {person.accountId}
            </li>
          ))}
      </ul>
    </div>

    <div>
      <p>Applications:</p>

      <ul>
        {state.apps &&
          state.apps.map((app, i) => (
            <li key={i}>
              {app.widgetName}, {app.accountId}
            </li>
          ))}
      </ul>
    </div>

    {props.debug && (
      <div>
        <p>Debug Data:</p>
        <pre>{JSON.stringify(state, undefined, 2)}</pre>
      </div>
    )}
  </div>
);
