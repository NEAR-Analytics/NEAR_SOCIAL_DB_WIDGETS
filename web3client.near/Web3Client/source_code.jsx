const accountId = context.accountId;
initState({
  state_mutability: "view",
  deposit: 0,
  gas: 30000000000000,
});

function handleView() {
  try {
    const response = Near.view(
      state.contract,
      state.method,
      JSON.parse(state.args),
      "final"
    );
    console.log(response);
    State.update({ response });
  } catch (e) {
    State.update({ response: JSON.stringify(e) });
  }
}

function handleCall() {
  try {
    const response = Near.call(
      state.contract,
      state.method,
      JSON.parse(state.args),
      state.gas,
      state.deposit
    );
    State.update({ response });
  } catch (e) {
    State.update({ response: JSON.stringify(e) });
  }
}

return (
  <div>
    Account ID : {accountId}
    <div>
      <input
        value={state.contract}
        placeholder="Contract ID"
        style={{ marginBottom: 10, marginTop: 10 }}
        onChange={(e) => {
          const contract = e.target.value;
          State.update({ contract });
        }}
      />
      <input
        value={state.method}
        placeholder="Method Name"
        style={{ marginBottom: 10, marginTop: 10 }}
        onChange={(e) => {
          const method = e.target.value;
          State.update({ method });
        }}
      />
      <textarea
        class="container-fluid"
        rows="10"
        placeholder="Args JSON"
        style={{ marginBottom: 10, marginTop: 10 }}
        onChange={(e) => {
          const args = e.target.value;
          State.update({ args });
        }}
        value={state.args}
      />

      <label for="selectFunction" class="mt-2">
        State Mutability
      </label>
      <select
        class="form-select mt-2 mb-2"
        id="selectFunction"
        onChange={(e) => {
          const state_mutability = e.target.value;
          State.update({ state_mutability });
        }}
      >
        <option selected value="view">
          View
        </option>
        <option value="nonPayable">Non Payable</option>
        <option value="payable">Payable</option>
      </select>

      <div class="mt-4">
        {(state.state_mutability === "nonPayable" ||
          state.state_mutability === "payable") && (
          <>
            <label for="selectFunction" class="mt-2">
              Deposit
            </label>
            <input
              value={state.deposit}
              placeholder="Deposit"
              style={{ marginBottom: 10, marginTop: 10 }}
              onChange={(e) => {
                const deposit = e.target.value;
                State.update({ deposit });
              }}
            />
            <label for="selectFunction" class="mt-2">
              Gas
            </label>
            <input
              value={state.gas}
              placeholder="Gas"
              style={{ marginBottom: 10, marginTop: 10 }}
              onChange={(e) => {
                const gas = e.target.value;
                State.update({ gas });
              }}
            />
          </>
        )}
      </div>

      <div class="col-md mt-4">
        {state.state_mutability === "view" && (
          <button type="button" class="btn btn-success" onClick={handleView}>
            View
          </button>
        )}

        {(state.state_mutability === "nonPayable" ||
          state.state_mutability === "payable") && (
          <button type="button" class="btn btn-success" onClick={handleCall}>
            Call
          </button>
        )}
      </div>

      <div class="mt-3">
        {state.response && (
          <Markdown
            text={`
\`\`\`json
${JSON.stringify(state.response, undefined, 2)}
\`\`\`
`}
          />
        )}
      </div>
    </div>
  </div>
);
