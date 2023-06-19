State.init({
  query: "getmempoolinfo",
  result: "Push the button!",
});

const MyButton = styled.button`
  background: ${(props) => (props.primary ? "#f2a900" : "white")};
  color: ${(props) => (props.primary ? "white" : "#f2a900")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #f2a900;
  border-radius: 3px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #f2a900;
    color: white;
  }
`;

function updateQuery(value) {
  State.update({
    query: value,
  });
}

function sendQueryToBackend() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "1.0",
      id: "curltest",
      method: state.query,
      params: [],
    }),
  };

  State.update({
    result: "Querying...",
  });

  asyncFetch(
    "https://nd-980-296-237.p2pify.com/61f167b3136c7b2a137bfda10f541a94",
    options
  ).then((res) => {
    State.update({
      result: "Results are here",
    });
    if (!res.ok) {
      State.update({
        result: `Bitcoin node issue with fetch: ${JSON.stringify(res)}`,
      });
      return;
    }
    if (res.body.error) {
      State.update({
        result: `Bitcoin node issue: ${JSON.stringify(res.body)}`,
      });
      return;
    }

    State.update({
      result: res.body.result,
    });
  });
}

const keyMapping = {
  size: "Current Tx Amount",
  mempoolminfee: "Minimum Mempool Fee",
  minrelaytxfee: "Minimum Relay Transaction Fee",
};

return (
  <div>
    <h5>What's the current status of BTC?</h5>
    <MyButton onClick={() => sendQueryToBackend()}>Let's See It</MyButton>
    {state.result && (
      <StyledTable>
        <tbody>
          {Object.entries(state.result)
            .filter(([key]) => keyMapping[key])
            .map(([key, value]) => (
              <tr key={key}>
                <td>{keyMapping[key]}</td>
                <td>{value}</td>
              </tr>
            ))}
        </tbody>
      </StyledTable>
    )}
  </div>
);
