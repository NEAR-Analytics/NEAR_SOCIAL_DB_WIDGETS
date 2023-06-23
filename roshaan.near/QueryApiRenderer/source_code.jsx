const query = props.query || "";
const indexer_user = props.user;
const queryName = props.queryName;
const QUERYAPI_ENDPOINT =
  props.graphqlEndpoint ||
  "https://near-queryapi.dev.api.pagoda.co/v1/graphql/";

const defaultRenderer = (data) => {
  return <div key={JSON.stringify(data)}>{JSON.stringify(data)}</div>;
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
    if (result.body.data) {
      const data = result.body.data.roshaan_near_feed_indexer_posts;
      State.update({ data });
      console.log(data);
    }
  }
});

const renderData = (a) => {
  return <div key={JSON.stringify(a)}>{JSON.stringify(a)}</div>;
};

State.init({
  data: [],
});

const renderedData = state.data.map(renderer);

return { renderedData };
