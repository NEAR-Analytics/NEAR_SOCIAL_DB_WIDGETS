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

const profileInfo = props.profile ?? Social.getr(`${accountId}/profile`);

// Room Creator Screen
const joinRoom = (roomIdInfo) => {
  // This method gets only data inside stored on my user
  // const roomInfo = Social.get(`${accountId}/index/${roomIdInfo}`);

  const roomInfo = Social.index(roomIdInfo, "data");
  const roomExists = roomInfo && roomInfo.length > 0;

  if (!roomExists) {
    // Update error state
    State.update({
      errorMessage:
        "This room was not found right now! It can be a blockchain delay, so, you can try again!",
    });
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
        <h3>Chat Widget v1.0.0</h3>
        <p>
          You can join a room or create a new room and invite your friends. You
          can also enter a room directly by passing the parameter{" "}
          <strong>room_id</strong> in the url or as component props. <br />
          <br />
          Example:{" "}
          <a
            href="https://near.social/#/wendersonpires.near/widget/Chat?room_id=9df2f348-9924-415f-921c-db2b846e7177"
            target="_blank"
          >
            https://near.social/#/wendersonpires.near/widget/Chat?room_id=9df2f348-9924-415f-921c-db2b846e7177
          </a>
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
const data = Social.index(state.roomId, "data", {
  subscribe: true,
  limit: 100,
  order: "desc",
});

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

// Final image Format
// https://ipfs.near.social/ipfs/bafkreiau7fpuwxtiieevs5zk46mhouqqig6sqbyplt5p2kzpe24yrdw2ki
// Thumbnail image Format
// https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreiau7fpuwxtiieevs5zk46mhouqqig6sqbyplt5p2kzpe24yrdw2ki

const onChangeMessage = (message) => {
  State.update({
    input: message,
  });
};

const leaveRoomHandler = () => {
  State.update({ roomId: "" });
};

return (
  <>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h4>Chat Widget</h4>
        <p style={{ marginBottom: 0 }}>
          <strong>Room ID:</strong> {state.roomId}
        </p>
        <p style={{ marginTop: 0 }}>
          <strong>Connectd as:</strong> {profileInfo.name}
        </p>
      </div>
      <button type="button" class="btn btn-danger" onClick={leaveRoomHandler}>
        Leave Room
      </button>
    </div>
    <div
      className="mb-2 mt-2"
      style={{
        background: "#F8F9FA",
        padding: 8,
        maxHeight: 500,
        overflowX: "scroll",
      }}
    >
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
      value={state.input}
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
        State.update({ input: "" });
      }}
    >
      Send Message
    </CommitButton>
  </>
);
