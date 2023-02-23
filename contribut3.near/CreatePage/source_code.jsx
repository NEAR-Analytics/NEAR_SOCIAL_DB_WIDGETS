const ownerId = "contribut3.near";

const availableContent = ["request", "project"];

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
  request: (
    <Widget
      src={`${ownerId}/widget/NeedForm`}
      props={{ search: state.search, update: props.update }}
    />
  ),
  project: (
    <Widget
      src={`${ownerId}/widget/EntityForm`}
      props={{ search: state.search, update: props.update }}
    />
  ),
}[state.content];
