const profiles =
  Social.get(["*/profile/name", "*/profile/tags/*"], "final") || {};

const profilesWithTags = { ...profiles };
Object.entries(profiles).forEach(([key, valueObj]) => {
  if (!valueObj?.profile?.hasOwnProperty("tags")) {
    delete profilesWithTags[key];
  }
});
const taggedProfiles = Social.keys(`*/profile/tags/*`, "final") || {};

// console.log("private", taggedProfiles);

const computeResults = (term) => {
  const terms = (term || "")
    .toLowerCase()
    .split(/[^\w._-]/)
    .filter((s) => !!s.trim());
  const matchedAccountIds = [];

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
    // const accountIdScore = computeScore(accountId);
    const accountIdScore = computeScore(accountId);
    // console.log(type(accountID));

    const name = data.profile.name || "";
    const tags = Object.keys(data.profile.tags || {}).slice(0, 10);
    // const nameScore = computeScore(name);
    const tagsScore = Math.min(
      20,
      tags.map(computeScore).reduce((s, v) => s + v, 0)
    );
    let score;
    // score = tagsScore;     // score = nameScore;
    score = accountIdScore;

    const finalScore = score / MaxScore;
    if (finalScore > 0) {
      matchedAccountIds.push({ score: finalScore, accountId, name, tags });
    }
  });

  matchedAccountIds.sort((a, b) => b.score - a.score);
  const result = matchedAccountIds.slice(0, limit);

  State.update({
    term,
    result,
  });

  if (props.onChange) {
    props.onChange({ term, result });
  }
};

let hardCodeSearch = "sputnik-dao.near";
computeResults(hardCodeSearch);

return (
  <>{props.debug && <pre>{JSON.stringify(state.result, undefined, 2)}</pre>}</>
);
