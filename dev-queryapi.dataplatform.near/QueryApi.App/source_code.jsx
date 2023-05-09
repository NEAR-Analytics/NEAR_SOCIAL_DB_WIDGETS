const GRAPHQL_ENDPOINT =
  "https://queryapi-hasura-graphql-24ktefolwq-ew.a.run.app";
const APP_OWNER = "dataplatform.near";
const EXTERNAL_APP_URL = "https://queryapi-frontend-24ktefolwq-ew.a.run.app";
const REGISTRY_CONTRACT_ID = "queryapi.dataplatform.near";

return (
  <Widget
    src={`${APP_OWNER}/widget/QueryApi.Dashboard`}
    props={{
      GRAPHQL_ENDPOINT,
      APP_OWNER,
      EXTERNAL_APP_URL,
      REGISTRY_CONTRACT_ID,
    }}
  />
);
