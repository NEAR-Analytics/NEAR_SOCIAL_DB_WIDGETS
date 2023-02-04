const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const admins = props.admins;
const adminContract = props.adminContract;

const answer = JSON.parse(
  Social.get(`${accountId}/question/answer`, blockHeight) ?? "null"
);

const is_valid = Near.view(adminContract, "is_valid", {
  id: { account_id: accountId, block_height: blockHeight },
});
const border = is_valid ? "border-success" : "";

return (
  <>
    <div className={`border ${border} mt-3 p-3`}>
      <Widget
        src="mob.near/widget/Profile.ShortInlineBlock"
        props={{ accountId, tooltip: false }}
      />
      <hr />

      <div class="mt-3">{answer.text}</div>

      <Widget
        src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Answer.Button.Valid"
        props={{ accountId, blockHeight, admins, adminContract }}
      />
    </div>
  </>
);
