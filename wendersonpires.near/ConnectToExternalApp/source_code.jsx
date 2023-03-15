// DO NOT USE IT. IT'S NOT WORKING

const requestHandlers = props.requestHandlers || []; // [["get-updated-user-info", sendUpdatedUserInfo]]
const externalAppURL = props.externalAppURL; // string
const initialPayload = props.initialPayload || {}; // object (optional)

// SETUP: message sender (it will re-send the message to the iframe source)
const sendMessage = (message) => {
  State.update({ currentMessage: message });
};

// ON MESSAGE HANDLER: On get message handler (from the External App)
const onMessageHandler = (message) => {
  console.log("debug:", message);
  // NOTE: Doesn't work because it's not possible to send function as prop
  const handler = requestHandlers.find((handler) => handle[0] === message.type);
  if (handler) {
    // Call method handler
    handler[1](message.type, message.payload);
  }
};

// CONNECTION: connection request
const connectMessage = {
  type: "connect",
  payload: initialPayload,
};

State.init({
  currentMessage: connectMessage,
});

return (
  <div>
    {externalAppURL && (
      <iframe
        id="main-iframe"
        className="w-100"
        style={{ height: "600px" }}
        // Load external app
        src={externalAppURL}
        // Data the Near Social View is going to send to the External App
        message={state.currentMessage}
        // When the external app send a message back to the NS View
        onMessage={onMessageHandler}
      />
    )}
  </div>
);
