let accountId = context.accountId;

if (!accountId) {
  return "Please login to use Proof of Height";
}

const follows = Social.get(`${accountId}/graph/follow/**`);

console.log("this account follows", follows);

const followers = follows
  ? Object.keys(follows).map((f) => {
      console.log("a follower", f);
      return {
        accountId: f,
      };
    })
  : [];

return (
  <div>
    <div className="card p-3">
      <h5 className="mb-3">Your Followers&apos; Heights</h5>

      {followers.length === 0 && <p>You don&apos;t have any followers yet.</p>}

      <div className="d-flex flex-column" style={{ gap: "1rem" }}>
        {followers.map((follower) => {
          return (
            <div className="border-top pt-3">
              <Widget
                src="lewidenmann.near/widget/UserHeightDisplay"
                props={{
                  accountId: follower.accountId,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
