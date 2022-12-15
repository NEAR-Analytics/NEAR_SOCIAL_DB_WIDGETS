State.init({ form: {} });

/*
const onlineState = Social.index("canvasParty", "session", {
  order: "desc",
  limit: 1, // we only want the latest version
  subscribe: true, // refresh once in 5s
});
*/

const onlineState = Social.get(
  context.accountId + "/canvasParty/session/**",
  "optimistic",
  {
    subscribe: true, // refresh once in 5s
  }
);
//console.log(onlineState);

const main = () => {
  if (onlineState) {
    if (onlineState.activePlayer === "") {
      return waiting(onlineState);
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
      <CommitButton
        data={{
          canvasParty: {
            session: {
              pixels: [],
              otherPlayer: state.form.accountId,
              activePlayer: "",
            },
          },
        }}
      >
        Play
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
