// INITIAL PROPS [EDIT]:
const externalAppUrl = "https://6fa4294326de.ngrok.app/";
const env = "development"; // Possible values: 'development' | 'production'

// SETUP: [Navigation] Get the initial route / path (optional)
// path: e.g "https://near.social/#/wendersonpires.near/widget/MyWidget?path=/"
const initialPath = props.path;

let sessionStorageClone = {};

// SETUP:  message sender (it will re-send the message to the iframe source)
const sendMessage = (message) => {
  State.update({
    currentMessage: message,
  });
};

// SETUP: Answer Factory
const buildAnswer = (requestType, payload) => {
  return {
    type: "answer",
    requestType,
    payload,
  };
};

// SETUP: Set initial state
State.init({
  // SETUP:  message sender (it will re-send the message to the iframe source)
  currentMessage: {},
  connectMessageSent: false,
  // Possible values: 'development' | 'production'
  env,
  renderIframe: true,
  // SETUP: Iframe height
  iframeHeight: 720,
  // SETUP: [Session Storage] It'll always have the same data provided inside the external app
  sessionStorageClone: {},
});

// SETUP: Connect Payload data sent once the connection is established
const accountId = props.accountId ?? context.accountId ?? "*";
const profileInfo = props.profile ?? Social.getr(`${accountId}/profile`);
const createConnectionPayload = () => {
  // Return the connect payload
  return {
    type: "connect",
    created_at: Date.now(),
    payload: {
      // SETUP: initial path (tell the external app witch route should be rendered first)
      initialPath,
      // additional data below (optional)
      accountId,
      ipfsCidAvatar: profileInfo.image?.ipfs_cid,
    },
  };
};
const welcomePayload = createConnectionPayload();

// Wait a bit to send the "connect" payload only after all the scripts are loaded
setTimeout(() => {
  State.update({ connectMessageSent: true });
  if (!state.connectMessageSent) {
    sendMessage(welcomePayload);

    // If in Development mode, check the connection every 2 seconds.
    // This is because the external app can be reloaded when the developer
    // makes changes to it and the connection is lost
    if (state.env === "development") {
      setInterval(() => {
        sendMessage(createConnectionPayload());
      }, 2000);
    }
  }
}, 0);

// SETUP: On message handler. On get message handler (from the External App)
const onMessageHandler = (message) => {
  // Internal Request Handler
  internalRequestHandler(message);

  // Custom Request Handler
  customRequestHandler(message);
};

const internalRequestHandler = (message) => {
  switch (message.type) {
    case "nsb:session-storage:hydrate-viewer":
      sessionStorageHydrateViewer(message.type, message.payload);
      break;
    case "nsb:session-storage:hydrate-app":
      sessionStorageHydrateApp(message.type, message.payload);
      break;
    case "nsb:navigation:sync-content-height":
      syncContentHeight(message.type, message.payload);
      break;
  }
};

const sessionStorageHydrateViewer = (requestType, payload) => {
  if (payload) {
    State.update({ sessionStorageClone: payload });
  }

  const responseBody = buildAnswer(requestType);
  sendMessage(responseBody);
};

const sessionStorageHydrateApp = (requestType, payload) => {
  const responseBody = buildAnswer(requestType, state.sessionStorageClone);
  sendMessage(responseBody);
};

const syncContentHeight = (requestType, payload) => {
  if (payload.height) {
    State.update({ iframeHeight: payload.height });
  }

  const responseBody = buildAnswer(requestType);
  sendMessage(responseBody);
};

// SETUP: Custom Request Handlers Below
const customRequestHandler = (message) => {
  switch (message.type) {
    case "get-updated-user-info":
      sendUpdatedUserInfo(message.type, message.payload);
      break;
  }
};

const sendUpdatedUserInfo = (requestType, payload) => {
  const updatedUserInfo = buildAnswer(requestType, {
    accountId,
    profileInfo,
  });
  sendMessage(updatedUserInfo);
};

return (
  <iframe
    id="main-iframe"
    className="w-100"
    style={{
      height: `${state.iframeHeight}px`,
    }}
    // Load external app
    src={externalAppUrl}
    // Data the Near Social View is going to send to the External App
    message={state.currentMessage}
    // When the external app send a message back to the NS View
    onMessage={onMessageHandler}
  />
);
