State.init({
  _is_on: ["on", "on", "on", "on", "on", "on", "on"],
  _from: ["1", "1", "1", "1", "1", "1", "1"],
  _to: ["1", "1", "1", "1", "1", "1", "1"],
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
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const data = Social.index("Instance_time", "monday");
if (!data) {
  return "Loading datas";
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
      {days.map((day, index) => (
        <div>
          <p>{day}</p>
          <div className="d-flex justify-content-around">
            <p>On or Off</p>
            <select
              name="times"
              id="time"
              value={state._is_on[index]}
              onChange={(e) => {
                let temp = state._is_on;
                temp[index] = e.target.value;
                State.update({ _is_on: temp });
              }}
            >
              <option value="on">on</option>
              <option value="off">off</option>
            </select>
            <p>From</p>
            <select
              name="times"
              id="time"
              enable={state._is_on[index] == "on"}
              value={state._from[index]}
              onChange={(e) => {
                let temp = state._from;
                temp[index] = e.target.value;
                State.update({ _from: temp });
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
              enable={state._is_on[index] == "on"}
              value={state._to[index]}
              onChange={(e) => {
                let temp = state._to;
                temp[index] = e.target.value;
                State.update({ _to: temp });
              }}
            >
              {hours.map((hour) => (
                <option value={hour}>{hour}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
    <CommitButton
      style={button}
      data={{
        index: {
          Instance_time: JSON.stringify(
            {
              key: "monday",
              value: {
                _is_on: state._is_on,
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
              <div>
                {days.map((day, index) => (
                  <div>
                    {day}:
                    <b>
                      {d.value._is_on[index] == "on"
                        ? `${d.value._from[index]}~${d.value._to[index]}`
                        : "off"}
                      &nbsp;&nbsp;&nbsp;
                    </b>
                  </div>
                ))}
              </div>
            </div>
          ))
        : "Loading..."}
    </div>
  </div>
);
