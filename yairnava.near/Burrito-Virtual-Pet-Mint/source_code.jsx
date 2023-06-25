const virtualPetContract = "0x559bB1D9a4236e6Fc3D3314c8832Ddf5476606C2";

const virtualPetAbi = fetch(
  "https://indigo-fluttering-emu-841.mypinata.cloud/ipfs/QmcNGm5jYV5fp4KqUZ3ew7F5kkPP7tnr6xP8vx5hPmEjhA"
);

if (!virtualPetAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(virtualPetAbi.body);

State.init({
  init: true,
  mintedBurritos: 0,
  burritoName: "",
  minting: false,
});

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

if (state.sender && state.init) {
  console.log("getMintedTokens()");
  const contract = new ethers.Contract(
    virtualPetContract,
    virtualPetAbi.body,
    Ethers.provider().getSigner()
  );

  // Consultar mascotas minadas
  contract.getMintedTokens().then((res) => {
    State.update({
      mintedBurritos: res.toNumber(),
    });
  });
}

// Mint
const mint = () => {
  const contract = new ethers.Contract(
    virtualPetContract,
    virtualPetAbi.body,
    Ethers.provider().getSigner()
  );

  contract.mintPet(state.burritoName).then((res) => {
    const lastId = (state.mintedBurritos += 1);
    State.update({
      init: false,
      burritoName: "",
      mintedBurritos: lastId,
      minting: true,
    });
    setTimeout(() => {
      contract.getMintedTokens().then((res) => {
        State.update({
          //mintedBurritos: res.toNumber(),
          minting: false,
        });
      });
    }, "20000");
  });
};

const ItemBackground = styled.div`
        width: 100%;
        //height: 100vh;
        display: flex;
        justify-content: center;
        //background-image: url('https://pin.ski/3XjZcs8');
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
        text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue;
        text-align: center;
        color: yellow;
        margin-bottom: 5px;
        `;

const ItemHeader = styled.div`
        background: #64473f;
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
        padding-inline: 32px;
        padding-top: 32px;
        box-shadow: none;
        background: #feb75b;
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

// Render
return (
  <Theme>
    <ItemBackground>
      <ItemContainer>
        <ItemHeader>
          <ItemTitle>
            <ItemImage src="https://pin.ski/3phJiSm"></ItemImage>
            <label
              style={{
                "text-shadow":
                  "1px 0px 0px black, 0px 1px 0px black, -1px 0px 0px black, 0px -1px 0px black",
              }}
            >
              Burrito Virtual Pets
            </label>
          </ItemTitle>
        </ItemHeader>
        <ItemBody>
          {state.sender ? (
            <div class="container text-center">
              <div>
                <ItemMintNumber>
                  Last Burrito Id: {state.mintedBurritos}
                </ItemMintNumber>
              </div>
              <br />
              {!state.minting ? (
                <div>
                  <div>
                    <input
                      placeholder="Burrito name"
                      value={state.burritoName}
                      onChange={(e) =>
                        State.update({ burritoName: e.target.value })
                      }
                    />
                  </div>
                  <br />
                  <div>
                    <ItemMintButton
                      onClick={async () => {
                        mint();
                      }}
                    >
                      Mint Burrito
                    </ItemMintButton>
                    <br /> <br />
                    <div>
                      <a
                        href="#/yairnava.near/widget/Burrito-Virtual-Pet-Interact"
                        style={{ color: "black" }}
                      >
                        Go to Play
                      </a>
                    </div>
                    <br />
                    <div>
                      <label style={{ color: "black", "font-weight": "500" }}>
                        {" "}
                        Burrito’s contract to add your NFTs to wallet
                        0x559bB1D9a4236e6Fc3D3314c8832Ddf5476606C2
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <img
                    src="https://pin.ski/42XCmaZ"
                    style={{
                      height: "169px",
                      background: "rgb(255, 229, 188)",
                      "border-radius": "10px",
                    }}
                  ></img>
                  <br />
                  <label style={{ "font-size": "20px", "font-weight": "400" }}>
                    Minting...
                  </label>
                </div>
              )}
              <br />
            </div>
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
