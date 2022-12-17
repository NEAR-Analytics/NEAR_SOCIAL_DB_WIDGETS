State.init({
  input: "",
  url: "",
});

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

const data = Social.index("ibuidl", "answer");
if (!data) {
  return "Loading";
}
const sortedData = data.sort((d1, d2) => d2.blockHeight - d1.blockHeight);

return (
  <div>
    <Widget
      src="mob.near/widget/WidgetImage"
      props={{
        tooltip: true,
        accountId: "webuidl.near",
        widgetName: "iBuiDL",
        style: { width: "4em", height: "4em" },
      }}
    />
    <h4>iBuiDL</h4>
    <p>BuiDL just not dev. whatcha BuiDL on NEAR?</p>
    <div className="d-flex flex-column w-75 justify-content-around">
      <textarea
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          border: "1px solid #ced4da",
          borderRadius: "0.375rem",
        }}
        rows="2"
        value={state.input}
        onChange={(e) => {
          State.update({ input: e.target.value });
        }}
      />
      <p>Url:</p>
      <textarea
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          border: "1px solid #ced4da",
          borderRadius: "0.375rem",
        }}
        rows="1"
        value={state.url}
        onChange={(e) => {
          State.update({ url: e.target.value });
        }}
      />
    </div>
    <CommitButton
      style={button}
      data={{
        index: {
          ibuidl: JSON.stringify(
            {
              key: "answer",
              value: {
                answer: state.input,
                url: state.url,
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
              I BuiDL <b>{d.value.answer}&nbsp;&nbsp;&nbsp;</b>
              <b>
                <a href={`${urlPrefix}${d.value.url}`} target="_blank">
                  {d.value.url}
                </a>
                &nbsp;&nbsp;&nbsp;
              </b>
              <Widget
                src="mob.near/widget/FollowButton"
                props={{ accountId: d.accountId }}
              />
            </div>
          ))
        : "Loading..."}
    </div>
  </div>
);
