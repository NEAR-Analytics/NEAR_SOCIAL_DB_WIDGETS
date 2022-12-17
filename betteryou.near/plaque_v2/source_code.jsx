// - 'isowner' (true if observer is the owner of the challenge)
let isOwner = props.isOwner ?? true;
const challengeState = props.challengeState;

let daysLeft = challengeState["days_left"];
let daysTotal = challengeState["total_days"];
let livesTotal = challengeState["total_lives"];
let livesLeft = challengeState["lives_left"];
let dayStatus = challengeState["day_status"] || [];

let challengeStatus = "inprogress";
if (daysLeft == 0) {
  challengeStatus = "success";
} else if (livesLeft == 0) {
  challengeStatus = "failed";
}

let reward = challengeState["funding"]["initial_stake"] || 0;
let backers = 0;

if (challengeState["funding"]["backers"]) {
  let array = challengeState["funding"]["backers"];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    reward += element["value"];
    backers += 1;
  }
}

let reward_str = Number(reward / 1_000_000_000_000_000_000_000_000).toFixed(1);

const challengeSummary = {
  fontSize: "24px",
  fontFamily: "Roboto",
};

const mainBox = {
  width: "628px",
  borderRadius: "10px",
  backgroundColor: "#F6F6F6",
  padding: "20px",
  fontFamily: "Inter",
  fontSize: "14px",
};

const challengeBox = {
  paddingTop: "20px",
  paddingBottom: "20px",
  paddingLeft: "10px",
  paddingRight: "10px",
};

const challengeBoxTitle = {
  fontSize: "16px",
  color: "#000000",
  fontFamily: "Inter",
  fontWeight: "400",
  lineHeight: "19px",
};

const challengeBoxContents = {
  borderRadius: "5px",
  backgroundColor: "white",
  padding: "15px",
  textAlign: "center",
  marginTop: "20px",
  marginBottom: "20px",
  color: "#68717A",
};

const failedChallengeBoxContents = {
  borderRadius: "5px",
  backgroundColor: "#ffcccb",
  padding: "15px",
  textAlign: "center",
  marginTop: "20px",
  marginBottom: "20px",
  color: "#68717A",
};

const successChallengeBoxContents = {
  borderRadius: "5px",
  backgroundColor: "#90ee90",
  padding: "15px",
  textAlign: "center",
  marginTop: "20px",
  marginBottom: "20px",
  color: "#68717A",
};

const dot = {
  height: "20px",
  width: "20px",
  borderRadius: "50%",
  display: "inline-block",
};

const greenDot = {
  height: "20px",
  width: "20px",
  borderRadius: "50%",
  display: "inline-block",
  backgroundColor: "green",
};

const redDot = {
  height: "20px",
  width: "20px",
  borderRadius: "50%",
  display: "inline-block",
  backgroundColor: "red",
};

const greyDot = {
  height: "20px",
  width: "20px",
  borderRadius: "50%",
  display: "inline-block",
  backgroundColor: "grey",
};

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

const nearAmount = {
  fontSize: "16px",
  fontWeight: "900",
  color: "black",
};
const remainingBlock = {
  margin: "20px",
  backgroundColor: "#f4feff",
  borderRadius: "6px",
  color: "#68717a",
};

const dotHolder = {
  display: "inline-block",
};

// a == -1 (failed)
// a == 0 (unknown)
// a == 1 (success)
const renderDot = (day, a) => {
  let dotStyle = "";
  if (a == -1) {
    dotStyle = redDot;
  } else if (a == 0) {
    dotStyle = greyDot;
  } else {
    dotStyle = greenDot;
  }

  return (
    <div style={dotHolder}>
      <span style={dotStyle}></span>
      <br />
      {day}
    </div>
  );
};

const renderDots = (totalDays, daysLeft, dayStatus) => {
  let results = [];
  for (let day = 0; day < totalDays; day++) {
    if (dayStatus.length > day && dayStatus[day] == false) {
      results.push(renderDot(day + 1, -1));
    } else {
      if (day < totalDays - daysLeft) {
        results.push(renderDot(day + 1, 1));
      } else {
        results.push(renderDot(day + 1, 0));
      }
    }
  }
  return results;
};

const topBox = "";

if (challengeStatus == "inprogress") {
  topBox = (
    <div style={challengeBox}>
      <div style={challengeBoxTitle}>Summary</div>
      <div style={challengeBoxContents}>{props.customBox}</div>
    </div>
  );
} else if (challengeStatus == "failed") {
  topBox = (
    <div style={challengeBox}>
      <div style={challengeBoxTitle}>Sorry</div>
      <div style={failedChallengeBoxContents}>{props.customBox}</div>
    </div>
  );
} else {
  topBox = (
    <div style={challengeBox}>
      <div style={challengeBoxTitle}>Congratulations</div>
      <div style={successChallengeBoxContents}>{props.customBox}</div>
    </div>
  );
}

let supportBox = "";

if (isOwner == false) {
  supportBox = (
    <div style={challengeBox}>
      <div style={challengeBoxTitle}>Support with NEAR</div>
      <div style={challengeBoxContents}>{props.supportBox}</div>
    </div>
  );
} else {
  supportBox = (
    <div style={challengeBox}>
      <div style={challengeBoxTitle}>Abandon challenge</div>
      <div style={challengeBoxContents}>{props.abandonButton}</div>
    </div>
  );
}

return (
  <div style={mainBox}>
    <div style={challengeSummary}>
      {" "}
      <img src={props.challengeLogo}></img> {props.challengeMotto}
    </div>

    {topBox}

    <div style={{ overflow: "hidden" }}>
      <div
        style={{ display: "inline-block", width: "30%", verticalAlign: "top" }}
      >
        <div style={challengeBox}>
          <div style={challengeBoxTitle}>Current Rewards</div>
          <div style={challengeBoxContents}>
            <span style={nearAmount}>{reward_str} NEAR</span> <br /> {backers}{" "}
            people
          </div>
        </div>
        {supportBox}
      </div>
      <div
        style={{ display: "inline-block", width: "60%", verticalAlign: "top" }}
      >
        <div style={challengeBox}>
          <div style={challengeBoxTitle}>Check-in progress</div>
          <div style={challengeBoxContents}>
            <div>{renderDots(daysTotal, daysLeft, dayStatus)}</div>
            <div style={remainingBlock}>
              <b>Remaining:</b> {daysLeft} days ({livesLeft} skip days
              available)
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style={{ display: "block" }}></div>
  </div>
);
