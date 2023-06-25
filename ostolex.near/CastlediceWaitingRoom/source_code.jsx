const Background = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Oldenburg&display=swap');
  background-image: url("https://raw.githubusercontent.com/OSTOLEX-Technologies/Castledice-frontend/main/public/assets/Menu%20and%20loading%20screen%20background%20dark.png");
  background-size: cover;
  position: fixed;
  width: 100vw;
  height: calc(-98px + 100vh);
  top: 98px;
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

const website = "https://near.org/";
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

const abiObjData = fetch(
  "https://raw.githubusercontent.com/OSTOLEX-Technologies/Castledice-smart-contract/main/abi.json"
);

if (!abiObjData) {
  return <h1>Fetching ABI...</h1>;
}
const abiObj = JSON.parse(abiObjData.body);

const contractId = "0xAb926c04Fa3E0CbE23f51BE4Ea2B0777cbB675CC";

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
  Ethers.provider("https://mainnet.aurora.dev").getSigner()
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
