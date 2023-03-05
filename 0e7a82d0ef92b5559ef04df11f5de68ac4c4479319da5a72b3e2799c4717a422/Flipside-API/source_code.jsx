State.init({
  query: `select max(block_timestamp) from near.core.fact_blocks where block_timestamp > '2023-03-01'`,
  result: `Awaiting your query...`,
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
    body: `{ "query": "${state.query}" }`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  State.update({
    result: "Querying the backend...",
  });

  const res = asyncFetch(
    "https://flipside-api.antonyip.com/getCachedQuery",
    options
  ).then((res) => {
    State.update({
      result: "Results are here",
    });
    if (!res.ok) {
      State.update({
        result: `near.social issue with fetch: ${JSON.stringify(res)}`,
      });
      return;
    }
    // select date_trunc('day', block_timestamp), count(1) from ethereum.core.blocks where block_timestamp > '2023-03-01' group by 1
    if (res.body.error) {
      State.update({
        result: `anton's api issue: ${JSON.stringify(res.body)}`,
      });
      return;
    }

    State.update({
      result: JSON.stringify(res.body.records),
    });
  });
}

return (
  <div>
    <h2>
      Simple API endpoint that uses GODMODE to query the flipside database{" "}
    </h2>
    <h5>Try it out!</h5>
    <h5>...or check the sources if you're interested in how I made this.</h5>
    <input
      type="text"
      onChange={(e) => updateQuery(e.target.value)}
      // className={`form-control ${state.term ? "border-end-0" : ""}`}
      value={state.query ?? ""}
      // onChange={(e) => computeResults(e.target.value)}
      // placeholder={props.placeholder ?? `Enter your query here!`}
    />
    <MyButton onClick={() => sendQueryToBackend()}>Submit Query</MyButton>
    <div>{state.result}</div>
  </div>
);
