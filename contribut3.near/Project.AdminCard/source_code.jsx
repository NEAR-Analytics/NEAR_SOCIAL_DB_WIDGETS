const ownerId = "contribut3.near";
const accountId = props.accountId;

State.init({
  project: null,
  projectIsFetched: false,
  founders: null,
  foundersIsFetched: false,
  requests: null,
  requestsIsFetched: false,
  profile: null,
  profileIsFetched: false,
});

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: accountId },
    "final",
    false
  ).then((project) => State.update({ project, projectIsFetched: true }));
}

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
    { keys: [`${accountId}/profile/*`] },
    "final",
    false
  ).then((data) =>
    State.update({
      profile: data[accountId].profile,
      profileIsFetched: true,
    })
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em 1.5em;
  gap: 1em;
  border-bottom: 1px solid #EAECF0;
  width: 100%;
`;

const Name = styled.div`
  width: 35%;
`;

const Other = styled.div`
  text-align: center;
  width: 13%;
`;

return (
  <Container>
    <Name>
      <Widget
        src={`${ownerId}/widget/Project.Icon`}
        props={{ accountId: props.accountId, size: "4em" }}
      />
      <Widget
        src={`${ownerId}/widget/NameAndAccount`}
        props={{ accountId: props.accountId, name: state.profile.name, nameSize: "1.125em" }}
      />
    </Name>
    <Other></Other>
    <Other></Other>
    <Other></Other>
    <Other></Other>
    <Other></Other>
    <Other></Other>
  </Container>
);
