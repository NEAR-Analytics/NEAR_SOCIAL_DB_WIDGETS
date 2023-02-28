/*
---props---
props.pathToWidget: string ("bozon.near/widget/PrivateMailBox")
props.currentBlockHeight: number
props.prevBlockHeight?: number
*/

const postId = props.post.id ?? (props.id ? parseInt(props.id) : 0);
const post =
  props.post ??
  Near.view("devgovgigs.near", "get_post", {
    post_id: postId,
  });

if (!post) {
  return <div class="bi bi-clock-history px-2"></div>;
}
const referral = props.referral;

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

function historyHref(widgetName, linkProps) {
  linkProps = { ...linkProps };
  const linkPropsQuery = Object.entries(linkProps)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `#/bozon.near/widget/${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
const snapshot_history = post.snapshot_history;
const history = (
  <div class="btn-group" role="group">
    <a
      class="card-link px-2"
      role="button"
      title="Edit post"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      type="button"
    >
      <div class="bi bi-clock-history px-2"></div>
    </a>
    <ul class="dropdown-menu">
      {snapshot_history.map((item) => {
        return (
          <li>
            <a
              class="dropdown-item"
              href={historyHref("WidgetHistory.CodeHistoryCard", {
                id: postId,
                referral,
                pathToWidget: "bozon.near/widget/CodeDiff",
                currentBlockHeight: 86198186,
              })}
            >
              {readableDate(readableDate(item.timestamp / 1000000))}
            </a>
          </li>
        );
      })}
    </ul>
  </div>
);

return history;
