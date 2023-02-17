//props indexer_name
const indexer_name = props.indexer_name;
const accountId = props.accountId || context.accountId;

if (!indexer_name) return "missing indexer_name";

State.init({ logs: [], state: [] });
function query() {
  let response = fetch(
    "https://query-api-hasura-vcqilefdcq-uc.a.run.app/v1/graphql",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
  query IndexerStatus {
  indexer_state(
    where: {function_name: {_eq: ${indexer_name}}}
    order_by: {current_block_height: desc}
  ) {
    current_block_height
  }
  log_entries(
    where: {function_name: {_eq: ${indexer_name}}}
    order_by: {timestamp: desc}
  ) {
    id
    message
    timestamp
  }
}
    `,
      }),
    }
  );
  console.log(response);
  if (!response) return;
  let state = response.body.data.indexer_state;
  let logs = response.body.data.log_entries;
  State.update({ state, logs });
}

if (indexer_name) {
  query();
}
return (
  <>
    <h1>Indexer Status</h1>
    <h1> State </h1>
    {state.state && JSON.stringify(state.state)}
    <h1> Logs </h1>
    {state.logs && JSON.stringify(state.logs)}
  </>
);
