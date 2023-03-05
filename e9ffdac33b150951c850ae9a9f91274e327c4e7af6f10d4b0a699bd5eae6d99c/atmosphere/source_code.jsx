/* Components */
const term = props.searchTerm ? props.searchTerm + "*" : "*";

const users2 = fetch(
  "https://bafybeie6k6htg2ft626s4n3t6gnwcf3nlmka4tlkluphdrxx2zqs2looem.ipfs.w3s.link/web3storage.json"
);
if (!users2.ok) {
  return "Loading";
}

console.log(users2);

const users = {
  users: [
    {
      title: "Living in Denver",
      description:
        "I live off of the street and have been homeless for 2 years. Any help is much appeciated",
      name: "John Smith",
    },
    {
      title: "Boulder Winter",
      description:
        "Boulder is a great place to live even if you are homeless but it get's extremely code in the winter",
      name: "Dave Jones",
    },
    {
      title: "On the Road",
      description:
        "Been living off the land and on the road a huge part of the my life. I don't anyother way",
      name: "David Lee",
    },
  ],
};

// console.log(users);

const Card = styled.div`
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-radius: 5px;
  padding: 30px 0;
  margin-bottom: 10px;
  overflow-wrap: break-word;
`;

const imageEndpoint = "https://astro-prod-ui.s3.us-east-1.amazonaws.com/";

/* Input Code */
const computeResults = (term) => {
  const searchTerm = term.toLowerCase();
  State.update({
    searchTerm,
  });

  if (props.onChange) {
    props.onChange({ searchTerm });
  }
};

/* Ethereum */
const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/Slyracoon23/67ddc4a8e58dabd43e9a6bbccc1903ef/raw/eb3a6cf0f6d9239dbd318cf034bd37220ad493cd/riley-code.json"
);
if (!erc20Abi.ok) {
  return "scam";
}

const iface = new ethers.utils.Interface(erc20Abi.body);

initState({
  token: "",
  tokenDecimals: "",
  sendTo: "",
  sender,
  senderBalance: "0",
  receiverBalance: "0",
  receiver: "",
  amount: "1",
});

const getTokenBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: state.token,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(state.tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const getTokenDecimals = () => {
  const encodedData = iface.encodeFunctionData("decimals", []);

  return Ethers.provider()
    .call({
      to: state.token,
      data: encodedData,
    })
    .then((tokenDecimals) => {
      State.update({ tokenDecimals: parseInt(Number(tokenDecimals)) });
      refreshBalances();
    });
};

const refreshBalances = () => {
  getTokenBalance(state.sender).then((value) => {
    State.update({ senderBalance: value });
  });

  getTokenBalance(state.receiver).then((value) => {
    State.update({ receiverBalance: value });
  });
};

const sendTokens = () => {
  const erc20 = new ethers.Contract(
    state.token,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(state.amount, state.tokenDecimals);

  erc20.transfer(state.receiver, amount);

  console.log("transactionHash is " + transactionHash);
};

const open = () => {
  let receiver = "0x5ada39e766c416ca083d8c7e43104f2c7cf2194a";
  let amount = "100";
  const erc20 = new ethers.Contract(
    "0x7fe350bda863478d61d3bf302aa35818e36e447b",
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  erc20.open(receiver, "10");

  console.log("transactionHash is " + transactionHash);
};

const airdrop = () => {
  console.log("123");
  const erc20 = new ethers.Contract(
    "0x7fe350bda863478d61d3bf302aa35818e36e447b",
    erc20Abi.body,
    Ethers.provider().getSigner()
  );
  erc20.airdrop("100000");

  console.log("transactionHash is " + transactionHash);
};

/* Main export */
return (
  <>
    <h2>Atomosphere</h2>
    <input
      type="text"
      className="form-control"
      value={state.searchTerm ?? ""}
      onChange={(e) => computeResults(e.target.value)}
      placeholder={props.placeholder ?? `🔍 Search Components`}
    />

    {props.debug && <pre>{JSON.stringify(state.searchTerm, undefined, 2)}</pre>}
    <div className="container py-4">
      {users
        ? users.users.map((user) => {
            const bountyId = bounty._source.id;
            return (
              <div className="row justify-content-md-center py-2 px-5">
                <div className="col-2 justify-content-md-center"></div>
                <div className="col-10">
                  <h4>{user.title}</h4>
                  <Card>
                    <div
                      style={{
                        borderBottom: "1px solid",
                        borderColor: "rgba(0,0,0,0.2)",
                      }}
                    >
                      <div style={{ padding: "0 30px 15px" }}>
                        <b>Summary:</b>
                        <br />
                        {user.description}
                      </div>
                    </div>
                    <div style={{ padding: "15px 30px 0" }}>
                      <b>0.1 ETH</b>
                    </div>
                  </Card>
                  <div className="row">
                    <div className="col">
                      <h3>Send Donation</h3>
                      <div class="mb-3">
                        <label for="selectToken">Select token</label>
                        <select
                          class="form-select"
                          id="selectToken"
                          onChange={(e) => {
                            setToken(e.target.value);
                          }}
                        >
                          {tokensMenuItems}
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="send-to" class="form-label">
                          Recepient address
                        </label>
                        <input
                          value={state.sendTo}
                          class="form-control"
                          id="send-to"
                          placeholder="vitalik.eth"
                          onChange={(e) => setSendTo(e.target.value)}
                        />
                        {state.receiver && (
                          <div class="text-secondary mt-3">
                            Resolved to {state.receiver}
                          </div>
                        )}
                        {state.receiverBalance != "0" && (
                          <div class="text-secondary mt-3">
                            Receiver's balance: {state.receiverBalance}
                          </div>
                        )}

                        {state.senderBalance != "0" && (
                          <div class="text-secondary mt-3">
                            Sender's balance: {state.senderBalance}
                          </div>
                        )}
                      </div>
                      <div class="mb-3">
                        <label for="amount" class="form-label">
                          Enter the amount
                        </label>
                        <input
                          value={state.amount}
                          class="form-control"
                          id="amount"
                          placeholder=""
                          onChange={(e) =>
                            State.update({ amount: e.target.value })
                          }
                        />
                      </div>
                      <div class="mb-3">
                        <button onClick={airdrop}>AirDrop</button>
                        <button onClick={open}>Send</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : "Fetching"}
    </div>
  </>
);
