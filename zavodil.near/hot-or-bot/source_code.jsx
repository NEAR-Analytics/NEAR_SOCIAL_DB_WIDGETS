// hot-or-bot
const accountId = context.accountId;
const appName = "HotOrBot";
const contractId = "hot-or-bot.near";
const ownerId = "zavodil.near";
const last_turn_index = -1;
const max_turns = 4;

initState({ column1: "", show_leaderboard: false });

if (!accountId) {
  return "Please login to play hot-or-bot";
}

if (context.loading) {
  return "Loading...";
}

if (state.show_leaderboard) {
  const winners_data = Social.get(`${contractId}/${appName}/winner/**`);
  if (!winners_data) {
    return "Loading";
  }

  let winners = Object.entries(winners_data).map((item) => (
    <li className="pt-1">
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{ accountId: item[0] }}
      />
    </li>
  ));

  return (
    <>
      <h2>Winners:</h2>
      <ul>{winners}</ul>
      <div className="pt-3">
        <button onClick={() => State.update({ show_leaderboard: false })}>
          Close
        </button>
      </div>
    </>
  );
}

const history_data = Social.keys(`${accountId}/${appName}/*`);

let history = history_data[accountId][appName] ?? [];

Object.entries(history).forEach((turn) => {
  last_turn_index = Math.max(last_turn_index, Number(turn[0]));
});
const turn_index = last_turn_index + 1;

const onCheckResultClick = () => {
  const gas = 80000000000000;
  const deposit = 10000000000000000000000;
  Near.call(contractId, "nft_mint", { receiver_id: accountId }, gas, deposit);
};

if (turn_index >= max_turns) {
  const score = Near.view(contractId, "get_score", {
    account_id: accountId,
  });

  let leaderboardBlock = (
    <div className="pt-3">
      <button onClick={() => State.update({ show_leaderboard: true })}>
        Leaderboard
      </button>
    </div>
  );

  return (
    <>
      <h2>Game Over!</h2>
      {score == null && (
        <div className="pt-4">
          <button onClick={onCheckResultClick}>Check results</button>
          <p className="pt-3">
            You will be asked to deposit 0.01 NEAR to cover the NFT storage.{" "}
            <br />
            This amount will be automatically returned to your account if you do
            not win.
          </p>
        </div>
      )}
      {score != null && (
        <div className="pt-4">
          {score == max_turns && (
            <h4>Congratulatons! You got maximum score and won NFT</h4>
          )}
          {score != max_turns && <h4>Unfortunately you didn't win</h4>}
          <div>Your score: {score}</div>
        </div>
      )}
      {leaderboardBlock}
    </>
  );
}

const turn = Near.view(contractId, "get_turn", {
  account_id: accountId,
  turn: turn_index,
});

if (!turn) {
  return "Loading";
}

if (turn.length !== 2) {
  return "Error";
}

let images = [
  <img src={`https://pluminite.mypinata.cloud/ipfs/${turn[0]}`} />,
  <img src={`https://pluminite.mypinata.cloud/ipfs/${turn[1]}`} />,
];

let bot_index = state.column1 == "bot" ? 0 : 1;

let data = {
  [appName]: {
    [turn_index]: {
      bot: turn[bot_index],
    },
  },
};

return (
  <>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="text-center">{images[0]}</div>
        </div>
        <div className="col">
          <div className="text-center">{images[1]}</div>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <div className="form-switch pt-3">
            <input
              type="radio"
              className="btn-check"
              name="options-1"
              id="hot-1"
              autocomplete="off"
              checked={state.column1 == "hot"}
              onClick={() => {
                State.update({ column1: "hot" });
              }}
            />
            <label class="btn btn-outline-success" for="hot-1">
              Hot
            </label>

            <input
              type="radio"
              class="btn-check"
              name="options-outlined"
              id="bot-1"
              autocomplete="off"
              checked={state.column1 == "bot"}
              onClick={() => {
                State.update({ column1: "bot" });
              }}
            />
            <label class="btn btn-outline-danger" for="bot-1">
              Bot
            </label>
          </div>
        </div>

        <div className="col text-center">
          <div className="form-switch pt-3">
            <input
              type="radio"
              className="btn-check"
              name="options-2"
              id="hot-2"
              autocomplete="off"
              checked={state.column1 == "bot"}
              onClick={() => {
                State.update({ column1: "bot" });
              }}
            />
            <label class="btn btn-outline-success" for="hot-2">
              Hot
            </label>

            <input
              type="radio"
              class="btn-check"
              name="options-outlined"
              id="bot-2"
              autocomplete="off"
              checked={state.column1 == "hot"}
              onClick={() => {
                State.update({ column1: "hot" });
              }}
            />
            <label class="btn btn-outline-danger" for="bot-2">
              Bot
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col text-center pt-3">
          <CommitButton
            data={data}
            disabled={state.column1 == ""}
            onCommit={() => {
              State.update({ column1: "" });
            }}
          >
            Submit
          </CommitButton>
        </div>
      </div>
      <div className="row">
        <div className="col text-center pt-5 opacity-25">
          <div className="container text-center">
            <div className="row justify-content-md-center">
              <div className="col col-4">
                <div className="progress ">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-label="Example with label"
                    style={{ width: `${(turn_index / max_turns) * 100}%` }}
                    aria-valuenow={(turn_index / max_turns) * 100}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {(turn_index / max_turns) * 100}%
                  </div>
                </div>
                <span className="badge bg-secondary opacity-50">
                  Turn {turn_index}/{max_turns}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col text-center pt-5">
          <p>
            Choose which photo is real (hot) and which is generated by AI (bot).
          </p>
          <p>
            Give 4 out of 4 correct answers to receive an NFT and Near.Social
            badge.
          </p>
        </div>
        {leaderboardBlock}
      </div>
    </div>
  </>
);
