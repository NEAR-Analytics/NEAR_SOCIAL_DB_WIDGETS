const userChallengesWidget = "tryharder.near/widget/all_user_challenges";
const wakeupSignupWidget = "/#/tryharder.near/widget/wakeup_challenge";
const languageSignupWidget = "/#/tryharder.near/widget/language_challenge";
const friendsWidget = "/#/tryharder.near/widget/friendslist";

const header = {
  background: "#33333D",
  height: "263px",
  color: "white",
  fontFamily: "Inter",
  fontWeight: "400",
  fontSize: "58px",
  textAlign: "center",
  lineHeight: "70px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const paragraph = {
  marginLeft: "70px",
  marginRight: "40px",
  marginTop: "47px",
};

const paragraphTitle = {
  fontFamily: "Inter",
  fontWeight: "600",
  fontSize: "28px",
  lineHeight: "34px",
};

const paragraphContent = {
  marginTop: "26px",
  fontFamily: "Roboto",
  fontWeight: "400",
  fontSize: "20px",
  lineHeight: "130%",
  color: "#49454F",
};

const messageBoxes = {
  width: "1400px",
};

const messageBox = {
  display: "inline-block",
  height: "360px",
  width: "350px",
  background: "#F6F6F6",
  borderRadius: "10px",
  marginLeft: "17px",
  marginRight: "17px",
  padding: "35px",
  lineHeight: "32px",
  verticalAlign: "top",
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
  marginTop: "40px",
  marginLeft: "auto",
  marginRight: "auto",
  fontSize: "16px",
};

return (
  <div>
    <img src="https://user-images.githubusercontent.com/91919554/207791330-aa5bc143-b51d-49b0-a0be-eae26365f1f2.png" />

    <div class="header" style={header}>
      {" "}
      Ready to get rewarded for achieving your goals?
    </div>

    <div class="paragraph" style={paragraph}>
      <div style={paragraphTitle}>Achieve your goals</div>
      <div style={paragraphContent}>
        TryHarder helps you achieve your goals with support from your friends.
        You commit to a challenge and your friends will bet NEAR tokens on you.
        If you win, your friends will get a better version of you and reward you
        for it. If you lose, your friends will get a little richer and hold you
        accountable for your next challenge.
      </div>
    </div>
    <div class="paragraph" style={paragraph}>
      <div style={paragraphTitle}>How it works</div>
      <div style={paragraphContent}>
        <div style={messageBox}>
          01
          <br /> <br />
          <b>Commit to goals</b>
          <br />
          <br />
          Browse available challenges and pick the ones you want to commit to.
          Your friends can then bet NEAR tokens on you
        </div>
        <div style={messageBox}>
          02
          <br />
          <br />
          <b>Get going</b>
          <br />
          <br />
          Check in on a daily basis to track your progress and achieve your
          goal.
        </div>
        <div style={messageBox}>
          03
          <br />
          <br />
          <b>Win rewards</b>
          <br />
          <br />
          Claim your reward if you achieve your goals.
        </div>
      </div>
    </div>
    <div style={paragraph}>
      <div style={paragraphTitle}>Pick a challenge to commit to:</div>
      <div style={paragraphContent}>
        <div style={messageBox}>
          <b>Wake up earlier</b>
          <br />
          <br />
          Wake up every day at a given timeframe <br />
          <br />
          <a style={commitButton} href={wakeupSignupWidget}>
            START CHALLENGE
          </a>
        </div>
        <div style={messageBox}>
          <b>Learn a new language</b>
          <br />
          <br />
          Learn a language every day <br />
          <br />
          <a style={commitButton} href={languageSignupWidget}>
            START CHALLENGE
          </a>
        </div>
        <div style={messageBox}>
          <b>Support your friends</b>
          <br />
          <br />
          See what challenges your friends picked <br /> <br />
          <a style={commitButton} href={friendsWidget}>
            YOUR FRIENDS' CHALLENGES
          </a>
        </div>
      </div>
    </div>
    <div style={paragraph}>
      <div style={paragraphTitle}>
        Your current challenges:
        <a
          href={
            "/#/" + userChallengesWidget + "?accountId=" + context.accountId
          }
        >
          (link)
        </a>
      </div>
      <div style={paragraphContent}>
        <Widget src={userChallengesWidget}></Widget>
      </div>
    </div>
  </div>
);
