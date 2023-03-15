const requestHandlers = props.requestHandlers || []; // [["get-updated-user-info", sendUpdatedUserInfo]]
const externalAppURL = props.externalAppURL; // string

// ON MESSAGE HANDLER: On get message handler (from the External App)
const onMessageHandler = (message) => {
  const handler = requestHandlers.find((handler) => handle[0] === message.type);
  if (handler) {
    // Call method handler
    handler[1](message.type, message.payload);
  }

  //   switch (message.type) {
  //     case "get-updated-user-info":
  //       sendUpdatedUserInfo(message.type, message.payload);
  //       break;
  //   }
};

// CONNECTION: connection request
const connectMessage = {
  type: "connect",
  // optional
  payload: {
    urlParams,
    accountId,
    ipfsCidAvatar: profileInfo.image?.ipfs_cid,
    msg: "Hello from Near Social View :D" + Math.random() * 1000,
  },
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
        // Data the Near Social View is going to send to my External App
        message={state.currentMessage}
        // When my external app send a message back to the NS View
        onMessage={onMessageHandler}
      />
    )}
  </div>
);
