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

const contractId = "wakeup.betteryou.near";
const accountId = context.accountId;

if (!accountId) {
  return "Please log in to view your own challenge or specify account id to view in props.";
}

const challenge_state = Near.view(contractId, "get_challenge", {
  account_id: accountId,
});

if (challenge_state) {
  return "Challenge in progress please go to the main challenge page.";
}

// TODO if challenge in progress redirect to the main challenge page

// I can't properly handle inputs so here we go, global variables.
// Make sure the defaults here are the same as in the html. Sorry.
let daysInputValue = 30;
let livesInputValue = 4;
let depositInputValue = 0.0;
let wakeUpTimeInputValue = "06:00";

const test_challenge_lives = 3;
const test_challenge_days = 5;
const test_challenge_first_day_delay = 10;
const test_challenge_timeout = 30;
const test_challenge_deposit = 0.1;
const test_challenge_day_length = 60;

function ms2s(ms) {
  return Math.floor(ms / 1000);
}

function getTomorrowDate() {
  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  return tomorrow;
}

function getTomorrowAtTimeTimestamp(time) {
  console.log("tim e", time);
  const tomorrow = getTomorrowDate();
  // the format of the time is dependent on locale so use the Date.parse method to hopefully deal with it
  // construct a string for the date tomorrow at the specified time
  // the month is indexed from 0 so add 1
  // god forgive me please
  const year = tomorrow.getFullYear();
  const month = tomorrow.getMonth() + 1;
  const day = tomorrow.getDate();
  const tomorrow_morning_string = `${year}-${month}-${day}T${time}`;
  console.log("tomorrow_morning_string", tomorrow_morning_string);
  return ms2s(Date.parse(tomorrow_morning_string));
}

function create_challenge() {
  const start_timestamp = getTomorrowAtTimeTimestamp(wakeUpTimeInputValue);
  console.log("start_timestamp", start_timestamp);
  const timeout = 1 * 60 * 60;

  Near.call(
    contractId,
    "create_challenge",
    {
      config: {
        days: parseInt(daysInputValue),
        lives: parseInt(livesInputValue),
        first_day: start_timestamp,
        timeout: timeout,
      },
    },
    None, // default gas
    parseFloat(depositInputValue) * Math.pow(10, 24) // yocto for the win
  );
}

function create_test_challenge() {
  console.log("create test challenge");

  Near.call(
    contractId,
    "create_challenge",
    {
      config: {
        days: test_challenge_days,
        lives: test_challenge_lives,
        first_day: ms2s(Date.now()) + test_challenge_first_day_delay,
        timeout: test_challenge_timeout,
        day_length: test_challenge_day_length,
      },
    },
    None, // default gas
    test_challenge_deposit * Math.pow(10, 24) // yocto for the win
  );
}

function on_change_wakeup(change) {
  wakeUpTimeInputValue = change.target.value;
  console.log("on_change_wakeup", wakeUpTimeInputValue);
}

function on_change_duration(change) {
  daysInputValue = parseInt(change.target.value);
  console.log("on_change_duration", daysInputValue);
}

function on_change_skip_days(change) {
  livesInputValue = parseInt(change.target.value) + 1;
  console.log("on_change_skip_days", livesInputValue);
}

function on_change_deposit(change) {
  depositInputValue = parseFloat(change.target.value);
  console.log("on_change_deposit", depositInputValue);
}

function getMaybeTestChallengeButton() {
  if (accountId == "betteryou.testnet") {
    return (
      <div>
        Create a test challenge. It will begin in{" "}
        {test_challenge_first_day_delay}
        seconds, you will have {test_challenge_lives} lives, it will last{" "}
        {test_challenge_days} days but each day will last only{" "}
        {test_challenge_day_length} seconds. The deposit will be{" "}
        {test_challenge_deposit}N. Refresh this page often ;).
        <br /> <br />
        <button style={commitButton} onClick={create_test_challenge}>
          TEST CHALLENGE
        </button>
      </div>
    );
  } else {
    return <div />;
  }
}

return (
  <div style={signUp}>
    <div style={challengeTitle}>Wake up earlier</div>
    <div style={challengeSubTitle}>
      Commit to waking up every day at given time frame
    </div>
    <div style={howItWorks}>
      <span>How it works:</span>
      Once you commit to the challenge, you need to check in every morning on
      your active challenges page. Get your money back if you succeed!
    </div>
    <div style={inputBox}>
      <span style={inputBoxTitle}>Wake up period</span>
      <select
        style={inputBoxSelect}
        name="wakeupTime"
        id="wakeupTime"
        onChange={on_change_wakeup}
      >
        <option value="05:00">5:00AM - 6:00AM</option>
        <option value="06:00" selected>
          6:00AM - 7:00AM
        </option>
        <option value="07:00">7:00AM - 8:00AM</option>
      </select>
    </div>
    <div style={inputBox}>
      <span style={inputBoxTitle}>Duration</span>
      <select
        style={inputBoxSelect}
        name="duration"
        id="duration"
        onChange={on_change_duration}
      >
        <option value="10">10 days</option>
        <option value="20">20 days</option>
        <option value="30" selected>
          30 days
        </option>
      </select>
    </div>
    <div style={inputBox}>
      <span style={inputBoxTitle}>Permitted Skip Days</span>
      <select
        style={inputBoxSelect}
        name="skipDays"
        id="skipDays"
        onChange={on_change_skip_days}
      >
        <option value="0">0 days - hardcore option</option>
        <option value="3" selected>
          3 days
        </option>
        <option value="6">6 days</option>
      </select>
    </div>
    <div style={inputBox}>
      <span style={inputBoxTitle}>NEAR to stake</span>
      <input style={inputBoxInput} onChange={on_change_deposit} />
    </div>
    <button style={commitButton} onClick={create_challenge}>
      COMMIT TO CHALLENGE
    </button>
    <br /> <br />
    {getMaybeTestChallengeButton()}
  </div>
);
