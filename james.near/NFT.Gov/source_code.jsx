const hashtags = [
  { name: "nft", required: true },
  { name: "gov", required: true },
];

return (
  <Widget
    src="efiz.near/widget/Community.Posts"
    props={{
      communityHashtags: hashtags,
      exclusive: false,
      allowPublicPosting: true,
    }}
  />
);
