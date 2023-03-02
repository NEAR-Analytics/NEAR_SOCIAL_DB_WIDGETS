const accountId = props.accountId || context.accountId;
const daoId = props.daoId ?? "global.sputnik-dao.near";

const groupId = props.groupId ?? "community";
const policy = Near.view(daoId, "get_policy");

const members = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => {
    const members = role.kind.Group;

    return members;
  });

return (
  <>
    <div>
      <h3>{groupId}</h3>
      <div>
        {members.map((member, i) => (
          <a
            key={i}
            className="text-decoration-none"
            href={`#mob.near/widget/ProfilePage?accountId=${member}`}
          >
            <h4>{member}</h4>
          </a>
        ))}
      </div>
    </div>
    <div>
      <a href="https://near.social/#/hack.near/widget/Groups">
        <button className="btn btn-primary mt-2">See All Groups</button>
      </a>
    </div>
  </>
);
