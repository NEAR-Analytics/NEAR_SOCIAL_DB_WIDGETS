State.init({
  form: {},
  submitted: false,
  updates: [],
  playerPos: { x: 0, y: 0 },
});

const playerSession = (accountId) => {
  return Social.get(accountId + "/canvasParty/session/**", "optimistic", {
    subscribe: true, // refresh once in 5s
  });
};

const onlineState = playerSession(context.accountId);
console.log(onlineState);

const main = () => {
  if (onlineState) {
    if (onlineState.otherPlayer !== "") {
      const otherPlayer = onlineState.otherPlayer;
      const otherPlayerState = playerSession(otherPlayer);
      if (onlineState.activePlayer === "") {
        if (otherPlayerState.otherPlayer === context.accountId) {
          return playing(onlineState, otherPlayerState);
        } else {
          return waiting(onlineState);
        }
      } else {
        return playing(onlineState, otherPlayerState);
      }
    } else {
      return noGame();
    }
  } else {
    return noState();
  }
};

const noState = () => {
  //return <h2>Loading...</h2>;
  return noGame();
};

const noGame = () => {
  if (!state.submitted) {
    return home();
  } else {
    const otherPlayer = state.form.accountId;
    const otherPlayerState = playerSession(otherPlayer);
    if (otherPlayerState === null) {
      return <h2>Searching your friend...</h2>;
    }
    if (otherPlayerState && otherPlayerState.otherPlayer == context.accountId) {
      return startGameScreen(otherPlayer, context.accountId);
    } else {
      return openLobbyScreen(otherPlayer);
    }
  }
};

const home = () => {
  return (
    <div
      style={{
        display: "grid",
        padding: "10px",
      }}
    >
      <h2>Join a Canvas Party!</h2>
      <p>The game currently supports 2-player mode only.</p>
      <p>
        Both players need to type in their friends ID for the game to start.
      </p>
      <label>
        Account ID of friend:
        <input
          type="text"
          value={state.form.accountId}
          onChange={(e) => {
            const accountId = e.target.value
              .toLowerCase()
              .replace(/[^a-z0-9_.-]/g, "");
            state.form = { accountId };
            State.update();
          }}
        />
      </label>
      <button
        onClick={() => {
          state.submitted = true;
          State.update();
        }}
      >
        Connect
      </button>
    </div>
  );
};

const openLobbyScreen = (otherPlayer) => {
  return (
    <div>
      <h2>Host a Canvas Party!</h2>
      <p>{otherPlayer} is not here, yet.</p>
      <CommitButton
        style={{ width: "360px" }}
        data={{
          canvasParty: {
            session: {
              pixels: [],
              otherPlayer,
              activePlayer,
              start: null,
            },
          },
        }}
      >
        Open New Party
      </CommitButton>
      <button
        onClick={() => {
          state.submitted = false;
          State.update();
        }}
      >
        Cancel
      </button>
    </div>
  );
};

const startGameScreen = (otherPlayer, activePlayer) => {
  return (
    <div>
      <h2>Join a Canvas Party!</h2>
      <p>{otherPlayer} is hosting a party for you!</p>
      <CommitButton
        style={{ width: "360px" }}
        data={{
          canvasParty: {
            session: {
              pixels: [],
              otherPlayer,
              activePlayer,
              start: Date.now(),
            },
          },
        }}
      >
        Join
      </CommitButton>
      <button
        onClick={() => {
          state.submitted = false;
          State.update();
        }}
      >
        Cancel
      </button>
    </div>
  );
};

const waiting = (onlineState) => {
  return (
    <div>
      <h2>You are alone :(</h2>
      <p>Waiting for {onlineState.otherPlayer} to join.</p>
      <p>They have to type in {context.accountId} and click play.</p>
      <CommitButton
        style={{ width: "360px" }}
        data={{
          canvasParty: {
            session: {
              pixels: [],
              otherPlayer: "",
              activePlayer: "",
              start: null,
            },
          },
        }}
      >
        Cancel Party
      </CommitButton>
    </div>
  );
};

const playing = (mySession, theirSession) => {
  // no idea how that happened but no time to debug ^.^
  if (typeof mySession.pixels === "string") {
    mySession.pixels = JSON.parse(mySession.pixels);
  }
  if (typeof theirSession.pixels === "string") {
    theirSession.pixels = JSON.parse(theirSession.pixels);
  }
  if (
    theirSession.activePlayer === context.accountId &&
    mySession.activePlayer !== context.accountId &&
    mySession.pixels.length < theirSession.pixels.length
  ) {
    // they finished their turn, need to update our session
    mySession.activePlayer = context.accountId;
    mySession.pixels = theirSession.pixels;
    mySession.start = theirSession.start;
  }
  if (theirSession.activePlayer === "gameover") {
    mySession.activePlayer = "gameover";
  }
  return (
    <div>
      <Widget
        src="jakmeier.near/widget/CanvasPartyGame"
        props={{ session: mySession }}
      />
      <CommitButton
        style={{ width: "360px" }}
        data={{
          canvasParty: {
            session: {
              otherPlayer: "",
              activePlayer: "",
              start: null,
            },
          },
        }}
      >
        Exit Party
      </CommitButton>
    </div>
  );
};

// putting this here at the endto avoid hoisting errors
return main();
