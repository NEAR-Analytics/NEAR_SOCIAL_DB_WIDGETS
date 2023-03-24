/**
 * Near Social Bridge - Core
 *
 * This is part of a library that allows you to inject an external React App in a Widget created inside
 * Near Social as well as send and receive data from it.
 *
 * Basically, The View works as a Backend source.
 *
 * Visit https://github.com/wpdas/near-social-bridge to get to know how to use it
 */

// Error handlers
if (!props.externalAppUrl) {
  return (
    <p style={{ fontWeight: 600, color: "#AB2E28", fontFamily: "Courier new" }}>
      Error: "externalAppUrl" prop must be provided
    </p>
  );
}

// External App Url
const externalAppUrl = props.externalAppUrl;

// User Info
const accountId = context.accountId;
const userInfo = { accountId };

// Initial Path
const initialPath = props.path;

// Initial iframe height
const initialIframeHeight = props.initialViewHeight || 500;

// Initial Payload (optional)
const initialPayload = props.initialPayload;

const buildConnectionPayload = () => ({
  type: "connect",
  payload: {
    userInfo,
    initialPath,
    initialPayload,
  },
  created_at: Date.now(),
});

// Initial State
State.init({
  concurrencyInitialized: false,
  concurrencyControl: [buildConnectionPayload()],
  iframeHeight: initialIframeHeight,
  sessionStorageClone: {},
  // (i) DON'T send async data, it's going to randonly fail
  // If you need to get new info, use "request" for that
  currentMessage: buildConnectionPayload(),
});

// (i) Discovery API uses cached data structure
const Utils = {
  /**
   * Send message
   */
  sendMessage: (message) => {
    const foo = [...state.concurrencyControl, message];
    console.log("ARRay State:", foo);
    State.update({
      concurrencyControl: foo,
    });
    // State.update({
    //   currentMessage: message,
    // });
  },
  // sendMessage: (message) => {
  //   State.update({
  //     currentMessage: message,
  //   });
  // },
  /**
   * Call resolve or reject for a given caller
   * E.g:
   * Utils.promisify(() => getCachedObject(), (res) => console.log(res), (err) => console.log(err))
   */
  promisify: (caller, resolve, reject) => {
    const timer = 1000;
    const timeout = timer * 10;
    let timeoutCheck = 0;

    const find = () => {
      const response = caller();
      if (response) {
        resolve(response);
      } else {
        if (timeoutCheck < timeout) {
          // try again
          setTimeout(find, 1000);
          timeoutCheck += timer;
        } else {
          reject(null);
        }
      }
    };

    // Fist attempt
    find();
  },
};

// Send connect message every 2 seconds - DEV
// TODO: This should work on for "development" env
setTimeout(() => {
  Utils.sendMessage(buildConnectionPayload());
}, 2000);
// TODO: Create a "connected" state to check the connection
// External App should send a status = "connected: true"
// Try to send the connection payload till the conection is established

// Start message concurrency controll with "connect" payload
// const concurrencyControl = [buildConnectionPayload()];
const f = () => {
  console.log(
    "CHECK LENGHT",
    state.concurrencyControl.length,
    state.concurrencyControl,
    state.currentMessage
  );
};
if (!state.concurrencyInitialized) {
  console.log("CONCURRENCY SYSTEM");
  State.update({ concurrencyInitialized: true });

  setInterval(() => {
    if (state.concurrencyControl.length > 0) {
      const currentMessage = state.concurrencyControl[0];
      console.log("PROCESS CONCURRENCY, current msg:", currentMessage);
      State.update({
        currentMessage,
      });
      // Utils.sendMessage(currentMessage);
      // Remove first item from array
      const updatedArray = state.concurrencyControl;
      updatedArray.shift();
      State.update({ concurrencyControl: updatedArray });
    }
  }, 500);
}

// Answer Factory
const buildAnswer = (requestType, payload) => {
  return {
    from: "core",
    type: "answer",
    requestType,
    payload,
    created_at: Date.now(),
  };
};

/**
 * Widget response factory - closure
 *
 * E.g:
 * const response = responseFactory.build()
 * response({type: 'request-type'}).send({myPayloadHere: 123})
 */
const responseFactory = {
  build: () => {
    return (request) => {
      return {
        send: (payload) => {
          const responseBody = buildAnswer(request.type, payload);
          Utils.sendMessage(responseBody);
        },
      };
    };
  },
};

// Message handler
const onMessageHandler = (message) => {
  // Handles core calls
  if (message.type.includes("nsb:")) {
    requestsHandler(message);
    return;
  }

  // Handles Widget request calls:
  // - request: payload sent by External App
  // - response: method to send the answer back to the External App
  // - utils: Utils features like: promisify, ...
  const request = {
    type: message.type,
    payload: message.payload,
  };
  const utils = {
    promisify: Utils.promisify,
  };
  props.requestHandler(request, responseFactory.build(), utils);
};

// CORE - REQUEST HANDLERS BELOW
const requestsHandler = (message) => {
  switch (message.type) {
    case "nsb:navigation:sync-content-height":
      setIframeHeight(message.type, message.payload);
      break;
    case "nsb:session-storage:hydrate-viewer":
      sessionStorageHydrateViewer(message.type, message.payload);
      break;
    case "nsb:session-storage:hydrate-app":
      sessionStorageHydrateApp(message.type, message.payload);
      break;
    case "nsb:auth:get-user-info":
      getUserInfo(message.type, message.payload);
      break;
  }
};

// [DON'T REMOVE]: Set thew new iFrame height based on the new screen/route
const setIframeHeight = (requestType, payload) => {
  State.update({ iframeHeight: payload.height + 20 });
};

// [DON'T REMOVE]: Hydrate View session data with data provided by the External App
const sessionStorageHydrateViewer = (requestType, payload) => {
  if (payload) {
    State.update({ sessionStorageClone: payload });
  }

  const responseBody = buildAnswer(requestType, payload);
  Utils.sendMessage(responseBody);
};

// [DON'T REMOVE]: Hydrate External App with data provided by the View
const sessionStorageHydrateApp = (requestType, payload) => {
  const responseBody = buildAnswer(requestType, state.sessionStorageClone);
  Utils.sendMessage(responseBody);
};

// [DON'T REMOVE]: Get user info
const getUserInfo = (requestType, payload) => {
  Utils.promisify(
    () => Social.getr(`${accountId}/profile`), // profile info
    (res) => {
      const responseBody = buildAnswer(requestType, {
        accountId,
        profileInfo: res,
      });
      Utils.sendMessage(responseBody);
    },
    (err) => {
      console.error("error fetching profile data", err);
    }
  );
};
// CORE - REQUEST HANDLERS ABOVE

return (
  <div>
    <iframe
      onLoad={(e) => console.log("CARREGOU")}
      className="w-100"
      style={{ height: `${state.iframeHeight}px` }}
      src={externalAppUrl}
      message={state.currentMessage}
      onMessage={onMessageHandler}
    />
  </div>
);
