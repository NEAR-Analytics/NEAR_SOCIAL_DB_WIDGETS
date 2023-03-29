/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId || "devgovgigs.near".split("/", 1)[0];
const nearDevGovGigsWidgetsAccountId =
  props.nearDevGovGigsWidgetsAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearDevGovGigsContractAccountId: props.nearDevGovGigsContractAccountId,
    nearDevGovGigsWidgetsAccountId: props.nearDevGovGigsWidgetsAccountId,
    referral: props.referral,
  };
  return (
    <Widget
      src={`${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };
  if (props.nearDevGovGigsContractAccountId) {
    linkProps.nearDevGovGigsContractAccountId =
      props.nearDevGovGigsContractAccountId;
  }
  if (props.nearDevGovGigsWidgetsAccountId) {
    linkProps.nearDevGovGigsWidgetsAccountId =
      props.nearDevGovGigsWidgetsAccountId;
  }
  if (props.referral) {
    linkProps.referral = props.referral;
  }
  const linkPropsQuery = Object.entries(linkProps)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `#/${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

const Scroll = styled.div`
   {
    z-index: -1;
    margin-top: calc(-24px + 100px + 25px + 200px);
  }
`;
if (!props.id) {
  return;
}
const post = Near.view(nearDevGovGigsContractAccountId, "get_post", {
  post_id: Number(props.id),
});
if (!post) {
  return <div>Loading ...</div>;
}
const snapshot = post.snapshot;

initState({
  tab: "Overview",
});

function switchTab(tab) {
  State.update({ tab });
}

const requiredLabels = ["community", props.label];

const postIdsWithLabels = (labels) => {
  const ids = labels
    .map(
      (label) =>
        Near.view(nearDevGovGigsContractAccountId, "get_posts_by_label", {
          label,
        }) ?? []
    )
    .map((ids) => new Set(ids))
    .reduce((previous, current) => {
      let res = new Set();
      for (let id of current) {
        if (previous.has(id)) {
          res.add(id);
        }
      }
      return res;
    });
  return new Array(...ids);
};

const requiredPosts = postIdsWithLabels(requiredLabels);

return (
  <>
    {widget("components.layout.Banner")}
    {widget("components.layout.CommunityHeader", {
      title: props.title,
      icon: props.icon,
      desc: props.desc,
      switchTab,
    })}
    <Scroll>
      {state.tab === "Overview" ? (
        <div>
          <Markdown class="card-text" text={snapshot.description}></Markdown>
        </div>
      ) : state.tab === "Discussions" ? (
        <div>
          <div class="row mb-2">
            <div class="col">
              <small class="text-muted">
                Required labels:
                {requiredLabels.map((label) => (
                  <a href={href("Feed", { label })} key={label}>
                    <span class="badge text-bg-primary me-1">{label}</span>
                  </a>
                ))}
              </small>
            </div>
          </div>
          {widget("components.layout.Controls")}
          <div class="row">
            <div class="col">
              {requiredPosts.map((postId) =>
                widget("components.posts.Post", { id: postId }, postId)
              )}
            </div>
          </div>
        </div>
      ) : state.tab === "Sponsorship" ? (
        <div>Sponsorship</div>
      ) : state.tab === "Events" ? (
        <div>Events</div>
      ) : (
        <div>Loading ...</div>
      )}
    </Scroll>
  </>
);
