if (!context.accountId) {
  return "Please login to continue";
}

return (
  <div class="text-center">
    <h4>The most beautiful profile picture on the NEAR Social:</h4>

    <Widget
      src="mob.near/widget/ProfileImage"
      props={{ accountId: context.accountId, style: { width: "20em" } }}
    />
  </div>
);
