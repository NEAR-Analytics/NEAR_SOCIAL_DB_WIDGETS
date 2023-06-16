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
        <div className="mt-2 mb-3">
          <Widget
            src="nycdao.near/widget/nyc.subscribe"
            props={{ accountId, daoId }}
          />
        </div>
        <div className="tab-pane fade in show active" role="tabpanel">
          <Widget
            src="near/widget/FollowersList"
            props={{ accountId: daoId }}
          />
        </div>
      </div>
    </div>
  </>
);
