const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "anchor-dao.sputnik-dao.near";

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading...";
}

return (
  <>
    <div className="m-2">
      <div className="tab-content">
        <h3>Community</h3>
        {accountId && (
          <div className="mt-3 mb-5">
            <Widget
              src="nycdao.near/widget/nyc.subscribe"
              props={{ accountId, daoId }}
            />
          </div>
        )}
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
