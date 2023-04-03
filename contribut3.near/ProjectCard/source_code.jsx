const ownerId = "contribut3.near";
const accountId = props.accountId;

State.init({
  founders: null,
  foundersIsFetched: false,
  requests: null,
  requestsIsFetched: false,
  description: null,
  descriptionIsFetched: false,
});

if (!state.foundersIsFetched) {
  Near.asyncView(
    ownerId,
    "get_founders",
    { account_id: accountId },
    "final",
    false
  ).then((founders) => State.update({ founders, foundersIsFetched: true }));
}

if (!state.requestsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project_requests",
    { account_id: accountId },
    "final",
    false
  ).then((requests) => State.update({ requests, requestsIsFetched: true }));
}

if (!state.descriptionIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/description`] },
    "final",
    false
  ).then((description) =>
    State.update({ description, descriptionIsFetched: true })
  );
}

const body = (
  <>
    <Widget
      src={`${ownerId}/widget/ProfileLine`}
      props={{
        accountId,
        isEntity: true,
        imageSize: "3em",
        update: props.update,
      }}
    />
    <Widget
      src={`${ownerId}/widget/DescriptionArea`}
      props={{ description: state.description }}
    />
  </>
);

return <Widget src={`${ownerId}/widget/Card`} props={{ body, footer: "" }} />;
