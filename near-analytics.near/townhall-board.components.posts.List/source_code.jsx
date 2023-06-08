// This component implementation was forked from [IndexFeed], but it does not fully implement lazy loading.
// While this component uses InfiniteScroll, it still loads the whole list of Post IDs in one view call.
// The contract will need to be extended with pagination support, yet, even in the current state the page loads much faster.
// [IndexFeed]: https://near.social/#/mob.near/widget/WidgetSource?src=mob.near/widget/IndexFeed
/* INCLUDE: "common.jsx" */
const nearNFDevsContractAccountId =
  props.nearNFDevsContractAccountId ||
  (context.widgetSrc ?? "near-analytics.near").split("/", 1)[0];

const nearNFDevsWidgetsAccountId =
  props.nearNFDevsWidgetsAccountId ||
  (context.widgetSrc ?? "near-analytics.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearNFDevsContractAccountId: props.nearNFDevsContractAccountId,
    nearNFDevsWidgetsAccountId: props.nearNFDevsWidgetsAccountId,
    referral: props.referral,
  };

  return (
    <Widget
      src={`${nearNFDevsWidgetsAccountId}/widget/townhall-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };

  if (props.nearNFDevsContractAccountId) {
    linkProps.nearNFDevsContractAccountId = props.nearNFDevsContractAccountId;
  }

  if (props.nearNFDevsWidgetsAccountId) {
    linkProps.nearNFDevsWidgetsAccountId = props.nearNFDevsWidgetsAccountId;
  }

  if (props.referral) {
    linkProps.referral = props.referral;
  }

  const linkPropsQuery = Object.entries(linkProps)
    .filter(([_key, nullable]) => (nullable ?? null) !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `/#/${nearNFDevsWidgetsAccountId}/widget/townhall-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

initState({
  period: "week",
});

function defaultRenderItem(postId, additionalProps) {
  if (!additionalProps) {
    additionalProps = {};
  }
  // It is important to have a non-zero-height element as otherwise InfiniteScroll loads too many items on initial load
  return (
    <div style={{ minHeight: "150px" }}>
      {widget(
        `components.posts.Post`,
        {
          id: postId,
          expandable: true,
          defaultExpanded: false,
          isInList: true,
          ...additionalProps,
        },
        postId
      )}
    </div>
  );
}

const renderItem = props.renderItem ?? defaultRenderItem;

const cachedRenderItem = (item, i) => {
  if (props.searchResult && props.searchResult.keywords[item]) {
    return renderItem(item, {
      searchKeywords: props.searchResult.keywords[item],
    });
  }

  const key = JSON.stringify(item);

  if (!(key in state.cachedItems)) {
    state.cachedItems[key] = renderItem(item);
    State.update();
  }
  return state.cachedItems[key];
};

const initialRenderLimit = props.initialRenderLimit ?? 3;
const addDisplayCount = props.nextLimit ?? initialRenderLimit;

function getPostsByLabel() {
  let postIds = Near.view(nearNFDevsContractAccountId, "get_posts_by_label", {
    label: props.label,
  });
  if (postIds) {
    postIds.reverse();
  }
  return postIds;
}

function getPostsByAuthor() {
  let postIds = Near.view(nearNFDevsContractAccountId, "get_posts_by_author", {
    author: props.author,
  });
  if (postIds) {
    postIds.reverse();
  }
  return postIds;
}

function intersectPostsWithLabel(postIds) {
  if (props.label) {
    let postIdLabels = getPostsByLabel();
    if (postIdLabels === null) {
      // wait until postIdLabels are loaded
      return null;
    }
    postIdLabels = new Set(postIdLabels);
    return postIds.filter((id) => postIdLabels.has(id));
  }
  return postIds;
}

function intersectPostsWithAuthor(postIds) {
  if (props.author) {
    let postIdsByAuthor = getPostsByAuthor();
    if (postIdsByAuthor == null) {
      // wait until postIdsByAuthor are loaded
      return null;
    } else {
      postIdsByAuthor = new Set(postIdsByAuthor);
      return postIds.filter((id) => postIdsByAuthor.has(id));
    }
  }
  return postIds;
}

///////////
return (
  <>
    {Head}
    {state.items.length > 0 ? (
      <InfiniteScroll
        pageStart={0}
        loadMore={makeMoreItems}
        hasMore={state.displayCount < state.items.length}
        loader={loader}
      >
        {renderedItems}
      </InfiniteScroll>
    ) : (
      <p class="text-secondary">
        No posts {props.searchResult ? "matches search" : ""}
        {props.recency == "hot"
          ? " in " + getPeriodText(state.period).toLowerCase()
          : ""}
      </p>
    )}
  </>
);
