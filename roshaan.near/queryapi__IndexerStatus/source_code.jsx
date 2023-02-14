//props indexer_name
let indexer_name = props.indexer_name ?? 'indexer_name';
let query = fetch(
  'https://query-api-hasura-vcqilefdcq-uc.a.run.app/v1/graphql',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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

return (
  <>
    <h1>Indexer Status</h1>
    {JSON.stringify(query)}
  </>
);
