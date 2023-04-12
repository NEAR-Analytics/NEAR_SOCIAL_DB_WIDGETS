const ownerId = "contribut3.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;

  img {
    vertical-align: top;
  }
`;

const Name = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: .95em;
  line-height: 1em;
  color: #101828;
`;

const AccountId = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: .75em;
  line-height: 1em;
  color: #7e868c;
`;

const createProjectLine = (accountId) => {
  const name = Social.get(`${accountId}/profile/name`);
  console.log("called");

  return (
    <Container>
      <Widget
        src={`${ownerId}/widget/Project.Icon`}
        props={{ accountId, size: "1em" }}
      />
      <Name>{name}</Name>
      <AccountId>@{accountId}</AccountId>
    </Container>
  );
};

State.init({
  requestId: [],
  message: "",
  projectId: [],
  projects: [],
  projectsIsFetched: false,
  requests: [],
  requestsIsFetched: false,
});

if (!state.projectsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_admin_projects",
    { account_id: context.accountId },
    "final",
    false,
  ).then((projects) => {
    State.update({
      projects: projects.map((accountId) => ({
        text: <Widget
          src={`${ownerId}/widget/Project.Line`}
          props={{ accountId, size: "1em" }}
        />,
        // text: createProjectLine(accountId),
        text: accountId,
        value: accountId,
      })),
      projectsIsFetched: true
    });
  });
  return <>Loading...</>;
}

// if (!state.requestsIsFetched) {
//   Near.asyncView(
//     ownerId,
//     "get_admin_requests",
//     { account_id: context.accountId },
//     "final",
//     false,
//   ).then((requests) => State.update({ requests, requestsIsFetched: true }));
//   return <>Loading...</>;
// }

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
`;

return (
  <Form>
    <Widget
      src={`${ownerId}/widget/Inputs.Select`}
      props={{
        label: "Request as *",
        options: state.projects,
        value: state.projectId,
        onChange: (projectId) => {
          State.update({ projectId });
          Near.asyncView(
            ownerId,
            "get_project_requests",
            { account_id: projectId.value },
            "final",
            false,
          ).then((requests) => State.update({
            requests: requests.map(([accountId, cid]) => ({
              name: <Widget src={`${ownerId}/widget/Request.Line`} props={{ accountId, cid, size: "1em" }} />,
              value: cid,
            })),
            requestsIsFetched: true
          }));
        },
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Select`}
      props={{
        label: "Contribution to *",
        options: state.requests,
        value: state.requestId,
        onChange: (requestId) => State.update({ requestId }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.TextArea`}
      props={{
        label: "Message",
        placeholder: "Describe the contribution you would like to request",
        value: state.message,
        onChange: (message) => State.update({ message }),
      }}
    />
  </Form>
);
