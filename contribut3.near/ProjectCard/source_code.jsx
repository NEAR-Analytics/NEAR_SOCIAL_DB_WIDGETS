const ownerId = "contribut3.near";
const projectId = props.projectId;

State.init({
  founders: null,
  foundersIsFetched: false,
  requests: null,
  requestsIsFetched: false,
});

if (!state.foundersIsFetched) {
  Near.asyncView(
    ownerId,
    "get_founders",
    { account_id: projectId },
    "final",
    false
  ).then((founders) => State.update({ founders, foundersIsFetched: true }));
}

if (!state.requestsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project_requests",
    { account_id: projectId },
    "final",
    false
  ).then((requests) => State.update({ requests, requestsIsFetched: true }));
}

const body = <>
  <Widget src={`${ownerId}/widget/ProfileLine`} props={{

    accountId,
    isEntity,
    imageSize: "3em",
    update: props.update,
  }} />
</>;

return (
  <Widget
    src={`${ownerId}/widget/Card`}
    props={{ body: "", footer: "" }}
  />
);
