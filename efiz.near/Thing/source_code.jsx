const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/thing/main`, blockHeight) ?? "null");

return (
  <div className="border rounded-4 p-3 pb-1">{JSON.stringify(content)}</div>
);
