// INITIAL STATE
State.init({ roomIdInfo: props.room_id || "", input: "", errorMessage: "" });

// UTILS
// Gen UUID - Source => https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
const generateUUID = () => {
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

// APP
const accountId = props.accountId ?? context.accountId ?? "*";

// const roomId = props.room_id || "roomId_0"; // TODO
// let roomId = props.room_id; // TODO

const profileInfo = props.profile ?? Social.getr(`${accountId}/profile`);

// console.log("PROFILE", profileInfo);

// Room Creator Screen

// console.log(Social.get(`${accountId}/index/roomId_0`));

const joinRoom = (roomIdInfo) => {
  console.log(roomIdInfo);

  // This method gets only data inside stored on my user
  // const roomInfo = Social.get(`${accountId}/index/${roomIdInfo}`);

  const roomInfo = Social.index(roomIdInfo, "data");
  const roomExists = roomInfo && roomInfo.length > 0;

  if (!roomExists) {
    // Update error state
    State.update({ errorMessage: "This room does not exist." });
    return;
  }

  // Set room id and go ahead
  State.update({ roomId: roomIdInfo });
};

const createAndJoinNewRoom = () => {
  console.log(generateUUID());
};

if (!state.roomId) {
  return (
    <>
      <div>
        <h3>Hello, {profileInfo.name}!</h3>
        <p>
          You can join a room or create a new room and invite your friends.
          [texto falando sobre a possibilidade de usar query param]
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 32,
          }}
        >
          <p style={{ marginBottom: 8 }}>
            <strong>Join an existing room:</strong>
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              placeholder="Room ID"
              style={{ marginBottom: 8, width: "70%" }}
              onChange={(e) => {
                State.update({ roomIdInfo: e.target.value, errorMessage: "" });
              }}
            />
            <button
              type="button"
              class="btn btn-primary"
              role="button"
              style={{ height: 38, width: "25%" }}
              onClick={() => joinRoom(state.roomIdInfo)}
            >
              Join Room
            </button>
          </div>
          <button
            type="button"
            class="btn btn-primary"
            role="button"
            style={{ marginTop: 8 }}
            onClick={createAndJoinNewRoom}
          >
            Create and Join New Room
          </button>
        </div>
      </div>
      {state.errorMessage && (
        <div class="alert alert-warning" role="alert" style={{ marginTop: 28 }}>
          {state.errorMessage}
        </div>
      )}
    </>
  );
}

// Chat Room Screen

const data = Social.index(state.roomIdInfo, "data");

if (!data) {
  return "Loading...";
}

// Last messages on the bottom
const sortedData = data.sort((d1, d2) => d1.blockHeight - d2.blockHeight);

const buildMessage = (messageData) => {
  return {
    user: messageData.accountId,
    userName: messageData.value.userName,
    userAvatarImage: messageData.value.userAvatarImage,
    message: messageData.value.text,
  };
};

const getChatHistory = (indexData) => {
  const chatHistory = [];
  indexData.forEach((item) => {
    chatHistory.push(buildMessage(item));
  });
  return chatHistory;
};

const chatHistory = getChatHistory(sortedData);
console.log("CHAT HISTORY:", chatHistory);

const onChangeMessage = (message) => {
  State.update({
    input: message,
    userName: profileInfo.name, // TODO: move to const
    userAvatarImage: profileInfo.ipfs_cid, // TODO: move to const
  });
};

return (
  <>
    <h4 className="mb-5">Chat Widget</h4>
    <div className="mb-2 mt-2" style={{ background: "#F8F9FA", padding: 8 }}>
      {chatHistory.map((chatItem, index) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: index !== 0 ? 8 : 0,
            }}
          >
            <img
              src={`https://i.pravatar.cc/50?u=${accountId}`}
              style={{ width: 50, borderRadius: 999 }}
            />
            <p style={{ margin: 0, marginLeft: 12 }}>
              <strong style={{ color: "#212121" }}>
                {chatItem.userName || chatItem.user}:
              </strong>
            </p>
            <p style={{ margin: 0, marginLeft: 6 }}>{chatItem.message}</p>
          </div>
        );
      })}
    </div>
    <textarea
      type="text"
      rows={1}
      className="form-control"
      placeholder="Message"
      onChange={(e) => onChangeMessage(e.target.value)}
    />
    <br />
    <CommitButton
      data={{
        index: {
          [roomId]: JSON.stringify(
            {
              key: "data",
              value: {
                userName: state.userName,
                userAvatarImage: state.userAvatarImage,
                text: state.input,
              },
            },
            undefined,
            0
          ),
        },
      }}
      onCommit={() => {
        // CHECK THIS
        // State.update({reloadData: true})
      }}
    >
      Send Message
    </CommitButton>
  </>
);

// <button type="button" style={{ background: "#ff0000" }}>
//   Send
// </button>

// const homepage = accountId
//   ? Social.get(`${accountId}/settings/near.social/homepage`)
//   : undefined;

// if (homepage === null) {
//   return "Loading";
// }

// return <Widget src={homepage ?? "mob.near/widget/Welcome"} />;
