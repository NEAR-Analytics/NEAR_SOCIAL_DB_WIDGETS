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
  roomId: null,
  roomData: null,
  errorMessage: null,
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

const placeHolder = "Enter room id";

const findRoom = (created) => {
  if (!created) {
    created = false;
  }
  console.log("getting roomData");
  const roomData = Social.index(props.widgetKey, state.roomId);
  console.log(props.widgetKey, state.roomId);
  console.log(roomData);
  const roomExists = roomData && roomData.length > 0;
  if (!roomExists) {
    State.update({ errorMessage: "Room not found" });
    return;
  }
  const parsedRoomData = roomData[0].value;
  State.update({
    roomData: parsedRoomData,
  });
  if (props.loadRoomCallback && roomData) {
    props.loadRoomCallback(parsedRoomData, state.roomId, created);
  }
};

const generateRoomId = () => {
  return `${props.widgetKey}-room-${uuidv4()}`;
};

let newRoomId = generateRoomId();
if (!state.room) {
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
      <div class="row mt-4">
        <div class="col-6 text-end">
          <button class="btn btn-success" onClick={findRoom}>
            Connect to room
          </button>
        </div>
        <div class="col-6">
          <CommitButton
            class="btn btn-primary"
            onClick={() => State.update({ roomId: newRoomId })}
            onCommit={() => findRoom(true)}
            data={{
              index: {
                [props.widgetKey]: JSON.stringify({
                  key: newRoomId,
                  value: {
                    createdTimestamp: Date.now(),
                    initial: props.initialValue || null,
                  },
                }),
              },
            }}
          >
            Create new room
          </CommitButton>
        </div>
      </div>
    </div>
  );
}

return;
