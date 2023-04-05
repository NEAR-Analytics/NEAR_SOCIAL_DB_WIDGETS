const ownerId = "contribut3.near";
const accountId = props.accountId;
const gas = "300000000000000";

const companySizeTiers = [
  [1, 9], // Micro-businesses
  [10, 49], // Small businesses
  [50, 249], // Medium-sized businesses
  [250, 999], // Large businesses
  [1000, Infinity], // Enterprise businesses
];

return (
  <>
    <Widget
      src={`${ownerId}/widget/Project.Details`}
      props={{
        onSave: (project) => {
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
