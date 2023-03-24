return (
  <div className="container d-flex flex-column" style={{ gap: "1rem" }}>
    <h2>Proof of Height v0</h2>
    <p>Verifying personal details using social proof.</p>
    <div>
      <Widget src="a92d2106fd31a2d52501953961b1639745434ee343fb6303e4d0195b501b75ad/widget/SetHeightForm" />
    </div>
    <div>
      <Widget src="lewidenmann.near/widget/ReviewFollowerHeights" />
    </div>
    <div>
      <Widget src="lewidenmann.near/widget/FollowerHeightList" />
    </div>
  </div>
);
