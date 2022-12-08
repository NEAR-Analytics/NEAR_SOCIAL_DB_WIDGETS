const profiles =
  Social.get(["*/profile/name", "*/profile/tags/*"], "final") || {};

const terms = (state.search || "")
  .toLowerCase()
  .split(/[^\w._-]/)
  .filter((s) => !!s.trim());
const matchedAccountIds = [];
const debug = props.debug;
const limit = props.limit ?? 30;

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
const result = matchedAccountIds.slice(0, limit);

if (props.onChange && state.search) {
  props.onChange({ term: state.search, result });
}

return (
  <>
    <input
      type="text"
      className="form-control"
      value={state.search ?? ""}
      onChange={(e) => State.update({ search: e.target.value })}
      placeholder="🔍 Search People"
    />
    {debug && <pre>{JSON.stringify(result, undefined, 2)}</pre>}
  </>
);
