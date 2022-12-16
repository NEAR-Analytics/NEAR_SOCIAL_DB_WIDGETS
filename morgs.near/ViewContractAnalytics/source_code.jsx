const initialState = {
  contractId: "",
  queryEstimate: null,
  queryResults: null,
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
  State.update({ queryEstimate: body });
};

const getQueryResults = () => {
  const { body } = fetch(
    `https://dev.kitwallet.app/consumer/${state.contractId}/query/${state.queryEstimate.queryId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: "",
    }
  );
  State.update({ queryResults: body });
};

console.log(state);

if (state.queryResults) {
  return (
    <div>
      <h1>View Contract Analytics</h1>
      {state.queryResults}
      <br />
      <br />
      <button onClick={() => State.update(initialState)}>Reset</button>
    </div>
  );
}

if (state.queryEstimate) {
  return (
    <div>
      <h1>View Contract Analytics</h1>
      Analytics for {state.contractId} will cost
      {state.queryEstimate.estimatedCost} NEAR. Do you want to continue?
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
