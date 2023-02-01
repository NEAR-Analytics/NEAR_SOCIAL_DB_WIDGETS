const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);

const answer = JSON.parse(
  Social.get(`${accountId}/question/answer`, blockHeight) ?? "null"
);

return (
  <>
    <div className="border m-3 p-3">
      <Widget
        src="mob.near/widget/Profile.ShortInlineBlock"
        props={{ accountId, tooltip: false }}
      />
      <hr />

      <div class="mt-3">{answer.text}</div>
    </div>
  </>
);
