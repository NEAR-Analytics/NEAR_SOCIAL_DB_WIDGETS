State.init({
  on_off: "on",
  _from: 1,
  _to: 1,
});

const widgetName = "Instance_time";
const widgetPath = `vow_owner_123.near/widget/${widgetName}`;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);

const card = {
  background: "linear-gradient(to right, #4deeea, #f000ff)",
  border: "1px solid black",
  borderRadius: "5px",
  textAlign: "center",
  color: "white",
  padding: "10px",
};

const button = {
  borderRadius: "5px",
  margin: "5px 0",
  padding: "8px",
  textAlign: "center",
  background: "linear-gradient(to right, #4deeea, #f000ff)",
  border: "2px solid black",
  fontWeight: "bold",
};

const imgWH = {
  width: "25px",
  height: "25px",
};
const hours = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];
const urlPrefix = "https://";
const accountId = props.accountId ?? "*";

const data = Social.index("Instance_time", "monday");
if (!data) {
  return "Loading answers";
}

const sortedData = data.sort((d1, d2) => d2.blockHeight - d1.blockHeight);
var finalData = [];
var accountIds = [];
for (let i = 0; i < sortedData.length; i++) {
  if (accountIds.indexOf(sortedData[i].accountId) < 0) {
    accountIds.push(sortedData[i].accountId);
    finalData.push(sortedData[i]);
  }
}

return (
  <div>
    <br />
    <br />
    <p>Select Instance Time</p>
    <div className="d-flex flex-column w-75 justify-content-around">
      <p>Monday</p>
      <div className="d-flex justify-content-around">
        <p>On or Off</p>
        <select
          name="times"
          id="time"
          value={state.on_off}
          onChange={(e) => {
            State.update({ on_off: e.target.value });
            if (e.target.value == "off") {
              State.update({ _from: "1", _to: "1" });
            }
          }}
        >
          <option value="on">on</option>
          <option value="off">off</option>
        </select>
        <p>From</p>
        <select
          name="times"
          id="time"
          value={state._from}
          onChange={(e) => {
            State.update({ _from: e.target.value });
          }}
        >
          {hours.map((hour) => (
            <option value={hour}>{hour}</option>
          ))}
        </select>
        <p>To</p>
        <select
          name="times"
          id="time"
          value={state._to}
          onChange={(e) => {
            State.update({ _to: e.target.value });
          }}
        >
          {hours.map((hour) => (
            <option value={hour}>{hour}</option>
          ))}
        </select>
      </div>
    </div>
    <CommitButton
      style={button}
      data={{
        index: {
          Instance_time: JSON.stringify(
            {
              key: "monday",
              value: {
                on_of: state.on_of,
                _from: state._from,
                _to: state._to,
              },
            },
            undefined,
            0
          ),
        },
      }}
      onCommit={() => {
        State.update({
          reloadData: true,
        });
      }}
    >
      Send It!
    </CommitButton>
    <br />
    <br />
    <div>
      {finalData
        ? finalData.map((d) => (
            <div style={card}>
              <Widget
                src="mob.near/widget/ProfileImage"
                props={{
                  accountId: d.accountId,
                  className: "d-inline-block",
                  style: { width: "1.5em", height: "1.5em" },
                }}
              />
              <a
                href={`#/mob.near/widget/ProfilePage?accountId=${d.accountId}`}
              >
                {d.accountId}
              </a>
              Monday: <b>{d.value.answer}&nbsp;&nbsp;&nbsp;</b>
              <b>
                {d.value.on_off == "on"
                  ? `${d.value._from}~${d.value._to}`
                  : "off"}
                &nbsp;&nbsp;&nbsp;
              </b>
            </div>
          ))
        : "Loading..."}
    </div>
  </div>
);
