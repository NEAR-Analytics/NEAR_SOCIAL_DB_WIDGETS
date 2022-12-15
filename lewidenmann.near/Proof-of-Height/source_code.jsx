const accountId = props.accountId || context.accountId;

if (!accountId) {
  return "Please login to use Proof of Height";
}

return (
  <div className="container d-flex flex-column" style={{ gap: "1rem" }}>
    <h2>Proof of Height</h2>
    <p>Verifying personal details using social proof.</p>
    <div>
      <Widget src="calebjacob.near/widget/SetHeightForm" />
    </div>
    <div>
      <Widget src="lewidenmann.near/widget/ReviewFollowerHeights" />
    </div>
    <div>
      <Widget src="lewidenmann.near/widget/FollowerHeightList" />
    </div>
  </div>
);
