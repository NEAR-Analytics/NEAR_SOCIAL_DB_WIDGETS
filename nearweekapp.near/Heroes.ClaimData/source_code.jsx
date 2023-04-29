const tokenMap = {
  "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near": {
    symbol: "USDT.e",
    decimals: 6,
  },
  "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near": {
    symbol: "USDC.e",
    decimals: 6,
  },
  "6b175474e89094c44da98b954eedeac495271d0f.factory.bridge.near": {
    symbol: "DAI",
    decimals: 18,
  },
};

function dayToEpoch(days) {
  const now = Date.now();
  const xDay = Number(days) * 24 * 60 * 60 * 1000;
  const nextDay = now + xDay;
  const epochSeconds = Math.floor(nextDay * 1000000);

  return epochSeconds.toString();
}

const kycMinAmount = 150;
const matchToken = (token) => tokenMap[token].symbol;
const convertAmount = (amount, token) =>
  amount / Math.pow(10, tokenMap[token].decimals);
const amountToReadable = (amount) =>
  amount
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const isDisabled =
  convertAmount(props.amount, props.token) > kycMinAmount ||
  props.bountyClaimed ||
  !context.accountId
    ? " disabled"
    : "";

State.init({
  message: "",
  deadline: 1,
});

const onChangeMessage = (message) => {
  State.update({
    message,
  });
};

const onChangeDeadline = (deadline) => {
  State.update({
    deadline,
  });
};

const handleClick = () => {
  Near.call([
    {
      contractName: props.contract,
      methodName: "bounty_claim",
      args: {
        id: props.bountyId,
        deadline: dayToEpoch(state.deadline),
        description: state.message,
      },
      gas: 300000000000000,
      deposit: 1000000000000000000000000,
    },
  ]);
};

return (
  <div css="min-width: 300px; max-width: 400px;">
    <div class="card">
      <div class="card-body">
        <span class="fw-bold">{matchToken(props.token)} </span>
        <span class="fw-bold fs-2">
          ${amountToReadable(convertAmount(props.amount, props.token))}
        </span>
        <h6 class="card-title">{props.bountyTitle}</h6>
        <p class="card-text"></p>
        {convertAmount(props.amount, props.token) > kycMinAmount &&
        !props.bountyCompleted ? (
          <div>
            <span class="badge text-bg-dark p-2">
              <span class="fs-5">KYC requied</span>
            </span>{" "}
            <hr />
            <div class="blockquote-footer figcaption">
              KYC is required for bounties over $400, please head to
              <a href="https://heroes.build" target="_blank">
                https://heroes.build/
              </a>{" "}
              to pass KYC before claiming this bounty
            </div>
          </div>
        ) : (
          ""
        )}
        {!props.bountyCompleted ? (
          <>
            {!isDisabled ? (
              <>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="message">
                    -
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => onChangeMessage(e.target.value)}
                    placeholder="Enter short message"
                    aria-label="message"
                    aria-describedby="message"
                  />
                </div>
                <select
                  class="form-select mb-2"
                  aria-label="Default select example"
                  onChange={(e) => onChangeDeadline(e.target.value)}
                >
                  <option value="1" selected>
                    Will complete in{" "}
                  </option>
                  <option value="1">1 Day</option>
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                  <option value="7">7 Days</option>
                </select>
              </>
            ) : (
              ""
            )}

            <a
              class={"btn bg-warning float-end " + isDisabled}
              onClick={handleClick}
            >
              Claim
            </a>
            <p class="font-monospace small align-text-top">
              Bounty ID: {props.bountyId}
            </p>
          </>
        ) : (
          <>
            <span class="badge text-bg-success p-2">
              <span class="fs-5">Completed</span>
            </span>{" "}
            <hr />
            <div class="blockquote-footer figcaption">
              Bounty completed and can't be claimed any more, check details on
              <a
                href={"https://heroes.build/bounties/" + props.bountyId}
                target="_blank"
              >
                https://heroes.build/bounties/{props.bountyId}
              </a>{" "}
            </div>
          </>
        )}
      </div>
      {!context.accountId && !props.bountyCompleted ? (
        <div class="m-2">
          <p class="blockquote-footer text-end">
            Sign-in NEAR wallet to be able to interact
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  </div>
);
