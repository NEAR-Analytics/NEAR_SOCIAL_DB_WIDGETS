const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "global.sputnik-dao.near";

const group = props.groupId ?? "community";
const policy = Near.view(daoId, "get_policy");

const data = Social.keys("*/profile", "final");

if (!data) {
  return "Loading...";
}

const accounts = Object.entries(data);
const allMembers = [];

for (let i = 0; i < accounts.length; ++i) {
  const memberId = accounts[i][0];

  allMembers.push(
    <div className="mb-2">
      <Widget src="mob.near/widget/Profile" props={{ memberId }} />
    </div>
  );
}

const members = policy.roles
  .filter((role) => role.name === group)
  .map((role) => {
    const members = role.kind.Group;

    return members;
  });

const memberId = policy.roles
  .filter((role) => role.name === group)
  .map((role) => {
    const memberId = role.kind.Group;

    return memberId;
  });

return (
  <div>
    <h3>Groups:</h3>
    <h4>{group}</h4>
    <Widget
      src="mob.near/widget/Profile"
      props={{
        tooltip: true,
        accountId: members,
      }}
    />
    <div className="mb-2">
      {members.map(({ accountId }, i) => (
        <div
          key={i}
          className="d-flex justify-content-between align-items-center mb-3"
        >
          <div className="mt-2 text-truncate">
            <a
              href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
              className="text-decoration-none link-dark text-truncate"
            >
              <Widget
                src="mob.near/widget/Profile.InlineBlock"
                props={{ accountId }}
              />
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);
