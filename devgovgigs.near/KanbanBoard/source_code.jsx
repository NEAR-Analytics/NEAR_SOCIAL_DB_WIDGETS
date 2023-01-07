const ownerId = "devgovgigs.near";

const requiredLabels = props.requiredLabels ?? ["near-social"];
const columnLabels = props.columnLabels ?? [
  "widget",
  "integration",
  "feature-request",
];

const requiredPostsNested = requiredLabels.map((rl) => {
  return Near.view(ownerId, "get_posts_by_label", {
    label: rl,
  });
});
const requiredPostsFlat = requiredPostsNested.flat(1);
const requiredPostsSet = new Set(requiredPostsFlat);

const postsPerLabel = columnLabels.map((cl) => {
  let allIds = Near.view(ownerId, "get_posts_by_label", {
    label: cl,
  }).reverse();
  if (requiredLabels.length > 0) {
    return { label: cl, posts: allIds.filter((i) => requiredPostsSet.has(i)) };
  } else {
    // No extra filtering is required.
    return { label: cl, posts: allIds };
  }
});

return (
  <div class="row">
    {postsPerLabel.map((col) => {
      return (
        <div class="col">
          <div class="card">
            <div class="card-header">
              <span class="badge text-bg-primary">{col.label}</span>
            </div>
            <div class="card-body border-secondary">
              {col.posts.map((postId) => {
                return (
                  <Widget
                    src={`${ownerId}/widget/CompactPost`}
                    props={{ id: postId }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
