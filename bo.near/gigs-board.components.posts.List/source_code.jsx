// This component implementation was forked from [IndexFeed], but it does not fully implement lazy loading.
// While this component uses InfiniteScroll, it still loads the whole list of Post IDs in one view call.
// The contract will need to be extended with pagination support, yet, even in the current state the page loads much faster.
// [IndexFeed]: https://near.social/#/mob.near/widget/WidgetSource?src=mob.near/widget/IndexFeed

/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];
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

console.log(props);

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
  return Near.view(nearDevGovGigsContractAccountId, "get_posts_by_label", {
    label: props.label,
  });
}

function getPostsByAuthor() {
  return Near.view(nearDevGovGigsContractAccountId, "get_posts_by_author", {
    author: props.author,
  });
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

let postIds;
if (props.searchResult) {
  postIds = props.searchResult.postIds;
  postIds = intersectPostsWithLabel(postIds);
  // postIds = intersectPostsWithAuthor(postIds);
} else if (props.label) {
  postIds = getPostsByLabel();
  // postIds = intersectPostsWithAuthor(postIds);
} else if (props.author) {
  postIds = getPostsByAuthor();
} else if (props.recency == "all") {
  postIds = Near.view(nearDevGovGigsContractAccountId, "get_all_post_ids");
} else {
  postIds = Near.view(nearDevGovGigsContractAccountId, "get_children_ids");
}

const loader = (
  <div className="loader" key={"loader"}>
    <span
      className="spinner-grow spinner-grow-sm me-1"
      role="status"
      aria-hidden="true"
    />
    Loading ...
  </div>
);

if (postIds === null) {
  return loader;
}
const initialItems = props.searchResult ? postIds : postIds.reverse();
//const initialItems = postIds.map(postId => ({ id: postId, ...Near.view(nearDevGovGigsContractAccountId, "get_post", { post_id: postId }) }));

// const computeFetchFrom = (items, limit) => {
//   if (!items || items.length < limit) {
//     return false;
//   }
//   const blockHeight = items[items.length - 1].blockHeight;
//   return index.options.order === "desc" ? blockHeight - 1 : blockHeight + 1;
// };

// const mergeItems = (newItems) => {
//   const items = [
//     ...new Set([...newItems, ...state.items].map((i) => JSON.stringify(i))),
//   ].map((i) => JSON.parse(i));
//   items.sort((a, b) => a.blockHeight - b.blockHeight);
//   if (index.options.order === "desc") {
//     items.reverse();
//   }
//   return items;
// };

const jInitialItems = JSON.stringify(initialItems);
if (state.jInitialItems !== jInitialItems) {
  // const jIndex = JSON.stringify(index);
  // if (jIndex !== state.jIndex) {
  State.update({
    jIndex,
    jInitialItems,
    items: initialItems,
    fetchFrom: false,
    //nextFetchFrom: computeFetchFrom(initialItems, index.options.limit),
    nextFetchFrom: false,
    displayCount: initialRenderLimit,
    cachedItems: {},
  });
  // } else {
  //   State.update({
  //     jInitialItems,
  //     items: mergeItems(initialItems),
  //   });
  // }
}

if (state.fetchFrom) {
  console.log("TODO: fetchFrom");
  // const limit = addDisplayCount;
  // const newItems = Social.index(
  //   index.action,
  //   index.key,
  //   Object.assign({}, index.options, {
  //     from: state.fetchFrom,
  //     subscribe: undefined,
  //     limit,
  //   })
  // );
  // if (newItems !== null) {
  //   State.update({
  //     items: mergeItems(newItems),
  //     fetchFrom: false,
  //     nextFetchFrom: computeFetchFrom(newItems, limit),
  //   });
  // }
}

const makeMoreItems = () => {
  State.update({
    displayCount: state.displayCount + addDisplayCount,
  });
  if (
    state.items.length - state.displayCount < addDisplayCount * 2 &&
    !state.fetchFrom &&
    state.nextFetchFrom &&
    state.nextFetchFrom !== state.fetchFrom
  ) {
    State.update({
      fetchFrom: state.nextFetchFrom,
    });
  }
};

const fetchMore =
  props.manual &&
  (state.fetchFrom && state.items.length < state.displayCount
    ? loader
    : state.displayCount < state.items.length && (
        <div key={"loader more"}>
          <a href="javascript:void" onClick={(e) => makeMoreItems()}>
            {props.loadMoreText ?? "Load more..."}
          </a>
        </div>
      ));

const items = state.items ? state.items.slice(0, state.displayCount) : [];

console.log(items);
const renderedItems = items.map(cachedRenderItem);

return (
  <InfiniteScroll
    pageStart={0}
    loadMore={makeMoreItems}
    hasMore={state.displayCount < state.items.length}
    loader={loader}
  >
    {renderedItems}
  </InfiniteScroll>
);
