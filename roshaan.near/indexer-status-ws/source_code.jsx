//props indexer_name
const indexer_name = props.indexer_name || "feed-indexer";

const GRAPHQL_ENDPOINT =
  props.GRAPHQL_ENDPOINT ||
  "https://queryapi-hasura-graphql-24ktefolwq-ew.a.run.app";

const LIMIT = 20;
const accountId = props.accountId || context.accountId || "roshaan.near";
const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181c;
  margin: 0 0 24px;
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
`;
const SmallTitle = styled.h3`
  color: black;
  font-weight: 600;
  font-size: 18px;
  line-height: 15px;
  text-transform: uppercase;

  @media (max-width: 770px) {
    margin-bottom: 16px;
  }
`;
const TableElement = styled.td`
  word-wrap: break-word;
  font-family: "Roboto Mono", monospace;
  font-size: 11px;
  background-color: rgb(255, 255, 255);
  color: rgb(32, 33, 36);
`;
const Subheading = styled.h2`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 10px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;
`;
const Card = styled.div`
  border-radius: 12px;
  background: #fff;
  border: ${(div) => (div.selected ? "1px solid black" : "1px solid #eceef0")};
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
`;

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;
  flex-direction: column;
  > * {
    min-width: 0;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #eceef0;
`;

const TextLink = styled.a`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

if (!indexer_name) return "missing indexer_name";

State.init({
  logs: [],
  state: [],
  indexer_res: [],
  indexer_resCount: 0,
  logsCount: 0,
  stateCount: 0,
  indexer_resPage: 0,
  logsPage: 0,
  statePage: 0,
  startWebSocketLogs: null,
  startWebSocketStatus: null,
  initialFetch: false,
});

const logsDocSubscription = `
  subscription QueryLogs {
    indexer_log_entries(order_by: {timestamp: desc}, limit: ${LIMIT}, where: {function_name: {_eq: "${accountId}/${indexer_name}"}}) {
      block_height
      message
      timestamp
    }
  }
`;

const statusDocSubscription = `
  subscription IndexerState {
    indexer_state(where: {function_name: {_eq: "${accountId}/${indexer_name}"}}) {
      status
      function_name
      current_block_height
    }
  }
`;

const subscriptionLogs = {
  type: "start",
  id: "logs", // You can use any unique identifier
  payload: {
    operationName: "QueryLogs",
    query: logsDocSubscription,
    variables: {},
  },
};

const subscriptionStatus = {
  type: "start",
  id: "state", // You can use any unique identifier
  payload: {
    operationName: "IndexerState",
    query: statusDocSubscription,
    variables: {},
  },
};

function startWebSocketStatus(processStatus) {
  let ws = State.get().ws_status;

  if (ws) {
    ws.close();
    return;
  }

  ws = new WebSocket(`wss://${GRAPHQL_ENDPOINT}/v1/graphql`, "graphql-ws");

  ws.onopen = () => {
    console.log(`Connection to WS has been established`);
    ws.send(
      JSON.stringify({
        type: "connection_init",
        payload: {
          headers: {
            "Content-Type": "application/json",
            "Hasura-Client-Name": "hasura-console",
          },
          lazy: true,
        }, // You can send any necessary authorization tokens here
      })
    );

    setTimeout(() => ws.send(JSON.stringify(subscriptionStatus)), 50);
  };

  ws.onclose = () => {
    State.update({ ws_status: null });
    console.log(`WS Connection has been closed`);
    // State.get().startWebSocket(processLogs);
  };

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log("received data", data);
    if (data.type === "data" && data.id === "state") {
      processStatus(data.payload.data);
    }
  };

  ws.onerror = (err) => {
    State.update({ ws_status: null });
    console.log("WebSocket error", err);
  };

  State.update({ ws_status: ws });
}

function startWebSocketLogs(processLogs) {
  let ws = State.get().ws_logs;

  if (ws) {
    ws.close();
    return;
  }

  ws = new WebSocket(`wss://${GRAPHQL_ENDPOINT}/v1/graphql`, "graphql-ws");

  ws.onopen = () => {
    console.log("starting web socket logs");
    console.log(`Connection to WS has been established`);
    ws.send(
      JSON.stringify({
        type: "connection_init",
        payload: {
          headers: {
            "Content-Type": "application/json",
            "Hasura-Client-Name": "hasura-console",
          },
          lazy: true,
        }, // You can send any necessary authorization tokens here
      })
    );

    setTimeout(() => ws.send(JSON.stringify(subscriptionLogs)), 50);
  };

  ws.onclose = () => {
    State.update({ ws_logs: null });
    console.log(`WS Connection has been closed`);
    // State.get().startWebSocket(processLogs);
  };

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log("received data", data);
    if (data.type === "data" && data.id === "logs") {
      processLogs(data.payload.data);
    }
  };

  ws.onerror = (err) => {
    State.update({ ws_logs: null });
    console.log("WebSocket error", err);
  };

  State.update({ ws_logs: ws });
}
function processLog(log) {
  return {
    ...log,
  };
}

function processLogs(incoming_data) {
  let incoming_logs = incoming_data.indexer_log_entries.flatMap(processLog);
  const newLogs = [
    ...incoming_logs.filter((log) => {
      return (
        state.logs.length == 0 || log.block_height > state.logs[0].block_height
      );
    }),
  ];
  State.update((state) => {
    const prevlogs = state.logs || [];
    state.logs = [...newLogs];
    return state;
  });
}

function processStatus(incoming_data) {
  let incoming_state = incoming_data.indexer_state;
  State.update({
    state: incoming_state,
  });
}
function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(`https://${GRAPHQL_ENDPOINT}/v1/graphql`, {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });
}

const createGraphQLLink = () => {
  const queryLink = `https://cloud.hasura.io/public/graphiql?endpoint=${GRAPHQL_ENDPOINT}/v1/graphql&query=query+IndexerQuery+%7B%0A++indexer_state%28where%3A+%7Bfunction_name%3A+%7B_eq%3A+%22function_placeholder%22%7D%7D%29+%7B%0A++++function_name%0A++++current_block_height%0A++%7D%0A++indexer_log_entries%28%0A++++where%3A+%7Bfunction_name%3A+%7B_eq%3A+%22function_placeholder%22%7D%7D%0A++++order_by%3A+%7Bblock_height%3A+desc%2C+timestamp%3A+desc%7D%0A++%29+%7B%0A++++function_name%0A++++id%0A++++message%0A++++timestamp%0A++%7D%0A%7D%0A`;
  return queryLink.replaceAll(
    "function_placeholder",
    `${accountId}/${indexer_name}`
  );
};

const accountName = accountId.replaceAll(".", "_");
const sanitizedFunctionName = indexer_name;
const fullFunctionName = accountName + "_" + sanitizedFunctionName;
const logsDoc = `
  query QueryLogs($offset: Int) {
    indexer_log_entries(order_by: {block_height: desc}, limit: ${LIMIT}, offset: $offset, where: {function_name: {_eq: "${accountId}/${indexer_name}"}}) {
      block_height
      message
      timestamp
    }
    indexer_log_entries_aggregate(where: {function_name: {_eq: "${accountId}/${indexer_name}"}}) {
    aggregate {
      count
    }
  }
  }
`;

const indexerStateDoc = `
  query IndexerState($offset: Int) {
    indexer_state(limit: ${LIMIT}, offset: $offset, where: {function_name: {_eq: "${accountId}/${indexer_name}"}}) {
      status
      function_name
      current_block_height
    }
    indexer_state_aggregate(where: {function_name: {_eq: "${accountId}/${indexer_name}"}}) {
    aggregate {
      count
    }
    }
  }
`;

if (!state.initialFetch) {
  fetchGraphQL(logsDoc, "QueryLogs", {
    offset: state.logsPage * LIMIT,
  }).then((result) => {
    if (result.status === 200) {
      State.update({
        logs: result.body.data[`indexer_log_entries`],
        logsCount:
          result.body.data[`indexer_log_entries_aggregate`].aggregate.count,
      });
      State.update({ initialFetch: true });
    }
  });
  //   fetchGraphQL(indexerStateDoc, "IndexerState", {
  //     offset: 0,
  //   }).then((result) => {
  //     if (result.status === 200) {
  //       if (result.body.data.indexer_state.length == 1) {
  //         State.update({
  //           state: result.body.data.indexer_state,
  //           stateCount: result.body.data.indexer_state_aggregate.aggregate.count,
  //         });
  //       }
  //     }
  //   });
}

if (state.ws_status === undefined) {
  // let ws = State.get().ws_logs;
  State.update({
    startWebSocketStatus: startWebSocketStatus,
  });
  state.startWebSocketStatus(processStatus);
}

if (state.logsPage === 0) {
  // Start subscription for logs if on first page
  if (state.ws_logs === undefined && state.logsPage === 0) {
    // let ws = State.get().ws_logs;
    State.update({
      startWebSocketLogs: startWebSocketLogs,
    });
    state.startWebSocketLogs(processLogs);
  }
} else {
  if (state.ws_logs) {
    state.ws_logs.close();
  }
  State.update({ ws_logs: undefined });
}

const onLogsPageChange = (page) => {
  page = page - 1;

  //   else {
  //       state.startWebSocket(processLogs);
  //
  //     State.update({startWebSocket: startWebSocket})
  // }
  if (page === state.logsPage) {
    console.log(`Selected the same page number as before: ${pageNumber}`);
    return;
  }
  try {
    fetchGraphQL(logsDoc, "QueryLogs", { offset: page * LIMIT }).then(
      (result) => {
        if (result.status === 200) {
          State.update({
            logs: result.body.data.indexer_log_entries,
            logsCount:
              result.body.data.indexer_log_entries_aggregate.aggregate.count,
          });
        }
      }
    );
  } catch (e) {
    console.log("error:", e);
  }
  State.update({ logsPage: page, currentPage: page });
};

const onIndexerResPageChange = (page) => {
  page = page - 1;
  if (page === state.indexer_resPage) {
    console.log(`Selected the same page number as before: ${pageNumber}`);
    return;
  }

  try {
    fetchGraphQL(IndexerStorageDoc, "IndexerStorage", {
      offset: page * LIMIT,
    }).then((result) => {
      if (result.status === 200) {
        State.update({
          indexer_res: result.body.data.indexer_storage,
          indexer_resCount:
            result.body.data.indexer_storage_aggregate.aggregate.count,
        });
      }
    });
  } catch (e) {
    console.log("error:", e);
  }
  State.update({ indexer_resPage: page, currentPage: page });
};

return (
  <>
    <Card>
      <Title className="p-3">
        Indexer Status
        <TextLink href={createGraphQLLink()} target="_blank">
          GraphQL Playground
          <i className="bi bi-box-arrow-up-right"></i>
        </TextLink>
      </Title>

      <CardBody>
        <SmallTitle>Indexer State </SmallTitle>
        {state.state.length > 0 ? (
          <div class="table-responsive mt-3">
            <table
              class="table-striped table"
              style={{
                padding: "30px",
                "table-layout": "fixed",
              }}
            >
              <thead>
                <tr>
                  <th>Function Name</th>
                  <th>Current Block Height</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {state.state.map((x) => (
                  <tr>
                    <TableElement>{x.function_name}</TableElement>
                    <TableElement>{x.current_block_height}</TableElement>
                    <TableElement>{x.status}</TableElement>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Subheading> No data to show... </Subheading>
        )}
        <SmallTitle> Indexer Logs</SmallTitle>
        {state.logs.length > 0 ? (
          <div>
            <div class="table-responsive mt-3">
              <table
                class="table-striped table"
                style={{
                  padding: "30px",
                  "table-layout": "fixed",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>Block Height</th>
                    <th style={{ width: "20%" }}>Timestamp</th>
                    <th style={{ width: "80%" }}>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {state.logs.map((x) => (
                    <tr>
                      <TableElement>{x.block_height}</TableElement>
                      <TableElement>{x.timestamp}</TableElement>
                      <TableElement>{x.message}</TableElement>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Widget
              src="roshaan.near/widget/Paginate-fork"
              props={{
                siblingCount: 1,
                totalCount: state.logsCount,
                pageSize: LIMIT,
                onPageChange: onLogsPageChange,
                currentPage: state.logsPage,
              }}
            />
          </div>
        ) : (
          <Subheading> No data to show... </Subheading>
        )}
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  </>
);
