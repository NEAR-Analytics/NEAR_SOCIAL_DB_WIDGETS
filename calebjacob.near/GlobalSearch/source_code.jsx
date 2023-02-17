const profiles =
  Social.get(["*/profile/name", "*/profile/tags/*"], "final") || {};

const appMetadata =
  Social.get(
    ["*/widget/*/metadata/name", "*/widget/*/metadata/tags/*"],
    "final"
  ) || {};

const appKeys =
  Social.keys(["*/widget/*"], "final", { values_only: true }) || {};

const boostedAppTag = "app";
const requiredAppTag = null;
const limitPerGroup = 5;

const computeResults = (term) => {
  const terms = (term || "")
    .toLowerCase()
    .split(/[^\w._-]/)
    .filter((s) => !!s.trim());

  State.update({
    term,
    people: computePeople(terms),
    apps: computeApps(terms),
  });
};

const computeApps = (terms) => {
  const results = [];
  const MaxSingleScore = 1;
  const MaxScore = MaxSingleScore * 4;

  const computeScore = (s) => {
    s = s.toLowerCase();
    return (
      terms
        .map((term) => {
          const pos = s.indexOf(term);
          return pos >= 0 ? Math.exp(-pos) : 0;
        })
        .reduce((s, v) => s + v, 0) / terms.length
    );
  };

  Object.entries(appKeys).forEach(([accountId, data]) => {
    Object.keys(data.widget).forEach((componentId) => {
      const widgetSrc = `${accountId}/widget/${componentId}`;
      const widgetSrcScore = computeScore(widgetSrc);
      const componentIdScore = computeScore(componentId);
      const metadata = appMetadata[accountId].widget[componentId].metadata;
      const name = metadata.name || componentId;

      if (
        requiredAppTag &&
        !(metadata.tags && requiredAppTag in metadata.tags)
      ) {
        return;
      }

      const boosted =
        boostedAppTag && metadata.tags && boostedAppTag in metadata.tags;
      const tags = Object.keys(metadata.tags || {}).slice(0, 10);
      const nameScore = computeScore(name);
      const tagsScore = Math.min(
        MaxSingleScore,
        tags.map(computeScore).reduce((s, v) => s + v, 0)
      );
      const score =
        (widgetSrcScore + componentIdScore + nameScore + tagsScore) / MaxScore;

      if (score > 0) {
        results.push({
          score,
          accountId,
          widgetName: componentId,
          widgetSrc,
          name,
          tags,
          boosted,
        });
      }
    });
  });

  results.sort(
    (a, b) => (b.boosted ? 2 : 0) + b.score - (a.boosted ? 2 : 0) - a.score
  );

  return results.slice(0, limitPerGroup);
};

const computePeople = (terms) => {
  const results = [];
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
      results.push({ score, accountId, name, tags });
    }
  });

  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limitPerGroup);
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

    {state.term && (
      <>
        {state.people?.length > 0 && (
          <div>
            <p>People:</p>

            <ul>
              {state.people.map((person, i) => (
                <li key={i}>
                  <a
                    href={`/#/calebjacob.near/widget/ProfilePage?accountId=${person.accountId}`}
                  >
                    {person.name}, {person.accountId}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {state.apps?.length > 0 && (
          <div>
            <p>Applications:</p>

            <ul>
              {state.apps.map((app, i) => (
                <li key={i}>
                  <a
                    href={`/#/calebjacob.near/widget/ComponentDetailsPage?src=${app.accountId}/widget/${app.widgetName}`}
                  >
                    {app.widgetName}, {app.accountId}
                    <br />
                    {app.tags.join(", ")}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )}

    {state.term && state.apps?.length === 0 && state.people?.length === 0 && (
      <p>No people or applications match your search.</p>
    )}

    {props.debug && (
      <div>
        <p>Debug Data:</p>
        <pre>{JSON.stringify(state, undefined, 2)}</pre>
      </div>
    )}
  </div>
);
