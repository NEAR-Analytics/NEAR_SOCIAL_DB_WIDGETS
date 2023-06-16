const user = context.accountId;

if (!user) {
  return "Please Sign In!";
}

State.init({
  numDrops: 0,
  dropId: 0,
  keys: [],
  dropType: "",
  counter: 1,
  keypom_contract: "v2.keypom.near",
});

const keypom_contract = "v2.keypom.near";

let num_drops = Near.view(state.keypom_contract, "get_drop_supply_for_owner", {
  account_id: user,
});

let my_drops = Near.view(state.keypom_contract, "get_drops_for_owner", {
  account_id: user,
  limit: num_drops,
});

let keysVec = Near.view(state.keypom_contract, "get_keys_for_drop", {
  drop_id: my_drops[my_drops.length - state.counter].drop_id,
}).sort((a, b) => a.key_id - b.key_id);

console.log("keysVec", keysVec);

let drop_type = "";

if (my_drops[my_drops.length - state.counter].hasOwnProperty("simple")) {
  drop_type = "Simple Drop";
} else if (my_drops[my_drops.length - state.counter].hasOwnProperty("nft")) {
  drop_type = "Non-Fungible Token Drop";
} else if (my_drops[my_drops.length - state.counter].hasOwnProperty("ft")) {
  drop_type = "Fungible Token Drop";
} else if (my_drops[my_drops.length - state.counter].hasOwnProperty("fc")) {
  drop_type = "Function Call Drop";
} else {
  drop_type = "Unknown";
}

State.update({
  numDrops: num_drops,
  dropId: my_drops[my_drops.length - state.counter].drop_id,
  keys: keysVec,
  dropType: drop_type,
});

const onNextClick = () => {
  if (state.counter < num_drops) {
    State.update({
      counter: state.counter + 1,
    });
  }
};

const onPrevClick = () => {
  if (state.counter > 1) {
    State.update({
      counter: state.counter - 1,
    });
  }
};

let type = typeof my_drops[my_drops.length - state.counter];

const tableStyle = {
  display: "table",
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0px",
  fontSize: "16px",
  textAlign: "center",
};
const thStyle = {
  // position: "sticky",
  // top: 0,
  width: "5%",
  // padding: "16px",
  textAlign: "center",
  lineHeight: "14px",
};

if (!state.keys) {
  return (
    <>
      <div class="container border border-info p-3">
        <h4 class="text-center"> Drops from {user} </h4>
        <div class="text-center">
          <button class="btn btn-primary mt-2" onClick={onPrevClick}>
            Previous
          </button>
          <button class="btn btn-primary mt-2" onClick={onNextClick}>
            Next
          </button>
        </div>
        <h3 class="text-center">Drop ID:</h3>
        <p class="text-center">
          {" "}
          {my_drops[my_drops.length - state.counter].drop_id}{" "}
        </p>
        <h3 class="text-center">Drop Type:</h3>
        <p class="text-center"> {state.dropType} </p>
        <h3 class="text-center">Keys:</h3>
      </div>
    </>
  );
} else {
  return (
    <>
      <div class="container border border-info p-3">
        <h4 class="text-center"> Drops from {user} </h4>
        <div class="text-center">
          <button class="btn btn-primary mt-2" onClick={onPrevClick}>
            Previous
          </button>
          <button class="btn btn-primary mt-2" onClick={onNextClick}>
            Next
          </button>
        </div>
        <h3 class="text-center">Drop ID:</h3>
        <p class="text-center">
          {" "}
          {my_drops[my_drops.length - state.counter].drop_id}{" "}
        </p>
        <h3 class="text-center">Drop Type:</h3>
        <p class="text-center"> {state.dropType} </p>
        <h3 class="text-center">Public Keys:</h3>
        <p class="text-center">
          <table style={tableStyle}>
            <tr>
              <th>Key ID</th>
              <th>Remaining Uses</th>
            </tr>

            <tr>
              <th style={thStyle}>
                {state.keys.map((key) => (
                  <div key={key}>{key.key_id}</div>
                ))}
              </th>
              <th style={thStyle}>
                {state.keys.map((key) => (
                  <div key={key}>
                    {key.remaining_uses}/
                    {key.cur_key_use + key.remaining_uses - 1}
                  </div>
                ))}
              </th>
            </tr>
          </table>
        </p>
      </div>
    </>
  );
}
