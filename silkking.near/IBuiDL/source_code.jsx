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
  background: "linear-gradient(to right, #72f786, #33ffff)",
  border: "2px solid black",
  fontWeight: "bold",
};

const accountId = props.accountId ?? "*";

const data = Social.index("i_buidl", "answer");

if (!data) {
  return "Loading";
}

return (
  <div>
    <h2>Tell us what you are building!</h2>
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
          i_buidl: JSON.stringify(
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
      {data
        ? data.map((d) => (
            <div style={card}>
              {d.accountId} said <b>{d.value.answer}</b>
            </div>
          ))
        : "Loading..."}
    </div>
  </div>
);
