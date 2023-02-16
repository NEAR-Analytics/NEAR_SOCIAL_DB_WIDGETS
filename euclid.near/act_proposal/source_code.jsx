initState({
  dao: "",
  proposal: u64,
  action: "",
});

const onVoteClick = () => {
  const gas = 200000000000000;
  const deposit = 10000000000000000000000;
  console.log(gas, deposit);
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
