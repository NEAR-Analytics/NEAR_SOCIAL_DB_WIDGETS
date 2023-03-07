const ownerId = "contribut3.near";
const search = props.search ?? "";
const accountId = props.accountId;
const cid = props.cid;
const limit = 10;

State.init({
  contributors: [],
  shown: [],
  from: 0,
  hasMore: true,
});

const allContributors = (
  accountId
    ? Object.keys(
      Near.view(
        ownerId,
        cid ? "get_need_contributions" : "get_entity_contributions",
        { account_id: accountId, ...(cid ? { cid } : {}) },
        "final",
        false
      ) ?? {}
    )
    : Near.view(ownerId, "get_contributors", {}, "final", false) ?? []
).filter((id) => id.includes(search));

if (state.contributors.length === 0) {
  Near.asyncView(
    ownerId,
    accountId
      ? cid
        ? "get_need_contributions"
        : "get_entity_contributions"
      : "get_contributors",
    {
      ...(accountId ? { account_id: accountId } : {}),
      ...(cid ? { cid } : {}),
    },
    "final",
    false
  ).then((contributors) => {
    State.update({
      contributors: contributors.sort(),
      shown: contributors.slice(0, limit),
      from: limit,
      hasMore: contributors.length > limit,
    });
  });
}

if (!allContributors || allContributors.length === 0) {
  return "No contributors found!";
}

return (
  <>
    {allContributors.map((id) => (
      <div key={id} className="mb-2">
        <Widget
          src={`${ownerId}/widget/Contributor`}
          props={{ accountId: id, update: props.update }}
        />
      </div>
    ))}
  </>
);
