const ownerId = "contribut3.near";
const canEdit = props.isAdmin ?? false;
const accountId = props.accountId;

State.init({
  project: null,
  projectIsFetched: false,
});

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: accountId },
    "final",
    false
  ).then((project) => State.update({ project, projectIsFetched: true }));
  return <>Loading...</>;
}

const onSave = (project) => {
  Near.call(
    ownerId,
    "edit_project",
    {
      account_id: accountId,
      project: {
        ...state.project,
        ...project,
        application: {
          ...state.project.application,
          ...project.application,
          graduation: {
            ...state.project.application.graduation,
            ...project.application.graduation,
          },
          private: {
            ...state.project.application.private,
            ...project.application.private,
            graduation: {
              ...state.project.application.private.graduation,
              ...project.application.private.graduation,
            }
          },
        },
      },
    }
  )
}

return (
  <>
    <Widget
      src={`${ownerId}/widget/Inputs.File`}
      props={{
        label: "Pitch deck",
        id: "pitch-deck",
        fileAccept: [".pdf"],
        value: "",
        onSave: (pitch_deck) => onSave({ application: { graduation: { pitch_deck } } }),
        canEdit,
      }}
    />
  </>
);
