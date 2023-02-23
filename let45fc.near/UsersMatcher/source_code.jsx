// inspired by https://near.social/#/wendersonpires.near/widget/Chat

if (typeof props.loadRoomCallback != "function") {
  return (
    <h2>
      It's reusable widget and cannot work alone. You have to pass the
      loadRoomCallback function in props. Found type:{" "}
      {typeof props.loadRoomCallback}
    </h2>
  );
}

State.init({
  roomId: Storage.get("roomId") || null,
  errorMessage: null,
  roomCreatedScreen: false,
});

Storage.set("roomId", "");

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

const findRoom = (created) => {
  if (created) {
    created = false;
  }
  const ownerAccountId = created
    ? Storage.get("roomId").split("-")[0]
    : state.roomId.split("-")[0];
  Storage.set("created", "false");

  const roomData = Social.getr(
    `${ownerAccountId}/${props.widgetKey}/${state.roomId}`
  );

  if (!roomData) {
    State.update({
      errorMessage: `Room not found. If you are sure the room is created, this might be a delay on blockchain, 
    so don't hesitate enter your room ID and try again connecting!`,
    });
    return;
  }
  State.update({
    roomData: roomData,
  });

  if (props.loadRoomCallback && roomData) {
    props.loadRoomCallback(roomData, state.roomId, created);
  }
};

if (Storage.get("created") == "true" && !state.roomCreatedScreen) {
  const ownerAccountId = Storage.get("roomId").split("-")[0];
  Storage.set("created", "false");

  const queryString = `${ownerAccountId}/${props.widgetKey}/${Storage.get(
    "roomId"
  )}`;
  const roomData = Social.getr(queryString);
  if (!roomData) {
    State.update({
      errorMessage: `Room not found. If you are sure the room is created, this might be a delay on blockchain, 
    so don't hesitate enter your room ID and try again connecting!`,
    });
    return;
  }
  State.update({
    roomData: roomData,
  });

  if (props.loadRoomCallback && roomData) {
    props.loadRoomCallback(roomData, state.roomId, created);
  }
}

if (state.roomCreatedScreen) {
  return (
    <div class="container">
      <div class="row">
        <h2>Room creation</h2>
        <p>Your room ID will be:</p>
        <pre>{state.roomId}</pre>
        <p>Please copy it and send to your friend(s) :-)</p>
      </div>
      <CommitButton
        class="btn btn-success"
        onCommit={() => {
          findRoom(true);
        }}
        data={{
          [props.widgetKey]: {
            [state.roomId]: {
              createdTimestamp: Date.now(),
              ...(props.initialValue || {}),
            },
          },
        }}
      >
        Create Room & Go
      </CommitButton>
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
          placeHolder="Enter room id"
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
        <button class="btn btn-success" onClick={() => findRoom(false)}>
          Connect to room
        </button>
      </div>
      <div class="col-6">
        <button
          class="btn btn-primary"
          onClick={() => {
            const newRoomId = generateRoomId();
            Storage.set("created", "true");
            Storage.set("roomId", newRoomId);
            State.update({ roomId: newRoomId, roomCreatedScreen: true });
          }}
        >
          Create new room
        </button>
      </div>
    </div>
  </div>
);
