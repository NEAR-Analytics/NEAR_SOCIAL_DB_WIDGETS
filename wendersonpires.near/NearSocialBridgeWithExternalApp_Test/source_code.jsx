// SETUP: [Navigation] Get URL params
const urlParams = props.r;

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
  env: "development", // Possible values: 'development' | 'production'
  // SETUP: [Session Storage] It'll always have the same data provided inside the external app
  sessionStorageClone: {},
  // SETUP: [Bridge Service]: status. This is used to avoid issues during the development process
  // when the app reloads after user changes any file
  bridgeServiceStatus: "pending", // Possible values: 'pending' | 'connected'
});

// SETUP: Connect Payload data sent once the connection is established
const accountId = props.accountId ?? context.accountId ?? "*";
const profileInfo = props.profile ?? Social.getr(`${accountId}/profile`);
const createConnectionPayload = () => ({
  type: "connect",
  created_at: Date.now(),
  payload: {
    // must have data
    urlParams,
    bridgeServiceStatus: state.bridgeServiceStatus,
    // additional data below (optional)
    accountId,
    ipfsCidAvatar: profileInfo.image?.ipfs_cid,
  },
});
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
  console.log("Viewer onMessageHandler:", message);
  switch (message.type) {
    case "nsb:session-storage:hydrate-viewer":
      sessionStorageHydrateViewer(message.type, message.payload);
      break;
    case "nsb:session-storage:hydrate-app":
      sessionStorageHydrateApp(message.type, message.payload);
      break;
    case "nsb:bridge-service:update-status":
      updateBridgeServiceStatus(message.type, message.payload);
      break;
    case "nsb:bridge-service:get-status":
      sendBridgeServiceStatusToExternalApp(message.type, message.payload);
      break;
    // Custom handlers below
    case "get-updated-user-info":
      sendUpdatedUserInfo(message.type, message.payload);
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

const updateBridgeServiceStatus = (requestType, payload) => {
  if (payload) {
    State.update({ bridgeServiceStatus: payload });
  }

  const responseBody = buildAnswer(requestType);
  sendMessage(responseBody);
};

const sendBridgeServiceStatusToExternalApp = (requestType, payload) => {
  const responseBody = buildAnswer(requestType, state.bridgeServiceStatus);
  sendMessage(responseBody);
};

// SETUP: Custom Handlers Below

// Request: get updated user info
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
    style={{ height: "800px" }}
    // Load external app
    src="https://6fa4294326de.ngrok.app/"
    // Data the Near Social View is going to send to the External App
    message={state.currentMessage}
    // When the external app send a message back to the NS View
    onMessage={onMessageHandler}
  />
);
