const MAX_BLOCKS = 50;
const MAX_RETRIES = 15;

State.init({
  currentBlockNumber: props.blockNumber || null,
  nexBlockNumber: null,
  blocksData: new Map(),
  retryCount: 0,
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
    const newData = new Map(state.blocksData);
    const block = {
      number: data.number,
      hash: data.hash,
      timestamp: data.timestamp,
      transactions: data.transactions,
    };

    newData.set(data.number, block);

    if (newData.size > MAX_BLOCKS) {
      const oldestKey = Array.from(newData.keys())[0];
      newData.delete(oldestKey);
    }

    State.update({
      blocksData: newData,
      currentBlockNumber: number,
      nextBlockNumber: number + 1,
      retryCount: 0,
    });
  } else {
    if (state.retryCount >= MAX_RETRIES) {
      State.update({
        nextBlockNumber: number + 1,
        retryCount: 0,
      });
    } else {
      State.update({
        retryCount: state.retryCount + 1,
      });
    }
  }
};

const fetchCurrentBlockNumber = () => {
  const response = fetch(endPointUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_blockNumber",
      params: [],
      id: 1,
    }),
  });

  if (!response) return;
  if (response?.body?.result) {
    State.update({
      currentBlockNumber: parseInt(response.body.result, 16),
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

if (!state.currentBlockNumber) {
  fetchCurrentBlockNumber();
}

if (state.currentBlockNumber && !state.nextBlockNumber) {
  fetchBlockData(state.currentBlockNumber);
}

if (
  state.currentBlockNumber &&
  state.nextBlockNumber &&
  state.currentBlockNumber !== state.nextBlockNumber
) {
  setTimeout(() => {
    fetchBlockData(state.nextBlockNumber);
  }, 500);
}

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  border: 1px solid #fff;
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 10px;

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

return (
  <div>
    <h1>Block stream</h1>

    <p>Current block number: {state.currentBlockNumber}</p>

    {state.blocksData.size > 0 ? (
      <List>
        {Array.from(state.blocksData.values())
          .reverse()
          .map((block) => {
            if (!block) {
              return null;
            }

            return (
              <ListItem key={block.number}>
                <Section>
                  <p>Block number</p>
                  <a
                    href={`https://bos.gg/#/bos_check.near/widget/BlockDetails?blockHeight=${block.number}`}
                    target="_blank"
                  >
                    {block.number}
                  </a>
                </Section>
                <Section>
                  <p>Block hash</p>
                  <p>{block.hash}</p>
                </Section>
                <Section>
                  <p>Block timestamp</p>
                  <p>{block.timestamp}</p>
                </Section>
                <Section>
                  <p>Block transactions</p>

                  <div>
                    {block.transactions.length > 0 ? (
                      block.transactions.map((tx, i) => {
                        return (
                          <a
                            key={tx - i}
                            href={`https://bos.gg/#/bos_check.near/widget/TxDetails?txHash=${tx}`}
                            target="_blank"
                          >
                            {tx}
                          </a>
                        );
                      })
                    ) : (
                      <p>No transactions</p>
                    )}
                  </div>
                </Section>
              </ListItem>
            );
          })}
      </List>
    ) : null}
  </div>
);
