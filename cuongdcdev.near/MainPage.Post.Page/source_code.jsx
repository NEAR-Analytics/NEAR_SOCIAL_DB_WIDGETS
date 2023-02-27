const userProfile = Social.getr(`${context.accountId}/profile`);
let blockedarr = [];

if (context.accountId && userProfile.cdcBlockList) {
  blockedarr = userProfile.cdcBlockList.split(",");
  blockedarr = blockedarr.map((e) => e.trim());
}

return (
  <Widget
    src="cuongdcdev.near/widget/MainPage.PostPlus"
    props={{
      ...props,
      commentsLimit: 30,
      subscribe: true,
      blockedListArr: blockedarr,
    }}
  />
);
