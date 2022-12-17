const allMetadata =
  Social.get(
    ["*/widget/*/metadata/name", "*/widget/*/metadata/tags/*"],
    "final"
  ) || {};
const keys = Social.keys(["*/widget/*"], "final", { values_only: true }) || {};

const requiredTag = props.filterTag;
const inputTerm = props.term;

const computeResults = (term) => {
  const terms = (term || "")
    .toLowerCase()
    .split(/[^\w._-]/)
    .filter((s) => !!s.trim());

  const matchedWidgets = [];

  const limit = props.limit ?? 30;

  const MaxSingleScore = 20;
  const MaxScore = MaxSingleScore * 3.5;

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

  Object.entries(keys).forEach(([accountId, data]) => {
    const accountIdScore = computeScore(accountId);
    Object.keys(data.widget).forEach((componentId) => {
      const componentIdScore = computeScore(componentId);
      const metadata = allMetadata[accountId].widget[componentId].metadata;
      const name = metadata.name || "";
      if (requiredTag && !(metadata.tags && requiredTag in metadata.tags)) {
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
        matchedWidgets.push({
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

  matchedWidgets.sort((a, b) => b.score - a.score);
  const result = matchedWidgets.slice(0, limit);

  State.update({
    term,
    result,
  });

  if (props.onChange) {
    props.onChange({ term, result });
  }
};

if (props.term && props.term !== state.oldTerm) {
  State.update({
    oldTerm: props.term,
  });
  if (props.term !== state.term) {
    computeResults(props.term);
  }
}

return (
  <>
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        value={state.term ?? ""}
        onChange={(e) => computeResults(e.target.value)}
        placeholder={props.placeholder ?? `🔍 Search Components`}
      />

      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => computeResults("")}
      >
        <i className="bi bi-x"></i>
      </button>
    </div>
    {props.debug && <pre>{JSON.stringify(state.result, undefined, 2)}</pre>}
  </>
);
