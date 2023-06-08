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

State.init({
  propsLabel: props.label,
  label: props.label,
  author: props.author,
});

// When rerendered with different props, State will be preserved, so we need to update the state when we detect that the props have changed.
if (props.label !== state.propsLabel) {
  State.update({
    propsLabel: props.label,
    label: props.label,
  });
}

const onSearchLabel = (label) => {
  State.update({ label });
};

const onSearchAuthor = (author) => {
  State.update({ author });
};

return widget("components.layout.Page", {
  header: widget("components.community.FeedHeader"),
  children: widget("components.posts.Search", {
    children: widget("components.layout.Controls"),
    recency: props.recency,
    label: state.label,
    author: state.author,
    //
    labelQuery: { label: state.label },
    onSearchLabel,
    //
    authorQuery: { author: state.author },
    onSearchAuthor,
  }),
});
