/**
 * External App URL (must)
 */
const externalAppUrl =
  "http://localhost:3001/query-api-editor?accountId=roshaan.near&indexerName=feed-indexer";
/**
 * Initial Path (optional)
 */
const path = props.path;
/**
 * Initial view height (optional)
 */
const initialViewHeight = 500;
/**
 * Initial Payload (optional)
 */
const initialPayload = {};

/**
 * Request Handlers here
 */
const requestHandler = (request, response) => {
  switch (request.type) {
    case "get-account-id":
      getAccountIdHandler(request, response);
      break;
  }
};

const getAccountIdHandler = (request, response) => {
  // You have access to the request payload
  console.log(request.payload); // Any data sent by React App
  const accountId = context.accountId;
  // Send a response to the React App
  // "response" needs the "request" object to know the type of the request
  response(request).send({ accountId });
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
