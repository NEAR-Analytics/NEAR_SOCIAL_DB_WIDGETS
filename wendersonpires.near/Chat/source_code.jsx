// INITIAL STATE
State.init({
  roomId: props.room_id || "",
  roomIdToJoin: "",
  input: "",
  errorMessage: "",
});

// UTILS
// Gen UUID - Source => https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
const uuidv4 = () => {
  var u = "",
    i = 0;
  while (i++ < 36) {
    var c = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"[i - 1],
      r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    u += c == "-" || c == "4" ? c : v.toString(16);
  }
  return u;
};

// APP
const accountId = props.accountId ?? context.accountId ?? "*";

// const roomId = props.room_id || "roomId_0"; // TODO
// let roomId = props.room_id; // TODO

const profileInfo = props.profile ?? Social.getr(`${accountId}/profile`);

console.log("PROFILE", profileInfo);

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
  // Set the new Room Id and go ahead
  State.update({ roomId: uuidv4() });
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
                State.update({
                  roomIdToJoin: e.target.value,
                  errorMessage: "",
                });
              }}
            />
            <button
              type="button"
              class="btn btn-primary"
              role="button"
              style={{ height: 38, width: "25%" }}
              onClick={() => joinRoom(state.roomIdToJoin)}
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

const data = Social.index(state.roomId, "data");

console.log(data);

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

console.log(sortedData);
const chatHistory = getChatHistory(sortedData);
console.log("CHAT HISTORY:", chatHistory);

// Final image Format
// https://ipfs.near.social/ipfs/bafkreiau7fpuwxtiieevs5zk46mhouqqig6sqbyplt5p2kzpe24yrdw2ki
// Thumbnail image Format
// https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreiau7fpuwxtiieevs5zk46mhouqqig6sqbyplt5p2kzpe24yrdw2ki

const onChangeMessage = (message) => {
  State.update({
    input: message,
    // userName: profileInfo.name, // TODO: move to const
    // userAvatarImage: profileInfo.image.ipfs_cid, // TODO: move to const
  });
};

return (
  <>
    <h4>Chat Widget</h4>
    <p>Room ID: {state.roomId}</p>
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
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 999,
                backgroundImage: `url(https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/${chatItem.userAvatarImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
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

      {chatHistory.length === 0 && <p>No message was sent yet :D</p>}
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
          [state.roomId]: JSON.stringify(
            {
              key: "data",
              value: {
                userName: profileInfo.name,
                userAvatarImage: profileInfo.image.ipfs_cid,
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
