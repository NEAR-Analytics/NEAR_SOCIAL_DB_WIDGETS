//props indexer_name
const indexer_name = props.indexer_name;
const accountId = props.accountId || context.accountId;

if (!indexer_name) return "missing indexer_name";

State.init({ logs: [], state: [], indexer_res: [] });
function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(
    "https://query-api-hasura-vcqilefdcq-uc.a.run.app/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    }
  );
}

const operationsDoc = `
  query MyQuery {
    indexer_storage(where: {function_name: {_eq: "${accountId}/${indexer_name}"}}) {
      function_name
      key_name
      value
    }
  }
`;

fetchGraphQL(operationsDoc, "MyQuery", {}).then((result) => {
  console.log(result, "result");
  if (result.status === 200) {
    State.update({
      indexer_res: result.body.data.indexer_storage,
    });
  }
});

function query() {
  let response = asyncFetch(
    "https://query-api-hasura-vcqilefdcq-uc.a.run.app/v1/graphql",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
  query IndexerStatus {
  indexer_state(
    where: {function_name: {_eq: "${indexer_name}"}}
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

const create_table = () => {
  let table = "| Function Name | Key Name | Value |\n| --- | --- | --- |\n";
  state.indexer_res.forEach((row) => {
    table += `| ${row.function_name} | ${row.key_name} | ${row.value} |\n`;
  });
  return table;
};
return (
  <>
    <h1>Indexer Status</h1>
    <h1> State </h1>
    {state.state && JSON.stringify(state.state)}
    <h1> Logs </h1>
    {state.logs && JSON.stringify(state.logs)}
    <h1> Indexed Values </h1>
    {state.indexer_res && <Markdown text={create_table()} />}
  </>
);
