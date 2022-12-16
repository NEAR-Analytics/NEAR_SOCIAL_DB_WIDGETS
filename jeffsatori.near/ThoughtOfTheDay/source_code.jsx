State.init({
  input: "",
});

const card = {
  background: "linear-gradient(to right, #72f786, #33ffff)",
  border: "1px solid black",
  borderRadius: "5px",
  textAlign: "center",
};

const button = {
  borderRadius: "5px",
  margin: "5px 0",
  padding: "8px",
  textAlign: "center",
  backgroundColor: "rgb(65, 136, 250)",
  border: "2px solid black",
  fontWeight: "bold",
};

const accountId = props.accountId ?? "*";

const data = Social.index("ThoughtOfTheDay", "thought");
if (!data) {
  return "Loading";
}
const sortedData = data.sort((d1, d2) => d2.blockHeight - d1.blockHeight);

return (
  <div>
    <h2>Share your #ThoughtOfTheDay</h2>
    <div className="d-flex flex-column w-75 justify-content-around">
      <textarea
        style={{
          backgroundColor: "rgb(235, 255, 238)",
          border: "1px solid #ced4da",
          borderRadius: "0.5rem",
        }}
        rows="5"
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
          ThoughtOfTheDay: JSON.stringify(
            {
              key: "thought",
              value: {
                thought: state.input,
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
      Post a Thought!
    </CommitButton>

    <div>
      {sortedData
        ? sortedData.map((d) => (
            <div style={card}>
              {d.accountId} said <b>{d.value.thought}</b>
            </div>
          ))
        : "Loading..."}
    </div>
  </div>
);
