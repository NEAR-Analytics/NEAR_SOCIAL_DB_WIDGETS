const accountId = props.accountId ?? "devs.near";

if (!accountId) {
  return "Please connect your NEAR account :)";
}

const daoId = props.daoId ?? "build.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}

const groups = policy.roles
  .filter((role) => role.kind.Group)
  .map((role) => ({
    name: role.name,
    members: role.kind.Group,
  }));

const membership = groups[1].members;
const totalMembership = membership.length;

return (
  <div className="py-1 px-1">
    <div className="d-flex justify-content-between mb-3">
      <div className="m-2">
        <div className="m-2">
          <Widget
            src="devs.near/widget/dev.profile"
            props={{
              accountId: daoId,
            }}
          />
        </div>
        <div className="m-2">
          <h5 className="mt-3">{totalMembership} Members</h5>
          <Widget
            src="mob.near/widget/FollowStats"
            props={{ accountId: daoId }}
          />
        </div>
      </div>
      <div className="m-2">
        <Widget
          src="devs.near/widget/dev.info"
          props={{ accountId, daoId, role: "community" }}
        />
      </div>
    </div>
    <h2 className="mb-3">
      <b>Explore Community</b>
    </h2>
    <h3 className="m-1">Join Builder Groups</h3>

    <div className="m-3 d-flex gap-2 flex-wrap">
      {groups.map((group, i) => (
        <Widget
          key={i}
          src="hack.near/widget/DAO.AddMember"
          props={{
            daoId: daoId,
            accountId: accountId,
            memberId: state.memberId,
            roleId: group.name,
          }}
        />
      ))}
    </div>
    <h3 className="m-1">Connect with Builders</h3>
    <div className="mt-3">
      <Widget
        src="mob.near/widget/FollowTabs"
        props={{ accountId, tab: "following" }}
      />
    </div>
  </div>
);
