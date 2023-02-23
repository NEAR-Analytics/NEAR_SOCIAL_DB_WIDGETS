State.init({
  roomData: null,
  roomId: null,
});

const callback = (roomData, roomId, created) => {
  State.update({
    roomData,
    roomId,
  });
};

if (state.roomData) {
  return (
    <>
      <h1>Got game data!</h1>
      <p>{JSON.stringify(state.roomData)}</p>
    </>
  );
}

return (
  <div>
    <Widget
      src="let45fc.near/widget/UsersMatcher"
      props={{
        widgetKey: "laserchess3d",
        widgetName: "Laser chess",
        loadRoomCallback: callback,
        initialValue: {
          boardNotation:
            "l++3d++kd++b++2/2b7/3B+6/b++1B1ss+1b+++1B+/b+++1B+1S+S1b++1B/6b+++3/7B++2/2B+DKD3L",
        },
      }}
    />
  </div>
);
