State.init({
  query: `select 1`,
  result: `await results...`,
});

const MyButton = styled.button`
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

function updateQuery(value) {
  State.update({
    query: value,
  });
}

function sendQueryToBackend() {
  const options = {
    method: "POST",
    body: `{ "query": "${query}" }`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = fetch(
    "https://flipside-api.antonyip.com/getCachedQuery",
    options
  );

  if (!res.ok) {
    State.update({
      result: "near.social issue with fetch",
    });
    return;
  }

  if (res.body.error) {
    State.update({
      result:
        "anton's api issue with website or query {JSON.stringify(res.body)}",
    });
    return;
  }

  State.update({
    result: JSON.parse(res.body.records),
  });
}

return (
  <div>
    <input
      type="text"
      onChange={(e) => updateQuery(e.target.value)}
      // className={`form-control ${state.term ? "border-end-0" : ""}`}
      value={state.query ?? ""}
      // onChange={(e) => computeResults(e.target.value)}
      // placeholder={props.placeholder ?? `Enter your query here!`}
    />
    <div>{state.query}</div>
    <MyButton onClick={() => sendQueryToBackend()}>Submit Query</MyButton>
    <div>{state.result}</div>
  </div>
);
