///
/// CSS
///

const signUp = {
  fontFamily: "Inter",
  background: "#F7F7F7",
  // width: "800px",
  borderRadius: "10px",
  textAlign: "center",
  padding: "20px",
  alignItems: "center",
};

const challengeTitle = {
  padding: "20px",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "44px",
  lineHeight: "32px",
};

const challengeSubTitle = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "20px",
  lineHeight: "130%",
};

const howItWorks = {
  width: "50%",
  marginLeft: "25%",
  marginTop: "30px",
  background: "#F4FEFF",
  borderRadius: "6px",
  fontFamily: "Roboto",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "130%",
  color: "#49454F",
  paddingLeft: "18px",
  paddingRight: "18px",
  paddingTop: "5px",
  paddingBottom: "5px",
};

const howItWorksSpan = {
  fontFamily: "Inter",
  fontWeight: "700",
};

const inputBox = {
  padding: "10px",
  border: "1px solid black",
  width: "30%",
  marginLeft: "35%",
  borderRadius: "10px",
  marginTop: "10px",
  marginBottom: "10px",
};

const inputBoxInput = {
  width: "80%",
  height: "30px",
  marginLeft: "10%",
};

const inputBoxSelect = {
  width: "80%",
  height: "30px",
};

const inputBoxTitle = {
  display: "block",
  paddingBottom: "5px",
  fontSize: "12px",
  textAlign: "left",
  paddingLeft: "10%",
};

const commitButton = {
  backgroundColor: "#2D949A",
  color: "white",
  borderRadius: "100px",
  border: "0px",
  paddingLeft: "24px",
  paddingRight: "24px",
  paddingTop: "10px",
  paddingBottom: "10px",
};

///
/// JS
///

const contractId = "language.betteryou.near";
const accountId = context.accountId;

if (!accountId) {
  return "Please log in to view your own challenge or specify account id to view in props.";
}

const challenge_state = Near.view(contractId, "get_challenge", {
  account_id: accountId,
});

console.log("challenge state", challenge_state);

if (challenge_state) {
  return "Challenge in progress please go to the main challenge page.";
}

// I can't properly handle inputs so here we go, global variables.
// Make sure the defaults here are the same as in the html. Sorry.
let languageInputValue = "French";
let usernameInputValue = "";
let quotaPerDayInputValue = 5;
let totalDaysInputValue = 30;
let totalLivesInputValue = 4; // TODO are lives = skips + 1 ?
let depositInputValue = 0.0;

function create_challenge() {
  Near.call(
    contractId,
    "create_challenge",
    {
      language: languageInputValue,
      duolingo_username: usernameInputValue,
      quota_per_day: quotaPerDayInputValue,
      total_days: totalDaysInputValue,
      total_lives: totalLivesInputValue,
    },
    None, // default gas
    parseFloat(depositInputValue) * Math.pow(10, 24) // yocto for the win
  );
}

function onChangeLanguage(change) {
  languageInputValue = change.target.value;
  console.log(languageInputValue);
}

function onChangeUsername(change) {
  usernameInputValue = change.target.value;
  console.log(usernameInputValue);
}

function onChangeQuotaPerDay(change) {
  quotaPerDayInputValue = change.target.value;
  console.log(quotaPerDayInputValue);
}

function onChangeTotalDays(change) {
  totalDaysInputValue = change.target.value;
  console.log(totalDaysInputValue);
}

function onChangeTotalLives(change) {
  totalLivesInputValue = change.target.value;
  console.log(totalLivesInputValue);
}

function onChangeDeposit(change) {
  depositInputValue = parseFloat(change.target.value);
  console.log("on_change_deposit", depositInputValue);
}

return (
  <div style={signUp}>
    <div style={challengeTitle}>Learn a new language</div>
    <div style={challengeSubTitle}>
      Commit to learning your selected language on Duolingo every day.
    </div>
    <div style={howItWorks}>
      <span>How it works:</span>
      Once you commit to the challenge, you need to gain Duolingo experience in
      your selected language every day. Get your money back if you succeed!
    </div>
    <div style={inputBox}>
      <span style={inputBoxTitle}>Duration</span>
      <select style={inputBoxSelect} onChange={onChangeTotalDays}>
        <option value="10">10 days</option>
        <option value="20">20 days</option>
        <option value="30" selected>
          30 days
        </option>
      </select>
    </div>
    <div style={inputBox}>
      <span style={inputBoxTitle}>Permitted Skip Days</span>
      <select style={inputBoxSelect} onChange={onChangeTotalLives}>
        <option value="0">0 days - hardcore option</option>
        <option value="3" selected>
          3 days
        </option>
        <option value="6">6 days</option>
      </select>
    </div>
    <div style={inputBox}>
      <span style={inputBoxTitle}>Duolingo username</span>
      <input style={inputBoxInput} onChange={onChangeUsername} />
    </div>
    <div style={inputBox}>
      <span style={inputBoxTitle}>Language</span>
      <select style={inputBoxSelect} onChange={onChangeLanguage}>
        <option value="French" selected>
          French
        </option>
        <option value="German">German</option>
        <option value="English">English</option>
        <option value="Polish">Polish</option>
        <option value="Italian">Italian</option>
      </select>
    </div>
    <div style={inputBox}>
      <span style={inputBoxTitle}>Daily Duolingo Quota</span>
      <select style={inputBoxSelect} onChange={onChangeQuotaPerDay}>
        <option value="5" selected>
          5
        </option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
    <div style={inputBox}>
      <span style={inputBoxTitle}>NEAR to stake</span>
      <input style={inputBoxInput} onChange={onChangeDeposit} />
    </div>
    <button style={commitButton} onClick={create_challenge}>
      COMMIT TO CHALLENGE
    </button>
    <br /> <br />
  </div>
);
