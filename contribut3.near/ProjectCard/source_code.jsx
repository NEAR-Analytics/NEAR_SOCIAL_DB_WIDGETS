const ownerId = "contribut3.near";
const projectId = props.projectId;

State.init({
  project: null,
  projectIsFetched: false,
});

if (!state.projectIsFetched) {
  Near.asyncView(ownerId, "get_project", { account_id: projectId }, "final", false).then((project) => State.update({ project, projectIsFetched: true }));
}

return <Widget src={`${ownerId}/widget/Card`} props={{ header: "", body: "", footer: "" }} />
