State.init({ roomIdToJoin: "", input: "" });

const accountId = props.accountId ?? context.accountId ?? "*";

// const roomId = props.room_id || "roomId_0"; // TODO
const roomId = props.room_id; // TODO

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
    return;
  }
};

if (!roomId) {
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
            marginTop: 52,
          }}
        >
          <p style={{ marginBottom: 8 }}>
            <strong>Join an existing room:</strong>
          </p>
          <input
            placeholder="Room ID"
            style={{ marginBottom: 8 }}
            onChange={(e) => {
              State.update({ roomIdToJoin: e.target.value });
            }}
          />
          <button
            class="btn btn-primary"
            role="button"
            onClick={() => joinRoom(state.roomIdToJoin)}
          >
            Join Room
          </button>
        </div>
      </div>
    </>
  );
}

// Chat Room Screen

const data = Social.index(roomId, "data");

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
