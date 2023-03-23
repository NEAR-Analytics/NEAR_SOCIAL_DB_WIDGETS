/**
 * External App URL (must)
 */
const externalAppUrl = null; //"https://ce00f45c553c.ngrok.app";
/**
 * Initial Path (optional but recommended)
 */
const path = props.path;
/**
 * Initial view height (optional but recommended)
 */
const initialViewHeight = 500;
/**
 * Initial Payload (optional) - Do not use async data here, it may fail to be ready before sending this initial payload.
 * If you want to get some data, make a "request"
 */
const initialPayload = {
  myNiceProp: "me gusta :D",
};

/**
 * Request Handlers - Backend.
 */
const requestHandler = (request, response) => {
  console.log("Request", request, "Response", response);
};

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
