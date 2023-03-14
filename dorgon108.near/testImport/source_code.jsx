initState({
  nameText: initSearchText,
  testResult: false,
  testRun: false,
});

const getResult = () => {
  State.update({
    testRun: true,

    testResult: Near.view(
      "check-contract.nearsocialexamples.near",
      "account_participation",
      { account_name: state.nameText }
    ),
  });
};

const testContract = () => {
  State.update({
    testResult: Near.call(
      "check-contract.nearsocialexamples.near",
      "evaluate_hello_near",
      {
        contract_name: state.nameText,
      },
      "100000000000000"
    ),
  });
};

const textHandler = (contractName) => {
  State.update({
    nameText: contractName,
  });
};

return (
  <div style={{ textAlign: "center" }}>
    <h1>NEAR Social Beginner's Tutorial</h1>
    <ol style={{ textAlign: "left" }}>
      <li>
        Create a contract with the methods titled "set_greeting" and
        "get_greeting".
      </li>
      <li>
        In the state of your contract (where your class/struct is instantiated),
        save a string.
      </li>
      <li>
        The "set_greeting" and "get_greeting" methods should simply update and
        return the value of the saved string.
      </li>
      <li>Deploy your contract onto a mainnet account.</li>
      <li>
        Enter the name of your mainnet account here to test your contract with a
        random string.
      </li>
    </ol>
    <br />
    <input
      onChange={(e) => textHandler(e.target.value)}
      type="text"
      placeholder="Enter The name of your mainnet account here"
    />
    <br />
    <button onClick={testContract} style={{ margin: "10px auto" }}>
      Run Test
    </button>
    <button onClick={getResult} style={{ margin: "10px auto" }}>
      Get Result
    </button>

    {state.testRun ? (
      state.testResult ? (
        <p>The test passed!</p>
      ) : (
        <p>The test failed.</p>
      )
    ) : null}
  </div>
);
