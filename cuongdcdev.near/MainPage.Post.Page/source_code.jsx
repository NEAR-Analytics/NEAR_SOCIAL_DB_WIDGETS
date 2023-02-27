const userProfile = Social.getr(`${context.accountId}/profile`);
let blockedListArr = [];

if (context.accountId && userProfile.cdcBlockList) {
  blockedListArr = userProfile.cdcBlockList.split(",");
  blockedListArr = blockedListArr.map((e) => e.trim());
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
