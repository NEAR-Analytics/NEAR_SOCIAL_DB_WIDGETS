const accountId = props.accountId ?? context.accountId;

const testnetWidgets = {
  languageChallenge: "tryharder.near/widget/language_challenge",
  wakeupChallenge: "tryharder.near/widget/wakeup_challenge",
};

let logo = (
  <img src="https://user-images.githubusercontent.com/91919554/207791330-aa5bc143-b51d-49b0-a0be-eae26365f1f2.png" />
);

if (props.hideLogo) {
  logo = "";
}

const widgets = testnetWidgets;
return (
  <div>
    {logo}
    <div>
      <div style={{ display: "inline-block" }}>
        <Widget
          src={widgets["wakeupChallenge"]}
          props={{ accountId, emptyIfNoChallenge: true }}
        />
      </div>
      <div style={{ display: "inline-block" }}>
        <Widget
          src={widgets["languageChallenge"]}
          props={{ accountId, emptyIfNoChallenge: true }}
        />
      </div>
    </div>
  </div>
);
