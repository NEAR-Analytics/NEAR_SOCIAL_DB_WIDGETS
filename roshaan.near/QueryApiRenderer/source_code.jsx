const query = props.query || "";
const indexer_user = props.user;
const queryName = props.queryName;
const stateHandler = props.stateHandler;

State.init({
  data: [],
});

const QUERYAPI_ENDPOINT =
  props.graphqlEndpoint ||
  "https://near-queryapi.dev.api.pagoda.co/v1/graphql/";

const defaultRenderer = (data) => {
  return (
    <div key={JSON.stringify(data)}>
      <p>Account ID: {data.account_id}</p>
      <p>Block Height: {data.block_height}</p>
      <p>Block Timestamp: {data.block_timestamp}</p>
    </div>
  );
};

const renderer = props.renderer || defaultRenderer;

function fetchGraphQL(operationsDoc, operationName, variables) {
  let fetchOptions = {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  };

  if (indexer_user) {
    fetchOptions.headers = { "x-hasura-role": indexer_user };
  }

  return asyncFetch(QUERYAPI_ENDPOINT, fetchOptions);
}

fetchGraphQL(query, queryName, {}).then((result) => {
  if (result.status === 200) {
    if (result.body.data && stateHandler) {
      const data = stateHandler(result.body.data);
      State.update({ data });
    }
  }
});

const renderedData = state.data.map(renderer);

return { renderedData };
