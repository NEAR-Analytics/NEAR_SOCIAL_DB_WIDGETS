const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;
const roleId = props.roleId ?? "Council";
const daoId = props.daoId ?? "cannabis-genome.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}
const deposit = policy.proposal_bond;

const group = policy.roles
  .filter((role) => role.name === roleId)
  .map((role) => role.kind.Group);

State.init({
  isMember: false,
});

const groupMembers = group.join(", ");

const checkMembership = (groupMembers) => {
  if (groupMembers.indexOf(memberId) !== -1) {
    return State.update({ isMember: true });
  }
};

const validMember = checkMembership(groupMembers);

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "add member to DAO",
          kind: {
            AddMemberToRole: {
              member_id: memberId,
              role: roleId,
            },
          },
        },
      },
      gas: 300000000000000,
      deposit: deposit,
    },
  ]);
};

return (
  <div>
    {accountId ? (
      <div>
        {!validMember ? (
          <button className="btn btn-success m-1" onClick={handleProposal}>
            Join DAO
          </button>
        ) : (
          <a
            className="btn btn-outline-success m-1"
            href="#/hack.near/widget/verified.members"
          >
            Members
          </a>
        )}
      </div>
    ) : (
      <Widget
        src="near/widget/DIG.Button"
        props={{
          href: "https://near.org/signup",
          label: "Create Account",
          variant: "outline-dark",
          size: "large",
        }}
      />
    )}
  </div>
);
