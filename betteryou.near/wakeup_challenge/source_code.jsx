const challengeLogo =
  "https://user-images.githubusercontent.com/91919554/208149479-340325cd-5151-4594-b7d6-ad91abe9d1ec.png";

const plaqTemplateWidget = "betteryou.near/widget/plaque_v2";
const signupTemplateWidget = "betteryou.near/widget/wakeup_signup";
const contractId = "wakeup.betteryou.near";
const accountId = props.accountId ?? context.accountId;

let contractChallengeState = None;

if (!accountId) {
  return "Please log in to view your own challenge or specify account id to view in props.";
}

const activeButton = {
  backgroundColor: "#2D949A",
  color: "white",
  borderRadius: "100px",
  border: "0px",
  paddingLeft: "24px",
  paddingRight: "24px",
  paddingTop: "10px",
  paddingBottom: "10px",
  marginTop: "10px",
};

const inactiveButton = {
  backgroundColor: "#a0a5ab",
  color: "white",
  borderRadius: "100px",
  border: "0px",
  paddingLeft: "24px",
  paddingRight: "24px",
  paddingTop: "10px",
  paddingBottom: "10px",
  marginTop: "10px",
};

function isOwnerLoggedIn() {
  return accountId == context.accountId;
}

function ms2s(ms) {
  return Math.floor(ms / 1000);
}

function updateContractChallengeState() {
  contractChallengeState =
    props.debugChallengeState ??
    Near.view(contractId, "get_challenge", {
      account_id: accountId,
    });
}

// Update challenge should be called when user wants to register a wakeup.
function updateChallenge() {
  console.log("update challenge");
  const result = Near.call(contractId, "update_challenge", {});
  console.log("update challenge result", result);
  updateContractChallengeState();
  // TOOD reload the page ideally or the info
}

function finish_challenge() {
  console.log("finish challenge");
  const result = Near.call(contractId, "finish_challenge", {});
  console.log("finish result", result);
}

function abandon_challenge() {
  console.log("abandon challenge");
  Near.call(contractId, "abandon_challenge", {});
}

// Conversion function from the contract state format to the widget state format.
function toWidgetChallengeState(contractChallengeState) {
  let result = {};
  result.total_days = contractChallengeState.config.days;
  result.total_lives = contractChallengeState.config.lives;

  result.days_left = result.total_days - contractChallengeState.days_passed;
  result.lives_left = result.total_lives - contractChallengeState.lives_used;

  result.funding = contractChallengeState.funding;
  result.day_status = contractChallengeState.day_status;

  return result;
}

function getPublicNoChallenge() {
  return "No challenge found.";
}

function getOwnerNoChallenge() {
  return <Widget src={signupTemplateWidget} />;
}

function getNoChallenge() {
  if (props.emptyIfNoChallenge) {
    return "";
  }

  if (isOwnerLoggedIn()) {
    return getOwnerNoChallenge();
  } else {
    return getPublicNoChallenge();
  }
}

function getPublicCustomBox() {
  return (
    <div>
      <b>{accountId}</b> is participating in this challenge. They have committed
      to wake up early for <b>{contractChallengeState.config.days} days</b>{" "}
      between <b> {getStartEndTimes()} </b>
      Do you want to support them?
    </div>
  );
}

function time_diff_to_string(time_diff) {
  const hours = Math.floor(time_diff / 60 / 60);
  const minutes = Math.floor((time_diff / 60) % 60);
  const seconds = Math.floor(time_diff % 60);
  return `${hours}h ${minutes}m ${seconds}s`;
}

function getWakeUpButton() {
  const config = contractChallengeState.config;
  const button_msg = "I'm awake!";
  const day_length = contractChallengeState.day_length ?? 24 * 60 * 60;
  const timeout = config.timeout;
  const start = config.first_day;

  const now = ms2s(Date.now());
  if (now < start) {
    const start_date = new Date(1000 * start);
    const start_string = start_date.toString();
    return <div> The challenge will begin on {start_string} </div>;
  }

  // Recalculate days passed in case the user missed out some days.
  const time_since_start = now - start;
  const days_passed = Math.floor(time_since_start / day_length);

  console.log(new Date(1000 * start).toString());

  // The challenge is over.
  // - the actual days_passed is larger than the total number of days - can't do equal because user needs to register wake up on the last day.
  // - the contract state days passed is equal to total number of days - we're finished and contract knows about it
  // - the user is out of lives
  if (
    config.days < days_passed ||
    config.days == contractChallengeState.days_passed ||
    config.lives <= contractChallengeState.lives_used
  ) {
    return (
      <div>
        <div>
          The challenge has now finished. Please press the finish button to wrap
          it up.
        </div>
        <br />
        <button style={activeButton} onClick={finish_challenge}>
          {" "}
          Finish{" "}
        </button>
      </div>
    );
  }

  // The user has already registered wake up today.
  if (days_passed < contractChallengeState.days_passed) {
    const time_left = start + (days_passed + 1) * day_length - now;
    return (
      <div>
        <div>
          Well done, you have registered your wake up today. Come back in{" "}
          {time_diff_to_string(time_left)}.
        </div>
        <br />
        <button
          disabled={true}
          style={inactiveButton}
          onClick={updateChallenge}
        >
          {button_msg}
        </button>
      </div>
    );
  }

  // We're counting time since the start time.
  const time_of_day = now - start - days_passed * day_length;
  if (time_of_day < timeout) {
    const time_left = timeout - time_of_day;
    return (
      <div>
        <div>
          You can register your wake up now. You have
          {time_diff_to_string(time_left)} to register the wakeup today.
        </div>{" "}
        <br />
        <button style={activeButton} onClick={updateChallenge}>
          {" "}
          {button_msg}{" "}
        </button>
      </div>
    );
  } else {
    const time_left = start + (days_passed + 1) * day_length - now;
    return (
      <div>
        <div>
          It's too late to register the wake up today. Come back in
          {time_diff_to_string(time_left)}.
        </div>
        <br />
        <button
          disabled={true}
          style={inactiveButton}
          onClick={updateChallenge}
        >
          {button_msg}
        </button>
      </div>
    );
  }
}

function getAbandonButton() {
  return <button onClick={abandon_challenge}> Abandon challenge </button>;
}

function getStartEndTimes() {
  let d = new Date(contractChallengeState.config.first_day * 1000);
  let startTime =
    d.getHours().toString() + ":" + d.getMinutes().toString().padStart(2, "0");

  let d1 = new Date(
    (contractChallengeState.config.first_day +
      contractChallengeState.config.timeout) *
      1000
  );
  let endTime =
    d1.getHours().toString() +
    ":" +
    d1.getMinutes().toString().padStart(2, "0");
  return (
    <span>
      {startTime} - {endTime}
    </span>
  );
}

function getOwnerCustomBox() {
  return (
    <div>
      <h1 style={{ color: "black" }}> Wake up challenge! </h1>
      <b>You</b> are participating in this challenge. You have committed to wake
      up early for <b>{contractChallengeState.config.days} days </b> between{" "}
      <b> {getStartEndTimes()}.</b> <br />
      <br />
      {getWakeUpButton()} <br />
    </div>
  );
}

function getCustomBox() {
  if (isOwnerLoggedIn()) {
    return getOwnerCustomBox();
  } else {
    return getPublicCustomBox();
  }
}

let supportValue = 1.0;

function on_change_support(change) {
  supportValue = parseFloat(change.target.value);
  console.log("on_change_support", supportValue);
}

function add_support() {
  Near.call(
    contractId,
    "add_prize",
    { account_id: accountId },
    None,
    parseFloat(supportValue) * Math.pow(10, 24)
  );
}

function getSupportBox() {
  return (
    <div>
      <input onChange={on_change_support}></input> NEAR
      <button style={activeButton} onClick={add_support}>
        Support
      </button>
    </div>
  );
}

updateContractChallengeState();

if (!contractChallengeState) {
  return getNoChallenge();
}

console.log("challenge state ", contractChallengeState);
const widgetChallengeState = toWidgetChallengeState(contractChallengeState);

const challengeMotto = "Wake up earlier";

return (
  <div>
    <Widget
      src={plaqTemplateWidget}
      props={{
        challengeState: widgetChallengeState,
        customBox: getCustomBox(),
        challengeLogo: challengeLogo,
        challengeMotto: challengeMotto,
        isOwner: isOwnerLoggedIn(),
        abandonButton: getAbandonButton(),
        supportBox: getSupportBox(),
      }}
    />
  </div>
);
