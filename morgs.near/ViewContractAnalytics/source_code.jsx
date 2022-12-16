const initialState = {
  contractId: "",
  query: {
    id: null,
    estimate: null,
    results: null,
  },
};

State.init(initialState);

const getQueryCostEstimate = () => {
  const { body } = fetch(
    `https://dev.kitwallet.app/consumer/${state.contractId}/query`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: "",
    }
  );
  State.update({ query: { estimate: body.estimatedCost, id: body.queryId } });
};

const getQueryResults = () => {
  const { body } = fetch(
    `https://dev.kitwallet.app/consumer/${state.contractId}/results/${state.query.id}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: "",
    }
  );
  State.update({
    query: {
      results: body.results,
      queryId: state.query.id,
      estimate: state.query.estimate,
    },
  });
};

console.log(state);

if (state.query.results) {
  return (
    <div>
      <h1>View Contract Analytics</h1>
      {JSON.stringify(state.query.results, null, 2)}
      <br />
      <br />
      <button onClick={() => State.update(initialState)}>Reset</button>
    </div>
  );
}

if (state.query.estimate) {
  return (
    <div>
      <h1>View Contract Analytics</h1>
      Analytics for {state.contractId} will cost
      {state.query.estimate} NEAR. Do you want to continue?
      <br />
      <br />
      <button onClick={getQueryResults}>View analytics</button>
      <button onClick={() => State.update(initialState)}>Reset</button>
    </div>
  );
}

return (
  <div>
    <h1>View Contract Analytics</h1>
    Contract ID
    <input
      type="text"
      value={state.contractId}
      onChange={(e) => State.update({ contractId: e.target.value })}
    />
    <br />
    <button onClick={getQueryCostEstimate}>Calculate analytics cost</button>
  </div>
);
