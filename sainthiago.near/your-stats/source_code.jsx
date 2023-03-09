const accountId = props.accountId;

const stats = Social.index("notify", accountId, { order: "desc" });

const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const numFollowing = following
  ? Object.keys(following[accountId].graph.follow || {}).length
  : 0;

const numFollowers = followers ? Object.keys(followers || {}).length : 0;

const nfts = fetch(
  `https://api.kitwallet.app/account/${accountId}/likelyNFTsFromBlock`
);

const numNfts = nfts?.body?.list?.length || 0;

const widgets = Social.keys(`${accountId ?? "*"}/widget/*`, "final");

const numWidgets = widgets[accountId]?.widget
  ? Object.keys(widgets[accountId].widget).length
  : 0;

if (!nfts.ok || stats === null) {
  return "Loading";
}

return (
  <div class="d-flex flex-column">
    <h5>your-stats:</h5>{" "}
    <p class="mb-0">
      - you own
      {numNfts}
      nfts.
    </p>
    <p class="mb-0">
      - you created
      {numWidgets}
      widgets so far.
    </p>
    <p class="mb-0">
      - you follow
      {numFollowing}
      humans.
    </p>
    <p class="mb-0">
      - {numFollowers}
      humans followed you.
    </p>
    <p class="mb-0">
      -{" "}
      {
        stats.filter((notification) => notification.value.type === "unfollow")
          .length
      }{" "}
      humans unfollowed you.
    </p>
    <p class="mb-0">
      -{" "}
      {
        stats.filter((notification) => notification.value.type === "mention")
          .length
      }{" "}
      mentions.
    </p>
    <p class="mb-0">
      -{" "}
      {
        stats.filter((notification) => notification.value.type === "like")
          .length
      }{" "}
      likes on your content so far.
    </p>
    <p class="mb-0">
      -{" "}
      {
        stats.filter((notification) => notification.value.type === "comment")
          .length
      }{" "}
      comments on something you wrote.
    </p>
  </div>
);
