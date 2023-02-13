const challengeLogo =
  "https://user-images.githubusercontent.com/91919554/208149476-d77664d7-868d-4995-8bac-feeb026cd64e.png";

const plaqTemplateWidget = "betteryou.near/widget/plaque_v2";
const signupTemplateWidget = "betteryou.near/widget/language_signup";
const contractId = "language.betteryou.near";
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

function updateContractChallengeState() {
  contractChallengeState =
    props.debugChallengeState ??
    Near.view(contractId, "get_challenge", {
      account_id: accountId,
    });
}

function finish_challenge() {
  console.log("finish challenge");
  const result = Near.call(contractId, "finish", {});
  console.log("finish result", result);
}

function abandon_challenge() {
  console.log("abandon challenge");
  Near.call(contractId, "abandon_challenge", {});
}

// Conversion function from the contract state format to the widget state format.
function toWidgetChallengeState(contractChallengeState) {
  return contractChallengeState;
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
      to learn <b>{contractChallengeState.language}</b> for
      <b>{contractChallengeState.total_days} days </b>
      <br />
      <br />
      {getDayStatus()} <br />
      Do you want to support them?
    </div>
  );
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

function getDayStatus() {
  if (
    contractChallengeState.days_left == 0 ||
    contractChallengeState.lives_left == 0
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

  let pointsRequired =
    contractChallengeState.quota_per_day -
    contractChallengeState.current_daily_xp;
  if (pointsRequired < 0) {
    return (
      <div>Enough XP points today ({-pointsRequired} over the quota) </div>
    );
  } else {
    return (
      <div>
        <b>{pointsRequired} points still needed today </b>(this value is
        refreshed every hour)
      </div>
    );
  }
}

function getAbandonButton() {
  return <button onClick={abandon_challenge}> Abandon challenge </button>;
}

function getOwnerCustomBox() {
  return (
    <div>
      <h1 style={{ color: "black" }}> Learn a language! </h1>
      <b>You</b> are participating in this challenge. You have committed to
      learn <b>{contractChallengeState.language}</b> for
      <b>{contractChallengeState.total_days} days </b>
      <br />
      <br />
      {getDayStatus()} <br />
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

updateContractChallengeState();

if (!contractChallengeState) {
  return getNoChallenge();
}

console.log("challenge state ", contractChallengeState);
const widgetChallengeState = toWidgetChallengeState(contractChallengeState);

const challengeMotto = "Learn a language";

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
