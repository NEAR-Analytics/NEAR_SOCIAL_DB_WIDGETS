State.init({
  _from: 0,
  _to: 0,
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

const urlPrefix = "https://";
const accountId = props.accountId ?? "*";

const data = Social.index("Instance_time", "monday");
if (!data) {
  return "Loading answers";
}

const blackList = ["webuidl.near"];
const whiteListData = data.filter((d) => !blackList.includes(d.accountId));
const sortedData = whiteListData.sort(
  (d1, d2) => d2.blockHeight - d1.blockHeight
);

const finalData = sortedData;
console.log(finalData);

return (
  <div>
    <br />
    <br />
    <p>Select Instance Time</p>
    <div className="d-flex flex-column w-75 justify-content-around">
      <p>Monday</p>
      <div className="d-flex justify-content-around">
        <p>From</p>
        <select
          name="times"
          id="time"
          value={state._from}
          onChange={(e) => {
            State.update({ _from: e.target.value });
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
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
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
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
      {sortedData
        ? sortedData.map((d) => (
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
                {d.value._from}~{d.value._to}
                &nbsp;&nbsp;&nbsp;
              </b>
            </div>
          ))
        : "Loading..."}
    </div>
  </div>
);
