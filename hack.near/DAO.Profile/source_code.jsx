const accountId = props.accountId ?? "onboarddao.sputnik-dao.near";

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading...";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="mob.near/widget/ProfileLarge"
        props={{
          accountId,
          profile,
          link: true,
          showEditButton: !props.profile,
        }}
      />

      <div className="mt-3">
        <Widget
          src="hack.near/widget/DAO.Tabs"
          props={{ accountId, profile }}
        />
      </div>
    </div>
  </div>
);
