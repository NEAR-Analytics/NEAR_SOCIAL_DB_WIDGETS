const data = Social.index("Instance_time", "schedule");
if (!data) {
  return "Loading datas";
}
var sortedData = data.sort((d1, d2) => d2.blockHeight - d1.blockHeight);
var accountIds = ["All"];
var finalData = undefined;
for (let i = 0; i < sortedData.length; i++) {
  if (accountIds.indexOf(sortedData[i].accountId) < 0) {
    accountIds.push(sortedData[i].accountId);
    if (sortedData[i].accountId == context.accountId) {
      finalData = sortedData[i];
    }
  }
}

State.init({
  tab: tabs.ALL_SCHEDULE.id,
  hoveringElement: "",
  _account: "All",
});

const profile = Social.getr(`${context.accountId}/profile`);
const flex_column = {
  display: "flex",
  flexDirection: "column",
};
const comboBox = {
  background: "rgb(230, 230, 230)",
  color: "black",
  borderRadius: "1rem",
  padding: "1rem",
  fontWeight: "500",
  fontSize: "1rem",
};

return (
  <div>
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
            color: "black",
            borderRadius: "2rem",
            fontWeight: 600,
            fontSize: "x-large",
          }}
        >
          Weekly Schedule
        </div>
        <div class="d-flex flex-column">
          <div>{profile.name}</div>
          <div>@{context.accountId}</div>
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
          <a
            onMouseEnter={() => {
              State.update({ hoveringElement: "create" });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            href="https://near.social/#/vow_owner_123.near/widget/Instance_time_edit"
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
                    textDecoration: "none",
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
            {finalData ? "Edit Schedule" : "Create Schedule"}
          </a>
        </div>
      </div>
    </div>
    <div className="align-items-center pt-3">
      <Widget
        src={`vow_owner_123.near/widget/Instance_time_review`}
        props={{
          accountId: state._account,
          className: "d-inline-block",
          style: { width: "100%", height: "1.5em" },
        }}
      />
    </div>
  </div>
);
