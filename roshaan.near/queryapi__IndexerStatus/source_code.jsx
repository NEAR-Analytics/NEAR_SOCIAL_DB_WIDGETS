//props indexer_name
const indexer_name = props.indexer_name;
console.log("from index status", indexer_name);
console.log("from index status", indexer_name);
const accountId = props.accountId || context.accountId;
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
const state_table = "| Function Name | Current Block Height |\n| --- | --- |\n";

const logs_table =
  "| Block Height | Function Name | Id | Message | Timestamp |\n| --- | --- | --- | --- | --- |\n";
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

const createGraphQLLink = () => {
  const queryLink =
    "https://cloud.hasura.io/public/graphiql?endpoint=https%3A%2F%2Fquery-api-hasura-vcqilefdcq-uc.a.run.app%2Fv1%2Fgraphql&query=query+IndexerQuery+%7B%0A++indexer_state%28where%3A+%7Bfunction_name%3A+%7B_eq%3A+%22function_placeholder%22%7D%7D%29+%7B%0A++++function_name%0A++++current_block_height%0A++%7D%0A++indexer_storage%28where%3A+%7Bfunction_name%3A+%7B_eq%3A+%22function_placeholder%22%7D%7D%29+%7B%0A++++function_name%0A++++key_name%0A++++value%0A++%7D%0A++log_entries%28where%3A+%7Bfunction_name%3A+%7B_eq%3A+%22function_placeholder%22%7D%7D%29+%7B%0A++++function_name%0A++++id%0A++++message%0A++++timestamp%0A++%7D%0A%7D%0A";

  return queryLink.replaceAll("function_placeholder", indexer_name);
};

const IndexerStorageDoc = `
  query IndexerStorage {
    indexer_storage(limit: 20,where: {function_name: {_eq: "${accountId}/${indexer_name}"}}) {
      function_name
      key_name
      value
    }
  }
`;

const logsDoc = `
  query QueryLogs {
    indexer_log_entries(limit: 20, where: {function_name: {_eq: "${accountId}/${indexer_name}"}}) {
      block_height
      id
      function_name
      message
      timestamp
    }
  }
`;

const indexerStateDoc = `
  query IndexerState {
    indexer_state(limit: 20, where: {function_name: {_eq: "${accountId}/${indexer_name}"}}) {
      function_name
      current_block_height
    }
  }
`;
fetchGraphQL(IndexerStorageDoc, "IndexerStorage", {}).then((result) => {
  if (result.status === 200) {
    State.update({
      indexer_res: result.body.data.indexer_storage,
    });
  }
});

fetchGraphQL(logsDoc, "QueryLogs", {}).then((result) => {
  if (result.status === 200) {
    State.update({
      logs: result.body.data.indexer_log_entries,
    });
  }
});

fetchGraphQL(indexerStateDoc, "IndexerState", {}).then((result) => {
  if (result.status === 200) {
    State.update({
      state: result.body.data.indexer_state,
    });
  }
});
// function query() {
//   let response = asyncFetch(
//     "https://query-api-hasura-vcqilefdcq-uc.a.run.app/v1/graphql",
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         query: `
//   query IndexerStatus {
//   indexer_state(
//     where: {function_name: {_eq: "${indexer_name}"}}
//     order_by: {current_block_height: desc}
//   ) {
//     current_block_height
//   }
//   log_entries(
//     where: {function_name: {_eq: ${indexer_name}}}
//     order_by: {timestamp: desc}
//   ) {
//     id
//     message
//     timestamp
//   }
// }
//     `,
//       }),
//     }
//   );
//   console.log(response);
//   if (!response) return;
//   let state = response.body.data.indexer_state;
//   let logs = response.body.data.log_entries;

//   State.update({ state, logs });
// }

const create_table = () => {
  state.indexer_res.forEach((row) => {
    indexer_values_table += `| ${row.function_name} | ${row.key_name} | ${row.value} |\n`;
  });
  state.logs.forEach((row) => {
    logs_table += `| ${row.block_height} | ${row.function_name} | ${row.id} | ${row.message} | ${row.timestamp} |\n`;
  });
  state.state.forEach((row) => {
    state_table += `| ${row.function_name} | ${row.current_block_height} |\n`;
  });
};

create_table();
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
        <SmallTitle>Indexed Values</SmallTitle>

        {state.indexer_res.length > 0 ? (
          <Markdown text={indexer_values_table} />
        ) : (
          <Subheading> No data to show... </Subheading>
        )}

        <SmallTitle>Indexer State</SmallTitle>

        {state.state.length > 0 ? (
          <Markdown text={state_table} />
        ) : (
          <Subheading> No data to show... </Subheading>
        )}
        <SmallTitle> Indexer Logs</SmallTitle>
        {state.logs.length > 0 ? (
          <Markdown text={logs_table} />
        ) : (
          <Subheading> No data to show... </Subheading>
        )}
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  </>
);
