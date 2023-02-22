// inspired by https://near.social/#/wendersonpires.near/widget/Chat

if (typeof props.loadRoomCallback != "function") {
  return (
    <h2>
      You have to pass the loadRoomCallback function in props. Found type:{" "}
      {typeof props.loadRoomCallback}
    </h2>
  );
}

State.init({
  roomId: Storage.get("roomId") || null,
  errorMessage: null,
  roomCreated: false,
});

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

const generateRoomId = () => {
  return `${context.accountId}-${props.widgetKey}-room-${uuidv4()}`;
};

const newRoomId = generateRoomId();

const placeHolder = "Enter room id";

const findRoom = (created) => {
  if (!created) {
    created = false;
  }
  Storage.set("created", "false");
  Storage.set("roomId", "");
  const ownerAccountId = state.roomId.split("-")[0];
  console.log("getting roomData");
  const roomData = Social.getr(
    `${ownerAccountId}/${props.widgetKey}/${state.roomId}`
  );
  console.log(props.widgetKey, state.roomId);
  console.log(roomData);
  if (!roomData) {
    State.update({ errorMessage: "Room not found" });
    return;
  }
  State.update({
    roomData: roomData,
  });
  if (props.loadRoomCallback && roomData) {
    props.loadRoomCallback(roomData, state.roomId, created);
  }
};

const roomCreated = Storage.get("created");

if (state.roomCreated || roomCreated == "true") {
  const roomId = Storage.get("roomId");
  if (!roomId) {
    return <h1>Something went wrong and "roomId" is not set</h1>;
  }
  return (
    <div class="container">
      <div class="row">
        <h2>Room created</h2>
      </div>
      <div class="row">
        <span>Your room id: {roomId}</span>
      </div>
      <button class="btn btn-success" onClick={findRoom(true)}>
        Go to game
      </button>
    </div>
  );
}

return (
  <div class="container">
    <div class="row mt-3">
      <div class="col-12">
        <h3>{props.widgetName}</h3>
      </div>
      <div class="col-12">
        <input
          type="text"
          class="form-control"
          placeHolder={placeHolder}
          value={state.roomId}
          onChange={(e) => {
            const roomId = e.target.value;
            State.update({ roomId });
          }}
        />
      </div>
    </div>
    {state.errorMessage && (
      <div class="row mt-4">
        <div class="col-12">
          <p class="text-danger">{state.errorMessage}</p>
        </div>
      </div>
    )}
    <div class="row mt-4">
      <div class="col-6 text-end">
        <button class="btn btn-success" onClick={findRoom}>
          Connect to room
        </button>
      </div>
      <div class="col-6">
        <CommitButton
          class="btn btn-primary"
          onClick={() => {
            Storage.set("created", "true");
            Storage.set("roomId", newRoomId);
            State.update({ roomId: newRoomId });
          }}
          onCommit={() => State.update({ roomCreated: true })}
          data={{
            [props.widgetKey]: {
              [newRoomId]: {
                createdTimestamp: Date.now(),
                initial: props.initialValue || null,
              },
            },
          }}
        >
          Create new room
        </CommitButton>
      </div>
    </div>
  </div>
);
