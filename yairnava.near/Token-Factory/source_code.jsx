const tokenFactoryContract = "0xdf709303b00d429033c55ec2EA02dc934e6D4593";

const tokenFactoryAbi = fetch(
  "https://nativonft.mypinata.cloud/ipfs/QmQoXbrvBppKDy7i3TGwXcuzp3c98PT8U1CWF2pnm56ptH"
);

if (!tokenFactoryAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(tokenFactoryAbi.body);

State.init({
  tokenOwner: "0x00000000000000000000000000000000",
  tokenName: "MYTOKEN",
  tokenSymbol: "MTKN",
  initialSupply: 10000,
  minting: false,
  showMessage: false,
});

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0], tokenOwner: accounts[0] });
  }
}

// Mint
const mint = () => {
  console.log("mint");
  const contract = new ethers.Contract(
    tokenFactoryContract,
    tokenFactoryAbi.body,
    Ethers.provider().getSigner()
  );

  contract
    .createToken(
      state.tokenOwner,
      state.tokenName,
      state.tokenSymbol,
      state.initialSupply
    )
    .then((res) => {
      console.log(res);

      State.update({
        minting: true,
        showMessage: true,
      });

      setTimeout(() => {
        State.update({
          tokenOwner: state.sender,
          tokenName: "MYTOKEN",
          tokenSymbol: "MTKN",
          initialSupply: 10000,
          minting: false,
        });
      }, "10000");

      setTimeout(() => {
        State.update({
          showMessage: false,
        });
      }, "20000");
    });
};

const ItemBackground = styled.div`
        width: 100%;
        display: flex;
        justify-content: center;
        background-repeat: no-repeat;
        background-size: cover;
        margin-bottom: -50px;
        `;

const ItemContainer = styled.div`
        margin-top: 30px;
        box-sizing: border-box;
        min-width: 320px;
        max-width: 560px;
        width: 100%;
        padding: 0px 32px;
        position: relative;
        `;

const ItemTitle = styled.h3`
        text-align: center;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
        `;

const ItemImage = styled.img`
            width: 40px;
            margin-right: 15px;
        `;

const ItemSubTitle = styled.div`
        text-align: center;
        color: yellow;
        margin-bottom: 5px;
        `;

const ItemHeader = styled.div`
        background: rgb(50,129,130);
        font-weight: 400;
        font-size: 12px;
        line-height: 1.6em;
        border-radius: 20px;
        margin: 0px;
        padding: 20px;
        box-shadow: none;
        color: rgb(255, 255, 255);
        `;

const ItemBody = styled.div`
        font-weight: 400;
        font-size: 1em;
        line-height: 1.6em;
        border-radius: 0px 0px 20px 20px;
        margin: -20px 0px 0px;
        padding: 32px;
        box-shadow: none;
        background: rgb(31,82,82);
        color: black;
        `;

const ItemMintNumber = styled.label`
        font-size: 20px;
        font-weight: 800;
        color: black;
        `;

const ItemMintButton = styled.button`
        background: #f54866;
        color: white;
        font-weight: 700;
        padding: 15px 20px;
        border-radius: 1rem;
        border: none;
        &:hover {
            background: rgb(146 0 0);
        }
        `;

// FETCH CSS
const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Lexend:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://nativonft.mypinata.cloud/ipfs/QmQNCGVCwmkPxcKqDdubvb8Goy5xP8md2MfWCAix7HxgGE"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Lexend;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

return (
  <Theme>
    <ItemBackground>
      <ItemContainer>
        <ItemHeader>
          <ItemTitle>
            <ItemImage src="https://pin.ski/3X5pX3n"></ItemImage>
            <label>Token Factory</label>
          </ItemTitle>
        </ItemHeader>
        <ItemBody>
          {state.sender ? (
            !state.minting ? (
              <div class="row" style={{ color: "white" }}>
                <div class="col-12">
                  <h3>Make a token</h3>
                </div>
                <div class="col-6">
                  <div class="row">
                    <div class="col-12">
                      <div class="mb-3">
                        <label for="sender" class="form-label">
                          👤 Address Token Owner
                        </label>
                        <input
                          value={state.tokenOwner}
                          class="form-control"
                          id="sender"
                          onChange={(e) =>
                            State.update({ tokenOwner: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="mb-3">
                        <label for="symbol" class="form-label">
                          Token Name
                        </label>
                        <input
                          value={state.tokenName}
                          class="form-control"
                          id="symbol" // only allow for numbers
                          onChange={(e) =>
                            State.update({ tokenName: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      "justify-content": "center",
                      "align-items": "center",
                    }}
                  >
                    <img
                      src="https://pin.ski/3NMcIS4"
                      style={{
                        height: "100px",
                      }}
                    ></img>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label for="symbol" class="form-label">
                      Token Symbol
                    </label>
                    <input
                      value={state.tokenSymbol}
                      class="form-control"
                      id="symbol" // only allow for numbers
                      placeholder="TKN"
                      onChange={(e) =>
                        State.update({ tokenSymbol: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label for="supply" class="form-label">
                      Token Supply
                    </label>
                    <input
                      value={state.initialSupply}
                      class="form-control"
                      id="supply"
                      placeholder=""
                      onChange={(e) =>
                        State.update({ initialSupply: e.target.value })
                      }
                    />
                  </div>
                </div>
                {state.showMessage ? (
                  <div class="col-12">
                    <div style={{ "text-align": "center" }} class="mb-3">
                      <label>
                        Minting done visit All tokens tab or start a vesting
                      </label>
                    </div>
                  </div>
                ) : null}
                <div class="col-12">
                  <div class="mb-3">
                    <ItemMintButton
                      onClick={async () => {
                        mint();
                      }}
                    >
                      Create Token
                    </ItemMintButton>
                  </div>
                </div>
                <div class="col-12">
                  <div style={{ "text-align": "center" }}>
                    <label>
                      Powered by{" "}
                      <a href="https://ow.academy/" target="_blank">
                        Open Web Academy
                      </a>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div
                class="row"
                style={{ display: "flex", "justify-content": "center" }}
              >
                <img
                  src="https://pin.ski/43X5rog"
                  style={{
                    height: "200px",
                    width: "200px",
                  }}
                ></img>
                <br />
                <label
                  style={{
                    "font-size": "20px",
                    "font-weight": "400",
                    "text-align": "center",
                  }}
                >
                  Minting...
                </label>
              </div>
            )
          ) : (
            <div style={{ "text-align": "center" }}>
              <Web3Connect
                className="ConnectButton"
                connectLabel="Connect with Web3"
              />
            </div>
          )}
        </ItemBody>
      </ItemContainer>
    </ItemBackground>
  </Theme>
);
