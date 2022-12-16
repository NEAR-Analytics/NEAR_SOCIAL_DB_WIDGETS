State.init({
  input: "",
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

const accountId = props.accountId ?? "*";

const data = Social.index("ibuidl", "answer");
if (!data) {
  return "Loading";
}
const sortedData = data.sort((d1, d2) => d2.blockHeight - d1.blockHeight);

return (
  <div>
    <h2>What do you BuiDL on NEAR?</h2>
    <div className="d-flex flex-column w-75 justify-content-around">
      <textarea
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          border: "1px solid #ced4da",
          borderRadius: "0.375rem",
        }}
        rows="3"
        value={state.input}
        onChange={(e) => {
          State.update({ input: e.target.value });
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
      Post!
    </CommitButton>

    <div>
      {sortedData
        ? sortedData.map((d) => (
            <div style={card}>
              <a href="/mob.near/widget/ProfilePage?accountId={d.accountId}">
                {d.accountId}
              </a>
              I BuiDL <b>{d.value.answer}&nbsp;&nbsp;&nbsp;</b>
            </div>
          ))
        : "Loading..."}
    </div>
  </div>
);
