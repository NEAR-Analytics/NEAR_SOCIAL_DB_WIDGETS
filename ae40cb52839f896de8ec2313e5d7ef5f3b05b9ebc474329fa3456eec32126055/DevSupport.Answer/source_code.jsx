const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);

const answer = JSON.parse(
  Social.get(`${accountId}/question/answer`, blockHeight) ?? "null"
);

return (
  <>
    <div className="border m-3 p-3">
      <b>@{accountId}</b>

      {answer.text}
    </div>
  </>
);
