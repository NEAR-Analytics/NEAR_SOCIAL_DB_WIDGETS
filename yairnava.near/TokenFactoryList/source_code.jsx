const tokenFactoryContract = "0xA6f5dfd3C36b1874a213893af4BEDddC9EFB9d63";

const tokenFactoryAbi = fetch(
  "https://indigo-fluttering-emu-841.mypinata.cloud/ipfs/QmQ3HSBoEjcsodCEUJK1YQGCMPjAv6Co4enebiGM5rMCKj"
);

if (!tokenFactoryAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(tokenFactoryAbi.body);

State.init({
  page: 1,
  increment: 10,
  limit: 10,
  offset: 0,
  allNumberTokens: 0,
});

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

const getTokens = () => {
  console.log("Get Tokens");
  const contract = new ethers.Contract(
    tokenFactoryContract,
    tokenFactoryAbi.body,
    Ethers.provider().getSigner()
  );
  contract.getNumberTokens().then((res) => {
    State.update({ allNumberTokens: res });
    contract.allTokens(state.limit, state.offset).then((res) => {
      State.update({ tokenList: res });
    });
  });
};

const reload = () => {
  State.update({ offset: 0, page: 1 });
  getTokens();
};

const previous = () => {
  State.update({
    page: state.page - 1,
    offset: state.offset - state.increment,
  });
};

const next = () => {
  State.update({
    page: state.page + 1,
    offset: state.offset + state.increment,
  });
};

if (state.sender) {
  getTokens();
}

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

const ItemButton = styled.button`
        width: 80px;
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
  "https://indigo-fluttering-emu-841.mypinata.cloud/ipfs/QmRR5YSEY4ot49AGGTY5i7UoyH4FNx7KDRvVjDPuSbzEdn"
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
            <label>Token List</label>
          </ItemTitle>
        </ItemHeader>
        <ItemBody>
          {state.sender ? (
            state.tokenList && state.tokenList.length > 0 ? (
              <div class="row">
                <div
                  class="col-12"
                  style={{
                    "text-align": "right",
                    "margin-bottom": "10px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="https://pin.ski/3XqH53N"
                    style={{ width: "30px" }}
                    onClick={async () => {
                      reload();
                    }}
                  ></img>
                </div>

                <table className="table table-sm">
                  <thead>
                    <tr
                      class="p-3 mb-2 bg-gradient rounded-5 text-center"
                      style={{
                        background: "rgb(245, 72, 102)",
                        color: "white",
                      }}
                    >
                      <th>#</th>
                      <th>Token Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.tokenList.map((data, key) => {
                      return (
                        <>
                          <tr class="text-center">
                            <td>
                              {key + 1 + (state.page - 1) * state.increment}
                            </td>
                            <td>{data}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
                <div class="row">
                  <div class="col-6" style={{ "text-align": "center" }}>
                    {state.offset > 0 ? (
                      <ItemButton
                        onClick={async () => {
                          previous();
                        }}
                      >
                        Prev
                      </ItemButton>
                    ) : null}
                  </div>
                  <div class="col-6" style={{ "text-align": "center" }}>
                    {state.limit < state.allNumberTokens ? (
                      <ItemButton
                        onClick={async () => {
                          next();
                        }}
                      >
                        Next
                      </ItemButton>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <div
                class="row"
                style={{
                  display: "flex",
                  "justify-content": "center",
                  color: "white",
                }}
              >
                <div
                  class="col-12"
                  style={{
                    "text-align": "right",
                    "margin-bottom": "10px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="https://pin.ski/3XqH53N"
                    style={{ width: "30px" }}
                    onClick={async () => {
                      reload();
                    }}
                  ></img>
                </div>
                NO TOKENS CREATED
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
