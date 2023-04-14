const ownerId = "contribut3.near";
const accountId = props.accountId;
const gas = "300000000000000";

return (
  <>
    <Widget
      src={`${ownerId}/widget/Project.Details`}
      props={{
        onSave: (project) => {
          console.log({ project });
          State.update({ project: { ...state.project, ...project } });
          Near.call(
            ownerId,
            "edit_project",
            { account_id: accountId, project: { application: state.project } },
            gas,
            "0"
          );
        },
      }}
    />
    <Widget src={`${ownerId}/widget/Project.Achievements`} />
  </>
);
