// This is a DEV env Widget
// if (!context.accountId || context.accountId !== "wendersonpires.near")
//   return null;

/**
 * External App URL (must)
 */
// const externalAppUrl = "https://near-test-app.web.app/";
const externalAppUrl = "https://d43af01531fe.ngrok.app";

Storage.privateSet("app:rooms-list", [
  "near-social-community",
  "bos",
  "satori",
  "dragon-ball-z",
  "sala-teste-1",
]);

console.log("TROCA:", Storage.privateGet("app:rooms-list"));

/**
 * Initial Path (optional but recommended)
 */
const path = props.path;
/**
 * Initial view height (optional but recommended)
 */
const initialViewHeight = 740;
/**
 * Initial Payload (optional) - Do not use async data here, it may fail to be ready before sending this initial payload.
 * If you want to get some data, make a "request"
 */
const initialPayload = {};

// Migration
// Storage.privateSet("app:rooms-list", [
//   "near-social-community",
//   "bos",
//   "satori",
//   "dragon-ball-z",
//   "sala-teste-1",
// ]);

// Social.set("wendersonpires.near/experimental/chatv2/rooms-list", [
//   "near-social-community",
// ]);

// console.log(
//   "BATATA",
//   Social.get("wendersonpires.near/experimental/chatv2/rooms-list")
// );

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
 * @param {{type: string, payload: {}}} request request with payload sent by External App
 * @param {(request) => {send: () => void}} response send the answer back to the External App
 * @param {{promisify:(caller: () => void, resolve: (data) => void, reject: (error) => void)}} utils Utils features like
 */
const requestHandler = (request, response, Utils) => {
  switch (request.type) {
    case "get-room-data":
      getRoomDataHandler(request, response, Utils);
      break;
    case "send-message":
      sendMessageHandler(request, response);
      break;
    case "register-new-room":
      registerNewRoomHandler(request, response, Utils);
      break;
    case "get-rooms-list":
      getRoomsListHandler(request, response, Utils);
      break;
  }
};

const getRoomDataHandler = (request, response, Utils) => {
  const { payload } = request;

  if (!payload.roomId) {
    response(request).send({ error: "roomId prop must be provided" });
    return;
  }

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
      response(request).send({ error: "internal error" });
    }
  );
};

const sendMessageHandler = (request, response) => {
  const { payload } = request;
  if (payload.roomId && payload.message) {
    // Store message
    Social.set(
      {
        index: {
          [payload.roomId]: JSON.stringify(
            {
              key: "data",
              value: payload.message,
            },
            undefined,
            0
          ),
        },
      },
      {
        force: true,
        onCommit: () => {
          response(request).send();
        },
        onCancel: () => {
          response(request).send({ error: "the action was canceled" });
        },
      }
    );
    return;
  }

  // Error
  response(request).send({
    error: "you must provide the roomId and a message prop",
  });
};

const registerNewRoomHandler = (request, response, Utils) => {
  const { roomId } = request.payload;
  if (!roomId) {
    response(request).send({ error: "you must provide the roomId prop" });
    return;
  }

  Utils.promisify(
    () => Storage.privateGet("app:rooms-list"),
    (rooms) => {
      if (rooms.includes(roomId)) {
        response(request).send({ roomsList: rooms });
        return;
      }

      // Update the rooms list
      const updatedRoomsList = [...rooms, roomId];
      Storage.privateSet("app:rooms-list", updatedRoomsList);
      response(request).send({ roomsList: updatedRoomsList });
    }
  );
};

const getRoomsListHandler = (request, response, Utils) => {
  // Error: IDK why but this is working only when rendering the preview. Final app is not working :/
  Utils.promisify(
    () => Storage.privateGet("app:rooms-list"),
    (rooms) => {
      // Send the rooms list
      response(request).send({ roomsList: rooms });
    }
  );
};

return (
  <Widget
    // src={"wendersonpires.near/widget/NearSocialBridgeWithExternalApp_Test"}
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
