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

const computeResults = (term) => {
  const terms = (term || "")
    .toLowerCase()
    .split(/[^\w._-]/)
    .filter((s) => !!s.trim());
  const matchedAccountIds = [];
  const matchedApps = [];

  const limit = props.limit ?? 10;

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
  const people = matchedAccountIds.slice(0, limit);

  Object.entries(appKeys).forEach(([accountId, data]) => {
    const accountIdScore = computeScore(accountId);
    Object.keys(data.widget).forEach((componentId) => {
      const componentIdScore = computeScore(componentId);
      const metadata = allAppMetadata[accountId].widget[componentId].metadata;
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
  const apps = matchedApps.slice(0, limit);

  State.update({
    term,
    people,
    apps,
  });

  if (props.onChange) {
    props.onChange({ term, people, apps });
  }
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
          state.people.map((accountId, i) => <li key={i}>{accountId}</li>)}
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
  </div>
);
