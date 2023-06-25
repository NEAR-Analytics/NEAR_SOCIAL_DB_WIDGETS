State.init({
  roomId: props.roomId | null,
  firstLoad: true,
  message: {},
  playerColor: null,
  currentPlayer: null,
  boardSetup: null,
  actionsCount: null,
  showDice: false,
});

if (!state.roomId) {
  return <h1>roomId property must be specified</h1>;
}

const user = "ostolex.near";

const abiObjData = fetch(
  "https://raw.githubusercontent.com/OSTOLEX-Technologies/Castledice-smart-contract/main/abi.json"
);

if (!abiObjData) {
  return <h1>Fetching ABI...</h1>;
}

const abiObj = JSON.parse(abiObjData.body);

const iface = new ethers.utils.Interface(abiObj);

const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) {
  return (
    <Web3Connect
      className="LidoStakeFormSubmitContainer"
      connectLabel="Connect with Web3"
    />
  );
}

const contractId = "0x530cbC8336a0A2214c6ee536067195A24C42f469";

const castledice = new ethers.Contract(
  contractId,
  abiObj,
  Ethers.provider("https://testnet.aurora.dev").getSigner()
);

const externalAppUrl = "https://castledice.ostolex.com/";

function sendMessage(message) {
  State.update({ message });
  setTimeout(() => State.update({ message: {} }), 100);
}

function onGameLoaded(message) {
  State.update({ firstLoad: false, showDice: true });
  if (state.currentPlayer !== state.playerColor)
    pollForOpponentMoves(state.playerColor === "red" ? "blue" : "red");
}

function onMoveMade(message) {
  const row = message.payload.row;
  const col = message.payload.col;

  castledice.makeMove(state.roomId, row, col).then((result) =>
    result.wait().then((result) => {
      sendMessage({ type: "moveFinished" });
      if (message.actions === 0) {
        getActionsCount().then((actionsCount) => {
          State.update({
            currentPlayer: state.playerColor === "red" ? "blue" : "red",
            actionsCount: actionsCount,
            showDice: true,
          });
          sendMessage({ type: "switchTurn", actions: actionsCount });
          console.log(
            "Switched turn",
            "Prev currentPlayer",
            state.currentPlayer,
            "New currentPlayer",
            state.currentPlayer === "red" ? "blue" : "red"
          );

          pollForOpponentMoves(state.playerColor === "red" ? "blue" : "red");
        });
      }
    })
  );
}

function pollForOpponentMoves(opponentColor) {
  let interval = setInterval(() => {
    console.log("Polling...");
    getBoardSetup().then((setup) => {
      getActionsCount().then((actionsCount) => {
        sendMessage({
          type: "reinitBoard",
          setup: setup,
          actions: actionsCount,
        });
        // sendMessage({ type: "updateActionsCount", actions: actionsCount });
        getCurrentPlayerColor().then((currentPlayer) => {
          if (currentPlayer !== opponentColor) {
            console.log(
              "Current player",
              currentPlayer,
              "state.currentPlayer",
              state.currentPlayer
            );
            clearInterval(interval);
            State.update({
              currentPlayer,
              actionsCount: actionsCount,
              showDice: true,
            });
            sendMessage({ type: "switchTurn", actions: actionsCount });
          }
        });
      });
    });
  }, 5000);
}

function onGameMessage(message) {
  console.log(message);
  switch (message.type) {
    case "gameLoaded":
      onGameLoaded(message);
      break;
    case "makeMove":
      onMoveMade(message);
      break;
    // case "updateActions":
    //   updateActions(message);
    //   break;
  }
}

const getPlayerColor = () => {
  return castledice.getMyIndex(state.roomId).then((result) => {
    console.log(result);
    return result === 0 ? "blue" : "red";
  });
};

const getCurrentPlayerColor = () => {
  return castledice
    .getCurrentPlayerIndex(state.roomId)
    .then((result) => (parseInt(result._hex, 16) === 0 ? "blue" : "red"));
};

const getBoardSetup = () => {
  return castledice.getBoardArray(state.roomId).then((result) => result);
};

const getActionsCount = () => {
  return castledice
    .getCurrentPlayerMovesLeft(state.roomId)
    .then((result) => parseInt(result._hex, 16));
};

const getPlayerInRoom = () => {
  return castledice.playerInRoom(sender).then((result) => result);
};

const getRoom = () => {
  return castledice.rooms(state.roomId).then((result) => result);
};

if (!state.playerColor) {
  getPlayerColor().then((playerColor) => State.update({ playerColor }));
  return <h1>Getting your color...</h1>;
}

if (!state.currentPlayer) {
  getCurrentPlayerColor().then((currentPlayer) =>
    State.update({ currentPlayer })
  );
  return <h1>Getting current player color...</h1>;
}

if (!state.boardSetup) {
  getBoardSetup().then((boardSetup) => State.update({ boardSetup }));
  return <h1>Getting your board setup</h1>;
}

if (state.boardSetup[0] === 0 && state.boardSetup[99] === 0) {
  return <h1>Room does not exist</h1>;
}

if (state.actionsCount === null) {
  getActionsCount().then((actionsCount) => State.update({ actionsCount }));
  return <h1>Getting actions count</h1>;
}

const Background = styled.div`
position: fixed;
width: 100vw;
height: calc(-98px + 100vh);
top: 98px;
left: 0;
`;

return (
  <Background>
    <iframe
      src={externalAppUrl}
      message={
        state.firstLoad
          ? {
              type: "setupGame",
              playerColor: state.playerColor,
              boardSetup: state.boardSetup,
              actionsCount: state.actionsCount,
              currentPlayer: state.currentPlayer,
            }
          : state.message
      }
      onMessage={onGameMessage}
      style={{ width: "100%", height: "100%" }}
    />
    {state.showDice && (
      <Widget
        src={`${user}/widget/DiceWidget`}
        props={{
          diceResult: [state.actionsCount],
          callback: (result) => State.update({ showDice: false }),
        }}
      />
    )}
  </Background>
);
