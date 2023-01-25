const tabs = {
  ALL_SCHEDULE: { id: 0, text: "Create Schedule" },
  NEW_SCHEDULE: { id: 1, text: "View All Schedules" },
};
const time_zones = [
  "(UTC-11:00) Samoa",
  "(UTC-10:00) Hawaii",
  "(UTC-09:00) Alaska",
  "(UTC-08:00) Pacific Time",
  "(UTC-07:00) Arizona",
  "(UTC-06:00) Central America",
  "(UTC-06:00) Saskatchewan",
  "(UTC-05:00) Eastern Time",
  "(UTC-04:00) Atlantic Time",
  "(UTC-04:30) Caracas",
  "(UTC-04:00) Santiago",
  "(UTC-03:30) Newfoundland",
  "(UTC-03:00) Brasilia",
  "(UTC-02:00) Mid-Atlantic",
  "(UTC-01:00) Azores",
  "(UTC+00:00) UTC",
  "(UTC+01:00) Amsterdam",
  "(UTC+02:00) Athens",
  "(UTC+03:00) Baghdad",
  "(UTC+04:00) Abu Dhabi",
  "(UTC+04:30) Kabul",
  "(UTC+05:00) Islamabad",
  "(UTC+05:30) Chennai",
  "(UTC+05:45) Kathmandu",
  "(UTC+06:00) Almaty",
  "(UTC+06:30) Rangoon",
  "(UTC+07:00) Bangkok",
  "(UTC+08:00) Beijing",
  "(UTC+09:00) Irkutsk",
  "(UTC+09:00) Seoul",
  "(UTC+09:00) Tokyo",
  "(UTC+09:30) Adelaide",
  "(UTC+10:00) Guam",
  "(UTC+11:00) Vladivostok",
  "(UTC+12:00) Auckland",
  "(UTC+13:00) Nuku'alofa",
];
State.init({
  tab: tabs.ALL_SCHEDULE.id,
  hoveringElement: "",
  _account: "All",
  _time_zone: "(UTC+00:00) UTC",
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
const set_schedule = () => {
  if (state.tab == tabs.ALL_SCHEDULE.id) {
    State.update({ tab: tabs.NEW_SCHEDULE.id });
  } else {
    State.update({ tab: tabs.ALL_SCHEDULE.id });
  }
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
          {state.tab == tabs.ALL_SCHEDULE.id ? (
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
          ) : (
            <select
              style={comboBox}
              name="zones"
              id="zones"
              value={state._time_zone}
              onChange={(e) => {
                State.update({ _time_zone: e.target.value });
              }}
            >
              {time_zones.map((zone) => (
                <option value={zone}>{zone}</option>
              ))}
            </select>
          )}
        </div>
        <div>
          <button
            onMouseEnter={() => {
              State.update({ hoveringElement: "create" });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            onClick={set_schedule}
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
            {state.tab == tabs.ALL_SCHEDULE.id
              ? tabs.ALL_SCHEDULE.text
              : tabs.NEW_SCHEDULE.text}
          </button>
        </div>
      </div>
    </div>
    <div className="align-items-center pt-3">
      {state.tab == tabs.ALL_SCHEDULE.id ? (
        <Widget
          src={`vow_owner_123.near/widget/Instance_time_review`}
          props={{
            accountId: state._account,
            className: "d-inline-block",
            style: { width: "100%", height: "1.5em" },
          }}
        />
      ) : (
        <Widget
          src={`vow_owner_123.near/widget/Instance_time_setting`}
          props={{
            time_zone: state._time_zone,
            style: { width: "100%", height: "1.5em" },
          }}
        />
      )}
    </div>
  </div>
);
