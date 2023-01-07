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
  <div>
    <div class="row mb-2">
      <div class="col">
        <small class="text-muted">
          Required labels:
          {requiredLabels.map((label) => {
            return (
              <a
                href={`https://near.social/#/devgovgigs.near/widget/Ideas?label=${label}`}
              >
                <span class="badge text-bg-primary me-1">{label}</span>
              </a>
            );
          })}
        </small>
      </div>
    </div>
    <div class="row">
      {postsPerLabel.map((col) => {
        return (
          <div class="col">
            <div class="card">
              <div class="card-body border-secondary">
                <h6 class="card-title">
                  {col.label.toUpperCase()}({col.posts.length})
                </h6>
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
  </div>
);
