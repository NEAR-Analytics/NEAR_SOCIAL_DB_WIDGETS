const tokenVestingContract = "0xf3ebedb4AF312d9F702778d15Ae47D145D1F3833";

const tokenVestingAbi = fetch(
  "https://indigo-fluttering-emu-841.mypinata.cloud/ipfs/QmWgiPS57myEEEgjT1caTwMzTKcxNbquf3QGwMepjq3s1b"
);

if (!tokenVestingAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(tokenVestingAbi.body);
const pillsVesting = [
  { id: "vesting", title: "Vesting" },
  { id: "release", title: "Release" },
];

State.init({
  error: "",
  general: true,
  _beneficiary: "0x000000000",
  _cliffDuration: null,
  _vestingDuration: null,
  _start: null,
  _totalTokens: null,
  _tokenAddress: "0x000000000",
});

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

const setVesting = () => {
  console.log("setVesting");
  validates_fields();

  const contract = new ethers.Contract(
    tokenVestingContract,
    tokenVestingAbi.body,
    Ethers.provider().getSigner()
  );

  console.log(state);

  contract
    .setVesting(
      state._beneficiary,
      state._cliffDuration,
      state._vestingDuration,
      state._start,
      state._totalTokens,
      state._tokenAddress
    )
    .then((res) => {
      State.update({
        _beneficiary: "0x000000000",
        _cliffDuration: null,
        _vestingDuration: null,
        _start: null,
        _totalTokens: null,
        _tokenAddress: "0x000000000",
      });
    });
};

const releaseVesting = () => {
  const contract = new ethers.Contract(
    tokenVestingContract,
    tokenVestingAbi.body,
    Ethers.provider().getSigner()
  );

  try {
    contract.release().then((res) => {
      if (res) {
        console.log(res);
      } else {
        console.log("error");
      }
    });
  } catch (error) {
    console.log(error);
    console.log(error.error);
  }
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

const validates_fields = () => {
  const isEmpty = (field) => {
    return field === "" ? true : false;
  };
  const isDateEmpty = (field) => {
    return field === null ? true : false;
  };
  if (isEmpty(state._beneficiary)) {
    console.log("Fill the beneficiary");
    State.update({ error: "Fill the beneficiary" });
    return;
  }
  if (isDateEmpty(state._cliffDuration)) {
    console.log("Fill the _cliffDuration");
    State.update({ error: "Fill the cliff duration" });
    return;
  }
  if (isDateEmpty(state._totalTokens)) {
    console.log("Fill the TotalTokens");
    State.update({ error: "Fill the total tokens" });
    return;
  }
  if (isEmpty(state._tokenAddress)) {
    console.log("Fill the TotalTokens");
    State.update({ error: "Fill the tokens address" });
    return;
  }
  if (isDateEmpty(state._vestingDuration)) {
    console.log("Fill the _vestingDuration");
    State.update({ error: "Fill the vesting duration" });
    return;
  }
  if (isDateEmpty(state._start)) {
    console.log("Fill the start");
    State.update({ error: "Fill the start" });
    return;
  }
};

const TabSection = styled.div`
display:flex;
width:100%; 
flex-direction: row;
@media screen and (min-width: 480px) {
  
}
`;
const toTimestamp = (strDate) => {
  const dt = new Date(strDate).getTime();
  return dt / 1000;
};
const Theme = state.theme;

return (
  <Theme>
    <ItemBackground>
      <ItemContainer>
        <ItemHeader>
          <ItemTitle>
            <ItemImage src="https://pin.ski/3X5pX3n"></ItemImage>
            <label>Token Vesting</label>
          </ItemTitle>
        </ItemHeader>
        <ItemBody>
          {state.sender ? (
            <>
              <ul
                className="nav nav-pills nav-fill mb-4"
                id="pills-tab2"
                role="tablist2"
              >
                {pillsVesting.map(({ id, title }, i) => (
                  <li className="nav-item" role="presentation" key={i}>
                    <button
                      className={`nav-link ${i === 0 ? "active" : ""}`}
                      id={`pills2-${id}-tab`}
                      data-bs-toggle="pill"
                      data-bs-target={`#pills2-${id}`}
                      type="button"
                      role="tab"
                      aria-controls={`pills2-${id}`}
                      aria-selected={i === 0}
                      onClick={() => {
                        const key = `load${id}`;
                        !state[key] && State.update({ [key]: true });
                      }}
                    >
                      {title}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills2-vesting"
                  role="tabpanel"
                  aria-labelledby="pills-vesting-tab"
                >
                  <div name="ADD">
                    <div class="row w-100 ">
                      <div class="col-5 mx-auto px-auto">
                        <label
                          for="sender"
                          class="form-label"
                          style={{ color: "#ffffff" }}
                        >
                          Beneficiary
                        </label>
                        <input
                          value={state._beneficiary}
                          class="form-control"
                          id="sender"
                          type="text"
                          placeholder="Beneficiary address"
                          onChange={(e) =>
                            State.update({
                              _beneficiary: e.target.value,
                              error: "",
                            })
                          }
                        />
                      </div>
                      <div class="col-5 mx-auto px-auto">
                        <label
                          for="sender"
                          class="form-label"
                          style={{ color: "#ffffff" }}
                        >
                          Cliff Duration
                        </label>
                        <input
                          value={state._cliffDuration}
                          class="form-control"
                          id="sender"
                          type="number"
                          placeholder="In timestamp"
                          onChange={(e) => {
                            console.log(e, toTimestamp("2021-01-01"));
                            State.update({
                              _cliffDuration: e.target.value,
                              error: "",
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div class="row w-100 ">
                      <div class="col-5 mx-auto px-auto">
                        <label
                          for="sender"
                          class="form-label"
                          style={{ color: "#ffffff" }}
                        >
                          Total Tokens
                        </label>
                        <input
                          value={state._totalTokens}
                          class="form-control"
                          id="sender"
                          type="number"
                          placeholder="Amount to vest"
                          onChange={(e) =>
                            State.update({
                              _totalTokens: e.target.value,
                              error: "",
                            })
                          }
                        />
                      </div>
                      <div class="col-5 mx-auto px-auto">
                        <label
                          for="sender"
                          class="form-label"
                          style={{ color: "#ffffff" }}
                        >
                          Token Address
                        </label>
                        <input
                          value={state._tokenAddress}
                          class="form-control"
                          id="sender"
                          placeholder="Token address to vest"
                          onChange={(e) =>
                            State.update({
                              _tokenAddress: e.target.value,
                              error: "",
                            })
                          }
                        />
                      </div>
                    </div>

                    <div class="row w-100 ">
                      <div class="col-5 mx-auto px-auto">
                        <label
                          for="sender"
                          class="form-label"
                          style={{ color: "#ffffff" }}
                        >
                          Vesting Duration
                        </label>
                        <input
                          type="number"
                          value={state._vestingDuration}
                          class="form-control bg-white text-black"
                          id="sender"
                          placeholder="Duration in timestamp"
                          onChange={(e) =>
                            State.update({
                              _vestingDuration: e.target.value,
                              error: "",
                            })
                          }
                        />
                      </div>
                      <div class="col-5 mx-auto px-auto ">
                        <label
                          for="sender"
                          class="form-label "
                          style={{ color: "#ffffff" }}
                        >
                          Start
                        </label>
                        <input
                          value={state._start}
                          class="form-control"
                          id="sender"
                          type="number"
                          placeholder="Start in timestamp"
                          onChange={(e) =>
                            State.update({
                              _start: e.target.value,
                              error: "",
                            })
                          }
                        />
                      </div>
                    </div>
                    <div
                      class="col-12"
                      style={{ display: "flex", "justify-content": "center" }}
                    >
                      <div class="mb-3  mt-4 ">
                        {state.error != "" ? (
                          <label class="text-danger bg-white rounded mx-2 px-2 ">
                            {state.error}
                          </label>
                        ) : (
                          <button
                            style={{ "text-align": "center" }}
                            onClick={async () => {
                              setVesting();
                            }}
                          >
                            Set Vesting
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade release"
                  id="pills2-release"
                  role="tabpanel"
                  aria-labelledby="pills-release-tab"
                >
                  <div
                    class="col-12"
                    style={{ display: "flex", "justify-content": "center" }}
                  >
                    <div class="mb-3  mt-4 ">
                      <button
                        style={{ "text-align": "center" }}
                        onClick={async () => {
                          releaseVesting();
                        }}
                      >
                        Release Vesting
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade vesting"
                  id="pills-vesting"
                  role="tabpanel"
                  aria-labelledby="pills-vesting-tab"
                >
                  <label>VESTING </label>
                </div>
              </div>
            </>
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
