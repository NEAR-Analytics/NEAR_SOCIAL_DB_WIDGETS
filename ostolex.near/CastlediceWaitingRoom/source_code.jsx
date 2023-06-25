const Background = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Oldenburg&display=swap');
  background-image: url("https://raw.githubusercontent.com/OSTOLEX-Technologies/Castledice-frontend/main/public/assets/Menu%20and%20loading%20screen%20background%20dark.png");
  background-size: cover;
  position: fixed;
  width: 100vw;
  height: calc(-62px + 100vh);
  top: 62px;
  left: 0;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10%;
  color: #fff;
`;

const BigButton = styled.button`
  background-image: url("https://raw.githubusercontent.com/OSTOLEX-Technologies/Castledice-frontend/main/public/assets/big%20button.png");
  color: #fff;
  font-family: Oldenburg;
  font-size: 48px;
  width: 600px;
  height: 120px;
  padding: 0;
  border: 0;
  outline: none;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  font-weight: bold;
  background-size: contain;
`;

const website = "https:/https://near.org/";
const widgetOwner = "ostolex.near";

const Heading1 = styled.div`
    font-size: 60px;
    font-weight: bold;
`;

const Paraghaph = styled.div`
    font-size: 36px;
`;

State.init({
  creatorId: props.accountId || null,
  creatingRoom: false,
  lastRoomId: null,
  newRoomId: null,
  roomCreated: false,
});

const abiObj = [
  {
    type: "constructor",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "FIELD_HEIGHT",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "FIELD_WIDTH",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "countRooms",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "createRoom",
    inputs: [
      {
        type: "address[]",
        name: "players",
        internalType: "address[]",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint8[]",
        name: "",
        internalType: "uint8[]",
      },
    ],
    name: "getBoardArray",
    inputs: [
      {
        type: "uint256",
        name: "roomId",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "getCurrentPlayerIndex",
    inputs: [
      {
        type: "uint256",
        name: "roomId",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "getCurrentPlayerMovesLeft",
    inputs: [
      {
        type: "uint256",
        name: "roomId",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    name: "getGameWinner",
    inputs: [
      {
        type: "uint256",
        name: "roomId",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint8",
        name: "",
        internalType: "uint8",
      },
    ],
    name: "getMyIndex",
    inputs: [
      {
        type: "uint256",
        name: "roomId",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "getRoomIdByAddress",
    inputs: [
      {
        type: "address",
        name: "player",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "isGameFinished",
    inputs: [
      {
        type: "uint256",
        name: "roomId",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "makeMove",
    inputs: [
      {
        type: "uint256",
        name: "roomId",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "row",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "column",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "playerInRoom",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "currentPlayerIndex",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "currentPlayerMoves",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "randomParameter",
        internalType: "uint256",
      },
    ],
    name: "rooms",
    inputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "event",
    name: "FinishedGames",
    inputs: [
      {
        type: "uint256",
        name: "roomId",
        indexed: false,
      },
      {
        type: "address",
        name: "winner",
        indexed: false,
      },
    ],
    anonymous: false,
  },
];

const contractId = "0x530cbC8336a0A2214c6ee536067195A24C42f469";

const iface = new ethers.utils.Interface(abiObj);

const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) {
  return (
    <Background>
      <Web3Connect
        className="LidoStakeFormSubmitContainer"
        connectLabel="Connect with Web3"
      />
    </Background>
  );
}

const castledice = new ethers.Contract(
  contractId,
  abiObj,
  Ethers.provider("https://testnet.aurora.dev").getSigner()
);

// If accountId the same as user
if (state.creatorId === sender) {
  return (
    <Background>
      <Heading1>{"You can't play with your own"}</Heading1>
    </Background>
  );
}

const getRoomIdByAddress = () => {
  return castledice.getRoomIdByAddress(sender).then((result) => {
    return parseInt(result._hex, 16);
  });
};

const createRoom = (firstAccount, secondAccount) => {
  console.log([firstAccount, secondAccount]);
  return castledice
    .createRoom([firstAccount, secondAccount])
    .then((result) => result.wait().then((result) => getRoomIdByAddress()));
};

// getting last room id
if (state.lastRoomId === null) {
  getRoomIdByAddress().then((lastRoomId) => State.update({ lastRoomId }));
  return (
    <Background>
      <Heading1>Please wait...</Heading1>
    </Background>
  );
}

if (state.lastRoomId !== 0 && !state.creatingRoom) {
  return (
    <Background>
      <Heading1>You have unfinished game.</Heading1>
      <Paraghaph>{"Here's the link of last game:"}</Paraghaph>
      <pre class="text-danger bg-light">{`${website}${widgetOwner}/widget/CastlediceOnline?roomId=${state.lastRoomId}`}</pre>
      <BigButton
        class="btn btn-primary"
        onClick={() => State.update({ creatingRoom: true })}
      >
        Create new game
      </BigButton>
    </Background>
  );
}

if (!state.creatorId && state.newRoomId === null) {
  let interval = setInterval(() => {
    getRoomIdByAddress().then((result) => {
      console.log("Checking...", result);
      if (result !== state.lastRoomId) {
        clearInterval(interval);
        State.update({ newRoomId: result });
      }
    });
  }, 4000);
  return (
    <Background>
      <Heading1>Your link:</Heading1>
      <pre class="text-danger bg-light">{`${website}${widgetOwner}/widget/CastlediceWaitingRoom?accountId=${sender}`}</pre>
      <Paraghaph>Copy it and send to your friend!</Paraghaph>
    </Background>
  );
}

if (state.newRoomId === null) {
  createRoom(state.creatorId, sender).then((newRoomId) => {
    console.log("New room id:", newRoomId);
    State.update({ newRoomId });
  });
  return (
    <Background>
      <Heading1>Creating your room...</Heading1>
    </Background>
  );
}

if (state.newRoomId !== null) {
  return (
    <Background>
      <Heading1>You have created new game.</Heading1>
      <Paraghaph>
        {"Here's the link of new game. Paste it to new browser tab:"}
      </Paraghaph>
      <pre class="text-danger bg-light">{`${website}${widgetOwner}/widget/CastlediceOnline?roomId=${state.newRoomId}`}</pre>
    </Background>
  );
}
