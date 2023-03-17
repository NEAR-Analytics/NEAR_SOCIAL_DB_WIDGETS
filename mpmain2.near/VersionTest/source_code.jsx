const versions = Social.keys("mpmain2.near/widget/VersionTestInner", "final", {
  return_type: "History",
  // subscribe: true,
});
return (
  <div>
    Versions:{JSON.stringify(versions)}
    <Widget src="mpmain2.near/widget/VersionTestInner@86775507" />
    <Widget src="mpmain2.near/widget/VersionTestInner" />
  </div>
);
