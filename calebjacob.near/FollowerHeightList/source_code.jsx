const followers = [
  {
    accountId: "calebjacob.near",
  },
  {
    accountId: "lewidenmann.near",
  },
  {
    accountId: "oztanmain.near",
  },
];

return (
  <div class="container">
    <div className="card p-3">
      <h5 className="mb-3">Your Followers&apos; Heights</h5>

      {followers.length === 0 && <p>You don&apos;t have any followers yet.</p>}

      <div className="d-flex flex-column" style={{ gap: "1rem" }}>
        {followers.map((follower) => {
          return (
            <div className="border-top pt-3">
              <Widget
                src="calebjacob.near/widget/UserHeightDisplay"
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
