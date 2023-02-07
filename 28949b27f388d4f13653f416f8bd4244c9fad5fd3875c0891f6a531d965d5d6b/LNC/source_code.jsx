let accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const linktree = socialGetr(`${accountId}/profile/linktree`);
const accountText = accountId.replace(".", "-");

if (linktree === null) {
  return "Loading";
}

initState({ profile: { linktree: linktree || {} } });

return (
  <div className="container row">
    <div>
      <Widget
        src="mob.near/widget/Profile"
        props={{ accountId, profile: state.profile }}
      />
    </div>
    <div>
      Proof of (L)Earn:
      <div className="input-group">
        <span className="input-group-text">
          https://learnnear.club/members/{accountId.replace(".", "-")}
        </span>
      </div>
    </div>

    <div className="mt-2">
      <CommitButton data={state}>Save</CommitButton>
    </div>
  </div>
);
