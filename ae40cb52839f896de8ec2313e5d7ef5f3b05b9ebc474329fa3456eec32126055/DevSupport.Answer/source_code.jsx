const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const admins = props.admins || [];
const adminContract = props.adminContract;

if (accountId === undefined || blockHeight === undefined) {
  return;
}

State.init({ showAnswer: false });

const answer = JSON.parse(
  Social.get(`${accountId}/question/answer`, blockHeight) ?? "null"
);

const is_useful = Near.view(adminContract, "is_useful", {
  id: { account_id: accountId, block_height: blockHeight },
});
const border = is_useful ? "border-success" : "border-black";

const item = {
  type: "social",
  path: `${accountId}/question/main`,
  blockHeight,
};

return (
  <>
    <div className={`border ${border} mt-3 p-3`}>
      <Widget
        src="mob.near/widget/Profile.ShortInlineBlock"
        props={{ accountId, tooltip: false }}
      />
      <hr />

      <div class="mt-3">
        <Widget
          src="mob.near/widget/MainPage.Post.Content"
          props={{ content: { text: answer.text } }}
        />
      </div>

      <Widget
        src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Answer.Button.Valid"
        props={{ accountId, blockHeight, admins, adminContract }}
      />

      <button
        class="btn btn-success"
        onClick={() => {
          State.update({ showAnswer: !state.showAnswer });
        }}
      >
        Answer
      </button>

      {state.showAnswer && (
        <Widget
          src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Answer.Edit"
          props={{
            notifyAccountId: accountId,
            item,
            onComment: () => State.update({ showReply: false }),
          }}
        />
      )}

      <hr />

      <Widget
        src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Answer.Feed"
        props={{ item, admins, adminContract, nested: true }}
      />
    </div>
  </>
);
