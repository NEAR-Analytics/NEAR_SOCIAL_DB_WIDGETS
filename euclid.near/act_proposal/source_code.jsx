initState({ dao: "open.sputnik-dao.near", proposal: "19" });

const onVoteClick = () => {
  const gas = 300000000000000;
  console.log(gas);
  Near.call(
    state.dao,
    "act_proposal",
    { id: state.proposal, action: VoteApprove },
    gas,
    deposit
  );
};

return (
  <div>
    <h3>Vote</h3>
    <p>
      DAO: <input value={state.dao} />
    </p>
    <p>
      Proposal: <input type="number" value={state.proposal} />
    </p>
    <a className="btn btn-primary" onClick={onVoteClick}>
      Approve
    </a>
  </div>
);
