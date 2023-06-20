const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "liberty.sputnik-dao.near";

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading...";
}

return (
  <>
    <div className="m-2">
      <div className="tab-content">
        <h3>Community</h3>
        <div className="mt-3 mb-3">
          <Widget
            src="near/widget/DIG.Button"
            props={{
              href: "#/near/widget/ProfileEditor",
              label: "Edit Your Profile",
              variant: "outline-danger",
              size: "small",
            }}
          />
        </div>
        <div className="tab-pane fade in show active" role="tabpanel">
          <Widget
            src="mob.near/widget/FollowersList"
            props={{ accountId: daoId }}
          />
        </div>
      </div>
    </div>
  </>
);
