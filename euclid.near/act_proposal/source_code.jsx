initState({
  dao: "open.sputnik-dao.near",
  proposal: "19",
  action: VoteApprove,
});

const onVoteClick = () => {
  const gas = 300000000000000;
  console.log(gas);
  Near.call(
    state.dao,
    "act_proposal",
    { id: state.proposal, action: state.action },
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
    <p>
      Action: <input value={state.action} />
    </p>
    <a className="btn btn-primary" onClick={onVoteClick}>
      Submit
    </a>
  </div>
);
