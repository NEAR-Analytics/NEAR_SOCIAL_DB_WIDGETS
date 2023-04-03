const ownerId = "contribut3.near";
const projectId = props.projectId;

State.init({
  founders: null,
  foundersIsFetched: false,
});

if (!state.foundersIsFetched) {
  Near.asyncView(
    ownerId,
    "get_founders", 
    { account_id: projectId },
    "final",
    false
  ).then((fo) => State.update({ project, projectIsFetched: true }));
}

return (
  <Widget
    src={`${ownerId}/widget/Card`}
    props={{ header: "", body: "", footer: "" }}
  />
);
