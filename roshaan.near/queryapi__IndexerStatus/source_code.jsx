//props indexer_name
const indexer_name = props.indexer_name;
const accountId = props.accountId || context.accountId;
const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181c;
  margin: 0 0 24px;
`;
const Subheading = styled.h2`
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
`;

if (!indexer_name) return "missing indexer_name";
const state_table = "| Function Name | Current Block Height |\n| --- | --- |\n";

const logs_table =
  "| Function Name | Id | Message | Timestamp |\n| --- | --- | --- | --- |\n";
const indexer_values_table =
  "| Function Name | Key Name | Value |\n| --- | --- | --- |\n";

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
  state.indexer_res.forEach((row) => {
    indexer_values_table += `| ${row.function_name} | ${row.key_name} | ${row.value} |\n`;
  });
};
create_table();
return (
  <>
    <h1>Indexer Status</h1>

    {state.indexer_res.length > 0 ? (
      <Markdown text={indexer_values_table} />
    ) : (
      <Subheading> No data to show... </Subheading>
    )}

    <H2> Indexer State </H2>
    {state.state.length > 0 ? (
      <Markdown text={state_table} />
    ) : (
      <Subheading> No data to show... </Subheading>
    )}

    <H2> Indexer Logs </H2>
    {state.logs.length > 0 ? (
      <Markdown text={logs_table} />
    ) : (
      <Subheading> No data to show... </Subheading>
    )}
  </>
);
