const switchStyle = {
  display: "block",
  position: "relative",
  cursor: "pointer",
};

const boardSetupButton = {
  display: "block",
  marginBottom: "3em",
  fontFamily: "Kadwa",
  fontWeight: "bold",
  color: "#000",
};

const baordSelectButton = {
  border: "2px solid blue",
  display: "block",
  marginBottom: "3em",
  fontFamily: "Kadwa",
  fontWeight: "bold",
  color: "#000",
};

const boardSetupImage = {
  width: "24em",
  height: "12em",
};

const gameSetups = [
  {
    name: "ACE",
    imgSrc:
      "https://raw.githubusercontent.com/near-social-laser-chess/vault/main/Board%20setups/Ace%20board%20setup.png",
  },
  {
    name: "CURIOSITY",
    imgSrc:
      "https://raw.githubusercontent.com/near-social-laser-chess/vault/main/Board%20setups/Curiosity%20board%20setup.png",
  },
  {
    name: "GRAIL",
    imgSrc:
      "https://raw.githubusercontent.com/near-social-laser-chess/vault/main/Board%20setups/Grail%20board%20setup.png",
  },
  {
    name: "MERCURY",
    imgSrc:
      "https://raw.githubusercontent.com/near-social-laser-chess/vault/main/Board%20setups/Mercury%20board%20setup.png",
  },
  {
    name: "SOPHIE",
    imgSrc:
      "https://raw.githubusercontent.com/near-social-laser-chess/vault/main/Board%20setups/Sophie%20board%20setup.png",
  },
  {
    name: "RANDOM",
    imgSrc:
      "https://raw.githubusercontent.com/near-social-laser-chess/vault/main/Board%20setups/Random%20board%20setup.png",
  },
];

const setupButtons = gameSetups.map((setup) => {
  const item = (
    <div class="col-sm-4">
      <button
        type="button"
        class="btn btn-light"
        style={
          setup.name === state.selectedSetup
            ? baordSelectButton
            : boardSetupButton
        }
        onClick={() => {
          State.update({ selectedSetup: setup.name });
        }}
      >
        <img src={setup.imgSrc} style={boardSetupImage}></img>
        {setup.name}
      </button>
    </div>
  );
  return item;
});

const pages = {
  menu: "MainMenu",
  game: "Game",
  gameSetup: "GameSetup",
};

State.init({ currentPage: pages.gameSetup, isPvE: null, selectedSetup: null });
if (state.currentPage === pages.menu) {
  return <Widget src="let45fc.near/widget/MainMenu" />;
}

if (state.currentPage === pages.game) {
  if (typeof props.callback === "function") {
    props.callback(state.isPvE, state.selectedSetup);
  }
}

if (state.currentPage === pages.connectToGame) {
  if (typeof props.connectToGameCallback === "function") {
    props.connectToGameCallback();
  }
}

const playGame = () => {
  State.update({ currentPage: pages.game });
};

const connectToGame = () => {
  State.update({ currentPage: pages.connectToGame });
};

return (
  <>
    <div class="container">
      <button
        onClick={() => {
          State.update({ currentPage: pages.menu });
        }}
        type="button"
        class="btn btn-secondary"
      >
        <i class="bi bi-arrow-left" style={{ marginBottom: "30px" }}></i> Go
        back
      </button>
      <div class="row">
        <p style={{ textAlign: "center", height: "30px" }}>
          Create or
          <button
            type="button"
            class="btn btn-outline-secondary"
            onClick={() => {
              connectToGame();
            }}
          >
            {" "}
            connect to existing game
          </button>
        </p>
      </div>
      <div class="row">
        <p style={{ textAlign: "center", height: "14px" }}>
          <b>Choose your game type:</b>
        </p>
      </div>
      <div class="row" style={{ margin: "auto", width: "130px" }}>
        <div class="form-check" style={{ width: "65px" }}>
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onClick={() => {
              State.update({ isPvE: true });
            }}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            PvE
          </label>
        </div>
        <div class="form-check" style={{ width: "65px" }}>
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            onClick={() => {
              State.update({ isPvE: false });
            }}
          />
          <label class="form-check-label" for="flexRadioDefault2">
            PvP
          </label>
        </div>
      </div>
      <p style={{ textAlign: "center" }}>
        <b>Choose your board setup:</b>
      </p>
      <div class="row">
        {setupButtons[0]}
        {setupButtons[1]}
        {setupButtons[2]}
      </div>
      <div class="row">
        {setupButtons[3]}
        {setupButtons[4]}
        {setupButtons[5]}
      </div>

      <div>
        <button
          style={{
            background:
              "linear-gradient(15.09deg, rgba(0, 109, 210, 0.69) 9.51%, rgba(121, 178, 232, 0.69) 141.73%)",
            height: "3em",
            width: "8em",
            fontFamily: "Kadwa",
            display: "block",
            margin: "auto",
            border: "#fff",
          }}
          onClick={() => {
            playGame();
          }}
          disabled={!state.selectedSetup || state.isPvE === null}
        >
          <b>Play!</b>
        </button>
      </div>
    </div>
  </>
);
