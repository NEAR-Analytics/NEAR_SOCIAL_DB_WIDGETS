/**
 * External App URL (must)
 */
const externalAppUrl = "https://ce00f45c553c.ngrok.app";
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
  mamilos: "polemicos",
};

/**
 * Request Handlers - Backend.
 *
 * - request: payload sent by External App
 *
 * - response: method to send the answer back to the External App
 *
 * - utils: Utils features like
 *      - promisify: (caller, resolve, reject)
 *      There's no Promisse for some features yet, So this is util for when you need to get cached data using DiscoveryAPI, e.g:
 *      utils.promisify(() => Social.getr(`${context.accountId}/profile`), (res) => console.log(res), (err) => console.log(err))
 *
 * @param {{type: string, payload: {}}} request
 * @param {(request) => {send: () => void}} response
 * @param {{promisify:(caller: () => void, resolve: (data) => void, reject: (error) => void)}} Utils
 */
const requestHandler = (request, response, Utils) => {
  switch (request.type) {
    case "get-room-data":
      getRoomDataHandler(request, response, Utils);
      break;
  }
};

const getRoomDataHandler = (request, response, Utils) => {
  const { payload } = request;
  Utils.promisify(
    () =>
      Social.index(payload.roomId, "data", {
        subscribe: true,
        limit: 100,
        order: "desc",
      }),
    (roomData) => {
      const roomExists = roomData && roomData.length > 0;
      if (!roomExists) {
        response(request).send({ error: "room not found" });
        return;
      }
      response(request).send({ messages: roomData });
    },
    (err) => {
      console.log("B");
      response(request).send({ error: "internal error" });
    }
  );
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
      utilsProvider,
    }}
  />
);
