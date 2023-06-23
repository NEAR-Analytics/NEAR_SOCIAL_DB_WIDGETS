const QUERYAPI_ENDPOINT = "https://near-queryapi.api.pagoda.co/v1/graphql";

const query = `query MyQuery {
    roshaan_near_feed_indexer_comments(limit: 10) {
      account_id
      block_height
      block_timestamp
    }
  }`;

const stateHandler = (queryData) => {
  let data = queryData.roshaan_near_feed_indexer_comments;
  return data;
};

const renderData = (a) => {
  return <div key={JSON.stringify(a)}>{JSON.stringify(a)}</div>;
};

return (
  <Widget
    src="roshaan.near/widget/QueryApiRenderer"
    props={{
      query: query,
      stateHandler: stateHandler,
      user: `roshaan_near`,
      queryName: MyQuery,
    }}
  />
);
