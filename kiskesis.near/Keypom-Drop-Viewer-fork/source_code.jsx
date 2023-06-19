const user = context.accountId;

if (!user) {
  return "Please Sign In!";
}

State.init({
  numDrops: 0,
  dropId: 0,
  keys: [],
  count: { notUsed: 0, partlyUsed: 0, used: 0 },
  dropType: "",
  keypom_contract: "v2.keypom.near",
  sortOrder: "id-asc",
});

const sortByUsage = (keys, myDrop) => {
  let sortedKeys;
  if (state.sortOrder === "not-used") {
    sortedKeys = keys.sort(
      (a, b) =>
        a.cur_key_use - a.remaining_uses - (b.cur_key_use - b.remaining_uses) ||
        a.key_id - b.key_id
    );
  } else if (state.sortOrder === "partly-used") {
    sortedKeys = keys.sort(
      (a, b) => a.remaining_uses - b.remaining_uses || a.key_id - b.key_id
    );
  } else if (state.sortOrder === "id-desc") {
    sortedKeys = keys.sort((a, b) => b.key_id - a.key_id);
  } else {
    sortedKeys = keys.sort((a, b) => a.key_id - b.key_id);
  }

  const count = sortedKeys.reduce(
    (acc, key) => {
      if (key.remaining_uses === key.cur_key_use + key.remaining_uses - 1) {
        acc.notUsed++;
      } else if (key.cur_key_use > 0) {
        acc.partlyUsed++;
      }
      return acc;
    },
    { notUsed: 0, partlyUsed: 0 }
  );

  count.used = myDrop.next_key_id - count.notUsed - count.partlyUsed;

  State.update({
    count,
  });

  return sortedKeys;
};

const keypom_contract = "v2.keypom.near";

let num_drops = Near.view(state.keypom_contract, "get_drop_supply_for_owner", {
  account_id: user,
});

const my_drops = Near.view(state.keypom_contract, "get_drops_for_owner", {
  account_id: user,
  limit: num_drops,
});

const selectedDropIndex =
  my_drops.findIndex((el) => el.drop_id === state.dropId) < 0
    ? 0
    : my_drops.findIndex((el) => el.drop_id === state.dropId);

const myDrop = my_drops[selectedDropIndex];

const keysVec = Near.view(state.keypom_contract, "get_keys_for_drop", {
  drop_id: myDrop.drop_id,
});

const sortedKeys = sortByUsage(keysVec, myDrop);

let drop_type = "";

if (myDrop.hasOwnProperty("simple")) {
  drop_type = "Simple Drop";
} else if (myDrop.hasOwnProperty("nft")) {
  drop_type = "Non-Fungible Token Drop";
} else if (myDrop.hasOwnProperty("ft")) {
  drop_type = "Fungible Token Drop";
} else if (myDrop.hasOwnProperty("fc")) {
  drop_type = "Function Call Drop";
} else {
  drop_type = "Unknown";
}

State.update({
  numDrops: num_drops,
  dropId: myDrop.drop_id,
  keys: sortedKeys,
  dropType: drop_type,
});

const handleDropChange = (e) => {
  State.update({
    dropId: e.target.value,
  });
};

let type = typeof my_drops[selectedDropIndex];

const tableStyle = {
  display: "table",
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0px",
  fontSize: "16px",
  textAlign: "center",
};
const thStyle = {
  width: "5%",
  textAlign: "center",
  lineHeight: "14px",
};

const changeSortType = (sortType) => {
  State.update({
    sortOrder: sortType,
  });
};

const rednerSelector = () => (
  <select
    class="form-select"
    style={{
      maxWidth: "30vw",
      fontSize: "16px",
      backgroundColor: "#f7f7f7",
      borderColor: "#ccc",
      borderRadius: "4px",
      padding: "6px",
      cursor: "pointer",
    }}
    value={dropId}
    onChange={handleDropChange}
  >
    {my_drops.map((drop, index) => (
      <option key={index} value={drop.drop_id}>
        drop id: {drop.drop_id}, keys: {drop.next_key_id}, keys left:{" "}
        {Math.floor(drop.registered_uses / drop.config.uses_per_key)}
      </option>
    ))}
  </select>
);

if (!state.keys) {
  return (
    <>
      <div class="container border border-info p-3">
        <h4 class="text-center"> Drops from {user} </h4>
        {rednerSelector()}
        <h3 class="text-center">Drop ID:</h3>
        <p class="text-center"> {drop.drop_id} </p>
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
        <h4 class="text-center">Drops from {user}</h4>
        <div class="d-flex flex-column align-items-center">
          {rednerSelector()}
        </div>
        <h3 class="text-center">Drop ID:</h3>
        <p class="text-center">{my_drops[selectedDropIndex].drop_id}</p>
        <h3 class="text-center">Drop Type:</h3>
        <p class="text-center">{state.dropType}</p>
        <h3 class="text-center">Public Keys:</h3>
        <div class="dropdown d-flex justify-content-between">
          <button
            class="btn btn-light dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ marginRight: "5px" }}
          >
            Sort: {state.sortOrder}
          </button>
          <ul class="dropdown-menu px-2 shadow">
            <li
              class="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => changeSortType("id-asc")}
            >
              ID Ascending
            </li>
            <li
              class="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => changeSortType("id-desc")}
            >
              ID Descending
            </li>
            <li
              class="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => changeSortType("not-used")}
            >
              Not Used
            </li>
            <li
              class="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => changeSortType("partly-used")}
            >
              Partly Used
            </li>
          </ul>
          <div className="counts-container d-flex justify-content-center align-items-center">
            <div className="count-item" style={{ marginRight: "10px" }}>
              <span
                className="count-label"
                style={{ fontWeight: "bold", color: "#d65a5a" }}
              >
                Not Used:
              </span>
              <span
                className="count-value"
                style={{ marginLeft: "5px", color: "#d65a5a" }}
              >
                {state.count.notUsed}
              </span>
            </div>
            <div className="count-item" style={{ marginRight: "10px" }}>
              <span
                className="count-label"
                style={{ fontWeight: "bold", color: "#f5b977" }}
              >
                Partly Used:
              </span>
              <span
                className="count-value"
                style={{ marginLeft: "5px", color: "#f5b977" }}
              >
                {state.count.partlyUsed}
              </span>
            </div>
            <div className="count-item">
              <span
                className="count-label"
                style={{ fontWeight: "bold", color: "#85b880" }}
              >
                Used:
              </span>
              <span
                className="count-value"
                style={{ marginLeft: "5px", color: "#85b880" }}
              >
                {state.count.used}
              </span>
            </div>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Key ID</th>
              <th scope="col">Private Key</th>
              <th scope="col">Remaining Uses</th>
            </tr>
          </thead>
          <tbody>
            {state.keys.map((key) => (
              <tr key={key.key_id}>
                <td>{key.key_id}</td>
                <td>{key.pk}</td>
                <td>
                  {key.remaining_uses ===
                  key.cur_key_use + key.remaining_uses - 1 ? (
                    <span class="text-danger">Not Used</span>
                  ) : key.cur_key_use > 0 ? (
                    <span class="text-warning">Partly Used</span>
                  ) : (
                    <span class="text-success">Used</span>
                  )}
                  {key.remaining_uses}/
                  {key.cur_key_use + key.remaining_uses - 1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
