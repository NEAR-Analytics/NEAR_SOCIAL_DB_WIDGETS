const ownerId = "contribut3.near";

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
        text: <Widget src={`${ownerId}/widget/Project.Line`} props={{ accountId, size: "1em" }} />,
        // text: accountId,
        value: accountId,
      })), projectsIsFetched: true
    })
    console.log(state.projects)
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
