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
  request: (
    <Widget
      src={`${ownerId}/widget/NeedForm`}
      props={{ search: state.search, update: props.update }}
    />
  ),
}[state.content];
