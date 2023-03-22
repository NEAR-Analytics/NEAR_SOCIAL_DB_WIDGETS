// State
initState({
  accountNameText: "",
  manualLookupKey: "",
  manualLookupValue: "",
  manualLookupResult: "",
});

// Text input handlers
const textAccountHandler = (accountNameVal) => {
  State.update({
    accountNameText: accountNameVal,
  });
};

const textKeyHandler = (keyVal) => {
  State.update({
    manualLookupKey: keyVal,
  });
};

const textValueHandler = (lookupVal) => {
  State.update({
    manualLookupValue: lookupVal,
  });
};

// Function calls to NEAR

// Change Calls

const addToLookupMap = () => {
  console.log("add to lookup map");
  Near.call(state.accountNameText, "add_to_map", {
    key: state.manualLookupKey,
    value: state.manualLookupValue,
  });

  State.update({
    manualLookupResult: Near.view(state.accountNameText, "get_from_map", {
      key: state.manualLookupKey,
    }),
  });
};

// View Calls

const getFromLookupMap = () => {
  Near.view(state.manualLookupKey, "get_from_map", {
    key: state.manualLookupKey,
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

// Form Styling
let formStyling = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "#f5f5f5",
  marginTop: "15px",
};

return (
  <>
    <div style={formStyling}>
      <h2> Step 1: Enter Account Name</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Account Name:
          <input
            type="text"
            value={key}
            onChange={(e) => textAccountHandler(e.target.value)}
          />
        </label>
      </div>
    </div>

    <div style={formStyling}>
      <h2>Lookup Map Form</h2>
      <h4> Manual Entry </h4>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Key:
          <input
            type="text"
            value={key}
            onChange={(e) => textKeyHandler(e.target.value)}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Value:
          <input
            type="text"
            value={value}
            onChange={(e) => textValueHandler(e.target.value)}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={addToLookupMap}>Add to Lookup Map</button>
      </div>
      <div>
        <p>Result: {result}</p>
      </div>
      <h4> Random Entry Test </h4>
      <button onClick={handleAddToMap}>Test My Collection</button>
      <p>Result: {result}</p>
    </div>
    <div style={formStyling}>
      <h2>Vector Form</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Value:
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleAddToVector}>Add to Vector</button>
      </div>
      <div>
        <p>Result: {result}</p>
      </div>
      <div style={{ marginBottom: "10px" }}></div>
      <div style={{ marginBottom: "10px" }}>
        <button>Run Vector Tests</button>
      </div>
      <div>
        <p>Result: {result}</p>
      </div>
    </div>
  </>
);
