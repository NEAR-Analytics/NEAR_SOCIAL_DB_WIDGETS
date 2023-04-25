if (!props.txHash) {
  return (
    <div>
      <p>Please provide tx hash</p>
    </div>
  );
}

State.init({
  txData: null,
});

const endPointUrl = props.endPointUrl || "https://mainnet.aurora.dev";

const fetchTxData = (hash) => {
  const response = fetch(endPointUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_getTransactionReceipt",
      params: [hash],
      id: 1,
    }),
  });

  if (!response) return "";
  const data = response?.body?.result;

  if (data) {
    State.update({
      txData: data,
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

if (props.txHash && !state.txData) {
  fetchTxData(props.txHash);
}

const TxDetails = styled.div`
  display: inline-block;
  border: 1px solid #fff;
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;

  p {
    margin: 0;
  }

  a {
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`;

if (!state.txData) {
  return (
    <div>
      <p>Loading tx data...</p>
    </div>
  );
}

return (
  <TxDetails>
    <h1>TX details</h1>

    <Section>
      <p>Transaction Hash</p>

      <p>{state.txData.transactionHash}</p>
    </Section>

    <Section>
      <p>Result</p>
      <p>{state.txData.status === "0x1" ? "Success" : "Failed"}</p>
    </Section>

    <Section>
      <p>Block number</p>

      <a
        href={`https://bos.gg/#/bos_check.near/widget/BlockDetails?blockHeight=${state.txData.blockNumber}`}
      >
        {state.txData.blockNumber}
      </a>
    </Section>

    <Section>
      <p>From</p>
      <p>{state.txData.from}</p>
    </Section>

    <Section>
      <p>To</p>
      <p>{state.txData.to || state.txData.contractAddress}</p>
    </Section>

    <Section>
      <p>Gas used</p>
      <p>{state.txData.gasUsed}</p>
    </Section>
  </TxDetails>
);
