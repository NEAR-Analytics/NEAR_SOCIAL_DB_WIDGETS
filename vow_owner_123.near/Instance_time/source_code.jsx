const tabs = {
  ALL_SCHEDULE: { id: 0, text: "All existing polls" },
  NEW_SCHEDULE: { id: 1, text: "Create a poll" },
};
State.init({
  tab: tabs.ALL_SCHEDULE.id,
  hoveringElement: "",
  _account: "All",
});

const data = Social.index("Instance_time", "data");
if (!data) {
  return "Loading datas";
}
var sortedData = data.sort((d1, d2) => d2.blockHeight - d1.blockHeight);
var accountIds = ["All"];

for (let i = 0; i < sortedData.length; i++) {
  if (accountIds.indexOf(sortedData[i].accountId) < 0) {
    accountIds.push(sortedData[i].accountId);
  }
}

const profile = Social.getr(`${context.accountId}/profile`);

const title = {
  display: "flex",
  justifyContent: "center",
  width: "20%",
  marginBottom: "1rem",
  color: "black",
  borderRadius: "2rem",
  fontWeight: 600,
  fontSize: "x-large",
};
const flex_column = {
  display: "flex",
  flexDirection: "column",
};
const comboBox = {
  background: "rgb(1, 10, 45)",
  color: "white",
  borderRadius: "1rem",
  padding: "1rem",
  fontWeight: "500",
  fontSize: "1rem",
};
const button = {
  background: "rgb(1, 10, 45)",
  color: "white",
  borderRadius: "1rem",
  padding: "1rem",
  border: "1px solid black",
  cursor: "pointer",
  hover: {
    background: "yellow",
  },
};
return (
  <div>
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between">
        <div style={title}>Weekly Schedule</div>
        <div class="d-flex flex-column">
          <div>{profile.name}</div>
          <div>{context.accountId}</div>
        </div>
      </div>
      <div className="w-100 d-flex flex-row justify-content-between align-items-center">
        <div>
          <select
            style={comboBox}
            name="accounts"
            id="accounts"
            value={state._account}
            onChange={(e) => {
              State.update({ _account: e.target.value });
            }}
          >
            {accountIds.map((account) => (
              <option value={account}>{account}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            onMouseEnter={() => {
              State.update({ hoveringElement: "create" });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            onClick={abortPollCreation}
            style={
              state.hoveringElement == "create"
                ? {
                    border: "2px solid transparent",
                    fontWeight: "500",
                    fontSize: "1rem",
                    padding: "0.3rem 1.5rem",
                    backgroundColor: "#010A2D",
                    borderRadius: "12px",
                    color: "white",
                  }
                : {
                    border: "2px solid black",
                    color: "black",
                    backgroundColor: "white",
                    fontWeight: "500",
                    fontSize: "1rem",
                    padding: "0.3rem 1.5rem",
                    borderRadius: "12px",
                  }
            }
          >
            Set Schedule
          </button>
        </div>
      </div>
    </div>
    <div style={flex_column} className="align-items-center">
      <Widget
        src={`#/vow_owner_123.near/widget/Instance_time_review?accountId=All`}
        props={{
          accountId: d.accountId,
          className: "d-inline-block",
          style: { width: "95%", height: "1.5em" },
        }}
      />
    </div>
  </div>
);
