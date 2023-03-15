// SETUP: [Navigation] Get URL params
const urlParams = props.r;

// SETUP: message sender (it will re-send the message to the iframe source)
const sendMessage = (message) => {
  State.update({ currentMessage: message });
};

// SETUP: Answer Factory
const buildAnswer = (requestType, payload) => {
  return {
    type: "answer",
    requestType,
    payload,
  };
};

// SETUP: Connect Payload data sent once the connection is established
const accountId = props.accountId ?? context.accountId ?? "*";
const profileInfo = props.profile ?? Social.getr(`${accountId}/profile`);
const welcomePayload = {
  type: "connect",
  // optional
  payload: {
    urlParams,
    accountId,
    ipfsCidAvatar: profileInfo.image?.ipfs_cid,
    msg: "Hello from Near Social View :D" + Math.random() * 1000,
  },
};

// SETUP: Set initial state
State.init({ currentMessage: welcomePayload });

// SETUP: On message handler. On get message handler (from the External App)
const onMessageHandler = (message) => {
  console.log(message);
  switch (message.type) {
    case "get-updated-user-info":
      sendUpdatedUserInfo(message.type, message.payload);
      break;
  }
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
    style={{ height: "600px" }}
    // Load external app
    src="https://0f97ffabf8cb.ngrok.app"
    // Data the Near Social View is going to send to the External App
    message={state.currentMessage}
    // When the external app send a message back to the NS View
    onMessage={onMessageHandler}
  />
);
