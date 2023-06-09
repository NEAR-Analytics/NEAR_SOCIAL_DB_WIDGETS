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

// (i) Discovery API uses cached data structure
const Utils = {
  /**
   * Send message
   */
  sendMessage: (message) => {
    State.update({
      currentMessage: message,
    });
  },
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

// External App Url
// const externalAppUrl = "https://near-test-app.firebaseapp.com/";
const externalAppUrl = "https://ce00f45c553c.ngrok.app";

// User Info
const accountId = context.accountId;
const userInfo = { accountId };

// Initial Path
const initialPath = props.path;

// Initial iframe height
const initialIframeHeight = 500;

// Initial State
State.init({
  iframeHeight: initialIframeHeight,
  sessionStorageClone: {},
  // (i) DON'T send async data, it's going to randonly fail
  // If you need to get new info, use "request" for that
  currentMessage: {
    type: "connect",
    payload: {
      userInfo,
      initialPath,
      // NEW TODO - add other new propertie to send as initial Payload
      // Let then now that async data may fail
    },
    created_at: Date.now(),
  },
});

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

// Message handler
const onMessageHandler = (message) => {
  requestsHandler(message);
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
      className="w-100"
      style={{ height: `${state.iframeHeight}px` }}
      src={externalAppUrl}
      message={state.currentMessage}
      onMessage={onMessageHandler}
    />
  </div>
);
