const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);

const answer = JSON.parse(
  Social.get(`${accountId}/question/answer`, blockHeight) ?? "null"
);

return (
  <>
    <div className="border p-3">{answer.text}</div>
    {JSON.stringify(props)}
  </>
);
