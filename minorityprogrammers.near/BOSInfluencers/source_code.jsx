const accountFollowerCount = [];
const data = Social.keys("*/profile", "final");
if (!data) {
  return "Loading";
}
let accounts = Object.entries(data);
const limit = 100;

for (let i = 0; i < accounts.length; ++i) {
  let accountId = accounts[i][0];
  let widgets = Social.get(`${accountId}/widget/*`, "final", {
    return_type: "BlockHeight",
    values_only: true,
  });
  let widgetCount = 0;
  if (widgets) {
    widgetCount = Object.keys(widgets).length;
  }
  //   accountFollowerCount.push({
  //     widgCount: widgetCount,
  //   });
  // add widgets here // need to add widgets to same array
  let subscribers = Social.keys(`*/graph/follow/${accountId}`, "final", {
    return_type: "BlockHeight",
    values_only: true,
  });

  if (subscribers) {
    accountFollowerCount.push({
      accountId: accountId,
      count: Object.keys(subscribers).length,
      widgCount: widgetCount,
    });
  }
}
const accountFollowerSort = accountFollowerCount.sort(
  (a, b) => b.count - a.count
);
const numAccounts = accountFollowerSort.length;
accountFollowerSort = accountFollowerSort.slice(0, limit);
console.log(accountFollowerSort);

return (
  <>
    <h1>🏆 Top BOS Influencers</h1>
    {accountFollowerSort.map((rank, index) => {
      let accountId = rank.accountId;
      return (
        <div className="d-flex justify-content-between mb-3">
          <div className="me-4" style={{ width: "50%" }}>
            <Widget src="mob.near/widget/Profile" props={{ accountId }} />
          </div>
          <div className="d-flex flex-column" style={{ width: "20%" }}>
            <div>
              Rank:
              <span
                style={{
                  backgroundColor: "black",
                  borderRadius: "5px",
                  padding: "5px",
                  color: "white",
                }}
              >
                {index + 1}
              </span>
            </div>
            <div>
              Followers:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {rank.count}
              </span>
            </div>
            <div>
              Components:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {rank.widgCount}
              </span>
            </div>
          </div>
          <div style={{ width: "10%" }}>
            <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />
          </div>
        </div>
      );
    })}
  </>
);
