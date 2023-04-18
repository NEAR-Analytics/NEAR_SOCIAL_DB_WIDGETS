const path = props.path || "query-api-editor";
const registry_contract_id =
  props.registry_contract_id || "registry.queryapi.near";
let accountId = props.accountId || context.accountId;

let externalAppUrl = `http://localhost:3001/${path}?accountId=${accountId}`;

if (props.indexerName) {
  externalAppUrl += `&indexerName=${props.indexerName}`;
}

const initialViewHeight = 750;
if (!context.accountId) {
  return "Please sign in to use this widget.";
}

const registerFunctionHandler = (request, response) => {
  const {
    indexerName,
    code,
    schema,
    blockHeight,
    shouldFetchLatestBlockheight,
  } = request.payload;

  const gas = 200000000000000;

  if (shouldFetchLatestBlockheight == true) {
    blockHeight = Near.block("optimistic").header.height;
  }

  Near.call(
    registry_contract_id,
    "register_indexer_function",
    {
      function_name: indexerName,
      code,
      schema,
      start_block_height: blockHeight,
    },
    gas
  );
};

/**
 * Request Handlers here
 */
const requestHandler = (request, response) => {
  switch (request.type) {
    case "register-function":
      registerFunctionHandler(request, response);
      break;
    case "default":
      console.log("default case");
  }
};

// NearSocialBridgeCore widget is the core that makes all the "magic" happens
return (
  <Widget
    src={"wendersonpires.near/widget/NearSocialBridgeCore"}
    props={{
      externalAppUrl,
      path,
      initialViewHeight,
      initialPayload,
      requestHandler,
    }}
  />
);
