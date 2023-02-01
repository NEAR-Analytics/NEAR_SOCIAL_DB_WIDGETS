const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);

const answer = JSON.parse(
  Social.get(`${accountId}/question/answer`, blockHeight) ?? "null"
);

return `${accountId}, ${blockHeight}`;
