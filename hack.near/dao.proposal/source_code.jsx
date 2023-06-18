const { policy, proposal } = props;
const daoId = "rc-dao.sputnik-dao.near";
const bgClassname =
  proposal.status === "InProgress"
    ? ""
    : proposal.status === "Approved"
    ? "bg-success bg-opacity-10"
    : "bg-danger bg-opacity-10";

return (
  <div className={`border p-2 ${bgClassname}`}>
    <div className="mb-2">
      <div>
        <Widget
          src="hack.near/widget/profile.human"
          props={{ accountId: proposal.proposer }}
        />
      </div>
    </div>
  </div>
);
