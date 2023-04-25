if (!props.blockHeight) {
  return (
    <div>
      <p>Please provide a block height</p>
    </div>
  );
}

State.init({
  blockData: null,
});

const endPointUrl = props.endPointUrl || "https://mainnet.aurora.dev";

const fetchBlockData = (number) => {
  const response = fetch(endPointUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_getBlockByNumber",
      params: [number, false],
      id: 1,
    }),
  });

  if (!response) return "";
  const data = response?.body?.result;

  if (data) {
    State.update({
      blockData: data,
    });
  }
};

if (!endPointUrl) {
  return (
    <div>
      <p>Please provide an endpoint URL</p>
    </div>
  );
}

if (props.blockHeight && !state.blockData) {
  fetchBlockData(props.blockHeight);
}

const BlockDetails = styled.div`
  border: 1px solid #fff;
  padding: 20px;
`;

if (!state.blockData) {
  return (
    <div>
      <p>Loading block data...</p>
    </div>
  );
}

return (
  <BlockDetails>
    <h1>Block details</h1>

    <div>
      <p>Block number</p>
      <p>{state.blockData?.number}</p>
    </div>

    <div>
      <p>Block hash</p>
      <p>{state.blockData?.hash}</p>
    </div>

    <div>
      <p>Parent hash</p>
      <p>{state.blockData?.parentHash}</p>
    </div>

    <div>
      <p>Timestamp</p>

      <p>{state.blockData?.timestamp}</p>
    </div>

    <div>
      <p>Transactions</p>

      <div>
        {state.blockData?.transactions?.length > 0 ? (
          <div>
            {state.blockData?.transactions?.map((tx, i) => (
              <p>{tx}</p>
            ))}
          </div>
        ) : (
          <p>No transactions</p>
        )}
      </div>
    </div>
  </BlockDetails>
);
