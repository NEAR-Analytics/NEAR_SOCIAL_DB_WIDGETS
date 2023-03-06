// const sender = Ethers.send("eth_requestAccounts", [])[0];

// if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

initState({
  sender: sender,
  abi: "",
  functions: [],
  inputs: [],
  selectedFunction: "",
  contractAddress: "",
  chain: "",
});

const generateUI = () => {
  const functions = JSON.parse(state.abi)
    .filter((x) => x.type === "function")
    .map((f) => <option value={f.name}>{f.name}</option>);

  State.update({ functions: functions || [] });
};

const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

const handleView = (e) => {
  const body = {
    chain: state.chain,
    functionName: state.selectedFunction[0].name,
    abi: state.abi,
    address: state.contractAddress,
  };

  fetch("https://e84b-50-204-107-211.ngrok.io/api/functionCall", {
    "Content-Type": "application/json",
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => {
    const result = res.body;
    console.log(result);
  });
};

return (
  <>
    <h3>ABI Explorer</h3>
    <label for="selectFunction" class="mt-2">
      Select Chain
    </label>
    <select
      class="form-select mt-2"
      id="selectFunction"
      onChange={(e) => {
        const chain = e.target.value;
        State.update({ chain });
      }}
    >
      <option selected value="ETHEREUM">
        ETHEREUM
      </option>
      <option value="GOERLI">GOERLI</option>
      <option value="SEPOLIA">SEPOLIA</option>
      <option value="POLYGON">POLYGON</option>
      <option value="MUMBAI">MUMBAI</option>
      <option value="BSC">BSC</option>
    </select>
    <div class="mb-3 mt-2">
      <div class="col">
        <label>Contract Address</label>
        <input
          class="form-control mt-2"
          type="text"
          placeholder="Example: 0x00...00"
          onChange={(e) => {
            State.update({ contractAddress: e.target.value });
          }}
        />
      </div>
    </div>
    <div class="mb-3">
      <label for="selectFunction">Contract ABI</label>
      <textarea
        style={{ resize: "none" }}
        rows="10"
        cols="50"
        class="form-control mt-2"
        id="abiJson"
        placeholder="Enter ABI json"
        onChange={(e) => {
          State.update({ abi: e.target.value });
          const functions = JSON.parse(state.abi)
            .filter((x) => x.type === "function")
            .map((f) => <option value={f.name}>{f.name}</option>);

          State.update({ functions: functions || [] });
        }}
      ></textarea>
    </div>

    <div class="mb-3">
      {state.abi && (
        <div class="col m-2 mt-3">
          <label for="selectFunction" class="mt-2">
            Functions
          </label>
          <select
            class="form-select mt-2"
            id="selectFunction"
            onChange={(e) => {
              const func = e.target.value;
              const xs = JSON.parse(state.abi).filter((x) => x.name === func);
              State.update({ selectedFunction: xs });
              State.update({ inputs: xs[0].inputs });
            }}
          >
            <option>constructor</option>
            {state.functions}
          </select>
        </div>
      )}
      <div class="dropdown-divider"></div>

      {state.selectedFunction[0].stateMutability && (
        <div class="col m-2 mt-5">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Form</h5>
              <div class="mt-2">
                {state.inputs.map((input) => {
                  const dataType = input.type;
                  console.log("======", dataType);

                  if (dataType === "address") {
                    return (
                      <div class="mt-2">
                        <label for={input.name}>
                          {capitalize(input.name)} ({input.type})
                        </label>
                        <input
                          class="form-control mt-2"
                          type="text"
                          id={input.name}
                          placeholder="Example: 0x00...00"
                        />
                      </div>
                    );
                  }

                  if (dataType === "bytes") {
                    return (
                      <div class="m-2">
                        <label for={input.name}>
                          {capitalize(input.name)} ({input.type})
                        </label>
                        <input
                          class="form-control mt-2"
                          type="text"
                          id={input.name}
                          placeholder="Example: 0x12345"
                        />
                      </div>
                    );
                  }

                  if (dataType === "uint256") {
                    return (
                      <div class="mt-2">
                        <label for={input.name}>
                          {capitalize(input.name)} ({input.type})
                        </label>
                        <input
                          class="form-control mt-2"
                          type="number"
                          id={input.name}
                          placeholder="Example: 1234"
                        />
                      </div>
                    );
                  }
                })}
              </div>
              <div class="col-sm">
                {state.selectedFunction[0].stateMutability === "view" && (
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={handleView}
                  >
                    View
                  </button>
                )}

                {(state.selectedFunction[0].stateMutability === "nonPayable" ||
                  tate.selectedFunction[0].stateMutability === "payable") && (
                  <button type="button" class="btn btn-success" d>
                    Call
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
);
