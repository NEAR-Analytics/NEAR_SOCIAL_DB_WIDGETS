const virtualPetContract = "0xF7c0fd237B21a1c41277333C94d1B4a6DB5e0c3e";

const virtualPetAbi = fetch(
  "https://indigo-fluttering-emu-841.mypinata.cloud/ipfs/QmcNGm5jYV5fp4KqUZ3ew7F5kkPP7tnr6xP8vx5hPmEjhA"
);

if (!virtualPetAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(virtualPetAbi.body);

State.init({
  inputTokenId: 0,
  tokenId: 0,
  isBusy: false,
});

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}
const getSender = () => {
  console.log("getSender()");
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

const _castData = (data) => {
  console.log("_castData()");
  return {
    tokenId: data[0],
    image: data[1],
    name: data[2],
    happiness: data[3].toNumber(),
    hunger: data[4].toNumber(),
    sleep: data[5].toNumber(),
    currentActivity: data[6],
    isHungry: data[7],
    isSleepy: data[8],
    isBored: data[9],
  };
};

const getNft = () => {
  console.log("getNft()");
  State.update({
    tokenId: state.inputTokenId,
  });
  const contract = new ethers.Contract(
    virtualPetContract,
    virtualPetAbi.body,
    Ethers.provider().getSigner()
  );

  contract.getTokenInfoById(state.inputTokenId).then((res) => {
    const petInfo = [res].map(_castData);
    console.log(petInfo);
    State.update({
      firstSearch: false,
      pet: petInfo[0],
      currentActivity: petInfo[0].currentActivity,
      currentImg: _getCurrentImg(petInfo[0]),
      isBusy: false,
    });
  });
};

const _getCurrentImg = (petInfo) => {
  if (petInfo.isHungry) {
    console.log("isHungry");
    return _getIsHungryImg(petInfo.image);
  } else if (petInfo.isSleepy) {
    console.log("isSleepy");
    return _getIsSleepyImg(petInfo.image);
  } else if (petInfo.isBored) {
    console.log("isBored");
    return _getIsBoredImg(petInfo.image);
  } else if (!petInfo.isHungry && !petInfo.isSleepy && !petInfo.isBored) {
    console.log("It's fine");
    return _getIdleImg(petInfo.image);
  }
};

const _getIdleImg = (img) => {
  console.log("_getIdleImg()");
  console.log(img);
  switch (img) {
    case "https://pin.ski/3Jjp95g":
      return "https://pin.ski/3XjzdRA";
    case "https://pin.ski/3NwRR57":
      return "https://pin.ski/44f1awc";
    case "https://pin.ski/3JfJ1X6":
      return "https://pin.ski/3pieQYu";
  }
};

const _getPlayImg = (img) => {
  console.log("_getPlayImg()");
  console.log(img);
  switch (img) {
    case "https://pin.ski/3Jjp95g":
      return "https://pin.ski/3qRhh4w";
    case "https://pin.ski/3NwRR57":
      return "https://pin.ski/3qRhh4w";
    case "https://pin.ski/3JfJ1X6":
      return "https://pin.ski/3qRhh4w";
  }
};

const _getEatImg = (img) => {
  console.log("_getEatImg()");
  console.log(img);
  switch (img) {
    case "https://pin.ski/3Jjp95g":
      return "https://pin.ski/3peflmc";
    case "https://pin.ski/3NwRR57":
      return "https://pin.ski/3JrypV0";
    case "https://pin.ski/3JfJ1X6":
      return "https://pin.ski/43aHF7b";
  }
};

const _getSleepImg = (img) => {
  console.log("_getSleepImg()");
  console.log(img);
  switch (img) {
    case "https://pin.ski/3Jjp95g":
      return "https://pin.ski/44a09FA";
    case "https://pin.ski/3NwRR57":
      return "https://pin.ski/44dtlvh";
    case "https://pin.ski/3JfJ1X6":
      return "https://pin.ski/3Ps9UuB";
  }
};

const _getIsBoredImg = (img) => {
  console.log("_getIsBoredImg()");
  console.log(img);
  switch (img) {
    case "https://pin.ski/3Jjp95g":
      return "https://pin.ski/43T4jlC";
    case "https://pin.ski/3NwRR57":
      return "https://pin.ski/3Jv5oHU";
    case "https://pin.ski/3JfJ1X6":
      return "https://pin.ski/3CH3ksL";
  }
};

const _getIsHungryImg = (img) => {
  console.log("_getIsHungryImg()");
  console.log(img);
  switch (img) {
    case "https://pin.ski/3Jjp95g":
      return "https://pin.ski/3Xj02Fs";
    case "https://pin.ski/3NwRR57":
      return "https://pin.ski/46hm4wp";
    case "https://pin.ski/3JfJ1X6":
      return "https://pin.ski/3JsFFzP";
  }
};

const _getIsSleepyImg = (img) => {
  console.log("_getIsSleepyImg()");
  console.log(img);
  switch (img) {
    case "https://pin.ski/3Jjp95g":
      return "https://pin.ski/3phdTQ0";
    case "https://pin.ski/3NwRR57":
      return "https://pin.ski/3NJSw3e";
    case "https://pin.ski/3JfJ1X6":
      return "https://pin.ski/3CMf6lD";
  }
};

const play = () => {
  console.log("play()");
  const contract = new ethers.Contract(
    virtualPetContract,
    virtualPetAbi.body,
    Ethers.provider().getSigner()
  );
  contract.play(state.tokenId).then((res) => {
    State.update({
      currentImg: _getPlayImg(state.pet.image),
      isBusy: true,
    });
    setTimeout(() => {
      getNft();
    }, "20000");
  });
};

const eat = () => {
  console.log("eat()");
  const contract = new ethers.Contract(
    virtualPetContract,
    virtualPetAbi.body,
    Ethers.provider().getSigner()
  );

  contract.eat(state.tokenId).then((res) => {
    State.update({
      currentImg: _getEatImg(state.pet.image),
      isBusy: true,
    });
    setTimeout(() => {
      getNft();
    }, "20000");
  });
};

const sleep = () => {
  console.log("sleep()");
  const contract = new ethers.Contract(
    virtualPetContract,
    virtualPetAbi.body,
    Ethers.provider().getSigner()
  );

  contract.doze(state.tokenId).then((res) => {
    State.update({
      currentImg: _getSleepImg(state.pet.image),
      isBusy: true,
    });
    setTimeout(() => {
      getNft();
    }, "20000");
  });
};

const back = () => {
  console.log("back()");
  State.update({
    tokenId: 0,
    pet: null,
  });
};

const ItemBackground = styled.div`
        width: 100%;
        //height: 100vh;
        display: flex;
        justify-content: center;
        margin-bottom: -50px;
        //background-image: url('https://pin.ski/444ghZP');
        background-repeat: no-repeat;
        background-size: cover;
        `;

const ItemContainer = styled.div`
        margin-top: 30px;
        box-sizing: border-box;
        min-width: 500px;
        max-width: 600px;
        width: 100%;
        padding: 0px 32px;
        position: relative;
        `;

const ItemTitle = styled.h3`
        font-weight: 900;
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

const ItemBodySelect = styled.div`
        font-weight: 400;
        font-size: 1em;
        line-height: 1.6em;
        border-radius: 0px 0px 20px 20px;
        margin: -20px 0px 0px;
        padding-inline: 10px;
        box-shadow: none;
        background-image: url('https://pin.ski/42WiqFe');
        background-repeat: no-repeat;
        background-size: cover;        
        color: #feb75b;
        min-height: 500px;
        max-height: auto;
        border: solid 5px;
        `;

const ItemBodyPlay = styled.div`
        font-weight: 400;
        font-size: 1em;
        line-height: 1.6em;
        border-radius: 0px 0px 20px 20px;
        margin: -20px 0px 0px;
        padding-inline: 10px;
        box-shadow: none;
        background-image: url('https://pin.ski/43Xw8cv');
        background-repeat: no-repeat;
        background-size: cover;        
        color: #feb75b;
        min-height: 500px;
        max-height: auto;
        border: solid 5px;
        `;

const ItemPetsSection = styled.div`
        gap: 3rem  7rem !important;
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fit, 160px);
        justify-content: center;
        min-height: 500px;
        max-height: 550px;
        align-content: end;
        `;

const ItemPet = styled.div`
    display: flex !important;
    width: 100%;
    display: flex !important;
    justify-content: center;
    cursor: pointer;
  `;
const ItemPetAction = styled.div`
    gap: 0.25rem !important;
    padding: 1rem !important;
    flex-direction: column !important;
    display: flex !important;
    border: solid 3px;
    border-radius: 20px;
    color: black;
    background: rgb(0 0 0 / 40%);
    align-items: center;
    cursor: pointer;
  `;
const ItemPetImg = styled.img`
    height: 400px;
  `;

const ItemMintButton = styled.button`
        background: #f54866;
        color: white;
        font-weight: 700;
        padding: 10px 15px;
        border-radius: 1rem;
        border: none;
        font-size: 14px;
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

console.log("----------------------------->");
console.log(state);
console.log("<-----------------------------");
const Theme = state.theme;
return (
  <Theme>
    <ItemBackground>
      <ItemContainer>
        <ItemHeader>
          <ItemTitle class="row">
            <div class="col-4" style={{ "text-align": "left" }}>
              <ItemImage src="https://pin.ski/3phJiSm"></ItemImage>
            </div>
            <div
              class="col-4"
              style={{
                "text-shadow":
                  "black 1px 0px 0px, black 0px 1px 0px, black -1px 0px 0px, black 0px -1px 0px",
              }}
            >
              {state.pet.name}
            </div>
            <div class="col-4" style={{ "text-align": "right" }}>
              {state.sender ? (
                state.tokenId == 0 ? (
                  <a href="#/yairnava.near/widget/Burrito-Virtual-Pet-Mint">
                    <ItemMintButton
                      onClick={async () => {
                        mint();
                      }}
                    >
                      Mint Burrito
                    </ItemMintButton>
                  </a>
                ) : (
                  <ItemMintButton
                    onClick={async () => {
                      back();
                    }}
                  >
                    Back
                  </ItemMintButton>
                )
              ) : null}
            </div>
          </ItemTitle>
        </ItemHeader>
        {state.sender ? (
          state.tokenId == 0 ? (
            <ItemBodySelect>
              <div class="m-5">
                <div style={{ "text-align": "center" }}>
                  <img
                    src="https://pin.ski/46lsieQ"
                    style={{
                      height: "230px",
                      background: "#ffe5bc",
                      "border-radius": "10px",
                    }}
                  ></img>
                </div>
                <br />
                <div class="container">
                  <div class="row justify-content-center">
                    <div class="col-4">
                      <input
                        placeholder="Token Id"
                        onChange={(e) =>
                          State.update({ inputTokenId: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <div style={{ "text-align": "center" }}>
                    <ItemMintButton
                      onClick={async () => {
                        getNft();
                      }}
                    >
                      Get NFT
                    </ItemMintButton>
                  </div>
                </div>
              </div>
            </ItemBodySelect>
          ) : (
            <div
              style={{
                background: "rgb(242, 167, 115)",
                "border-radius": "20px",
              }}
            >
              <ItemBodyPlay>
                <div
                  class="row"
                  style={{
                    "text-align": "center",
                    background: "rgb(242, 167, 115)",
                    "margin-inline": "-10px",
                    "border-radius": "1px 1px 0px 0px",
                  }}
                >
                  <div
                    class="col-4"
                    style={{
                      color: "black",
                      display: "flex",
                      "justify-content": "center",
                      "align-items": "center",
                    }}
                  >
                    <img
                      style={{ height: "50px", "margin-right": "10px" }}
                      src="https://pin.ski/3CHsZ4j"
                    ></img>
                    <label style={{ "font-weight": "900" }}>
                      {state.pet.happiness}
                    </label>
                  </div>
                  <div
                    class="col-4"
                    style={{
                      color: "black",
                      display: "flex",
                      "justify-content": "center",
                      "align-items": "center",
                    }}
                  >
                    <img
                      style={{ height: "50px", "margin-right": "10px" }}
                      src="https://pin.ski/3CK6dsM"
                    ></img>
                    <label style={{ "font-weight": "900" }}>
                      {state.pet.hunger}
                    </label>
                  </div>
                  <div
                    class="col-4"
                    style={{
                      color: "black",
                      display: "flex",
                      "justify-content": "center",
                      "align-items": "center",
                    }}
                  >
                    <img
                      style={{ height: "50px", "margin-right": "10px" }}
                      src="https://pin.ski/3piVHFO"
                    ></img>
                    <label style={{ "font-weight": "900" }}>
                      {state.pet.sleep}
                    </label>
                  </div>
                </div>
                <ItemPetsSection>
                  <ItemPet>
                    <>
                      <ItemPetImg src={state.currentImg}></ItemPetImg>
                    </>
                  </ItemPet>
                </ItemPetsSection>
              </ItemBodyPlay>
              <div
                style={{
                  "text-align": "center",
                  "margin-inline": "5px",
                  "margin-top": "7px",
                  "padding-bottom": "7px",
                  height: "68.33px",
                }}
              >
                {!state.isBusy ? (
                  state.pet.isHungry ? (
                    <div class="row">
                      <div class="col-4"></div>
                      <div class="col-4">
                        <ItemPetAction
                          onClick={async () => {
                            eat();
                          }}
                        >
                          <label
                            style={{
                              color: "white",
                              "font-weight": "900",
                              cursor: "pointer",
                            }}
                          >
                            Eat
                          </label>
                        </ItemPetAction>
                      </div>
                      <div class="col-4"></div>
                    </div>
                  ) : state.pet.isSleepy ? (
                    <div class="row">
                      <div class="col-4"></div>
                      <div class="col-4"></div>
                      <div class="col-4">
                        <ItemPetAction
                          onClick={async () => {
                            sleep();
                          }}
                        >
                          <label
                            style={{
                              color: "white",
                              "font-weight": "900",
                              cursor: "pointer",
                            }}
                          >
                            Sleep
                          </label>
                        </ItemPetAction>
                      </div>
                    </div>
                  ) : state.pet.isBored ? (
                    <div class="row">
                      <div class="col-4">
                        <ItemPetAction
                          onClick={async () => {
                            play();
                          }}
                        >
                          <label
                            style={{
                              color: "white",
                              "font-weight": "900",
                              cursor: "pointer",
                            }}
                          >
                            Play
                          </label>
                        </ItemPetAction>
                      </div>
                      <div class="col-4"></div>
                      <div class="col-4"></div>
                    </div>
                  ) : (
                    <div class="row">
                      <div class="col-4">
                        <ItemPetAction
                          onClick={async () => {
                            play();
                          }}
                        >
                          <label
                            style={{
                              color: "white",
                              "font-weight": "900",
                              cursor: "pointer",
                            }}
                          >
                            Play
                          </label>
                        </ItemPetAction>
                      </div>
                      <div class="col-4">
                        <ItemPetAction
                          onClick={async () => {
                            eat();
                          }}
                        >
                          <label
                            style={{
                              color: "white",
                              "font-weight": "900",
                              cursor: "pointer",
                            }}
                          >
                            Eat
                          </label>
                        </ItemPetAction>
                      </div>
                      <div class="col-4">
                        <ItemPetAction
                          onClick={async () => {
                            sleep();
                          }}
                        >
                          <label
                            style={{
                              color: "white",
                              "font-weight": "900",
                              cursor: "pointer",
                            }}
                          >
                            Sleep
                          </label>
                        </ItemPetAction>
                      </div>
                    </div>
                  )
                ) : null}
              </div>
            </div>
          )
        ) : (
          <ItemBodySelect>
            <br />
            <div style={{ "text-align": "center" }}>
              <Web3Connect
                className="ConnectButton"
                connectLabel="Connect with Web3"
              />
            </div>
          </ItemBodySelect>
        )}
      </ItemContainer>
    </ItemBackground>
  </Theme>
);
