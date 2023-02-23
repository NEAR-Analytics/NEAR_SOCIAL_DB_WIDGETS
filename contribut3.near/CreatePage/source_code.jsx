const ownerId = "contribut3.near";

const availableContent = ["request"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "request";
  }

  return content;
};

State.init({
  content: getContent(props.content),
  search: props.search ?? "",
});

return {
  proposals: (
    <Widget
      src={`${ownerId}/widget/ContributionRequestList`}
      props={{ search: state.search, update: props.update }}
    />
  ),
  invitations: (
    <Widget
      src={`${ownerId}/widget/InviteList`}
      props={{ search: state.search, update: props.update }}
    />
  ),
}[state.content];
