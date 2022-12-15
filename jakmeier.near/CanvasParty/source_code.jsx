State.init({ form: {}, submitted: false });

const playerSession = (accountId) => {
  return Social.get(accountId + "/canvasParty/session/**", "optimistic", {
    subscribe: true, // refresh once in 5s
  });
};

const onlineState = playerSession(context.accountId);
//console.log(onlineState);

const main = () => {
  if (onlineState) {
    const otherPlayerState = playerSession(onlineState.otherPlayer);
    if (!otherPlayerState) {
      return waiting(onlineState);
    }
    if (onlineState.activePlayer === "") {
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
    if (otherPlayerState === undefined) {
      return openLobbyScreen(otherPlayer);
    } else {
      return startGameScreen(otherPlayer, context.accountId);
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
      <Button onClick={()=>} >
        Connect
      </Button>
    </div>
  );
};

const openLobbyScreen = (otherPlayer) => {
  return (
    <div>
      <h2>Host a Canvas Party!</h2>
      <p>{otherPlayer} is not here, yet.</p>
      <CommitButton
        data={{
          canvasParty: {
            session: {
              pixels: [],
              otherPlayer,
              activePlayer,
            },
          },
        }}
      >
        Open New Party
      </CommitButton>
    </div>
  );
};

const startGameScreen = (otherPlayer, activePlayer) => {
  return (
    <div>
      <h2>Join a Canvas Party!</h2>
      <p>{otherPlayer} is hosting a party for you!</p>
      <CommitButton
        data={{
          canvasParty: {
            session: {
              pixels: [],
              otherPlayer,
              activePlayer,
            },
          },
        }}
      >
        Join
      </CommitButton>
    </div>
  );
};

const waiting = (onlineState) => {
  if (onlineState.activePlayer === "") {
    return (
      <div>
        <h2>You are alone :(</h2>
        <p>Waiting for {onlineState.otherPlayer} to join.</p>
        <p>They have to type in {context.accountId} and click play.</p>
        <CommitButton
          data={{
            canvasParty: {
              session: null,
            },
          }}
        >
          Cancel Party
        </CommitButton>
      </div>
    );
  }
};

// putting this here at the end avoids errors due to missing hoisting
return main();
