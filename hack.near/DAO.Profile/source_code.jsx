const daoId = props.daoId;

const onChangeContract = (daoId) => {
  State.update({
    daoId,
  });
};

if (!daoId) {
  return (
    <>
      <div className="mb-3">
        Account ID:
        <input
          type="text"
          placeholder="example.sputnik-dao.near"
          onChange={(e) => onChangeContract(e.target.value)}
        />
        <a className="btn btn-primary mt-3" onClick={onChangeContract}>
          View Profile
        </a>
      </div>
      <Widget src="hack.near/widget/Cyborgs" />
      <Widget src="hack.near/widget/CreateDAO" />
    </>
  );
}

const profile = props.profile ?? Social.getr(`${daoId}/profile`);

if (profile === null) {
  return "Loading...";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="hack.near/widget/DAO.ProfileLarge"
        props={{
          daoId,
          profile,
          link: true,
          showEditButton: !props.profile,
        }}
      />

      <div className="mt-3">
        <Widget src="hack.near/widget/DAO.Tabs" props={{ daoId, profile }} />
      </div>
    </div>
  </div>
);
