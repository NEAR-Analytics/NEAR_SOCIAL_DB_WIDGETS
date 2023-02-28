/*
---props---
props.post || props.id
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
  return (
    a.toDateString() +
    " " +
    a.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  ).substring(4);
}

function historyHref(widgetName, linkProps) {
  linkProps = { ...linkProps };
  const linkPropsQuery = Object.entries(linkProps)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `#/markeljan.near/widget/${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
const snapshot = post.snapshot;
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
          <li style={{ display: "flex" }}>
            <a
              class="dropdown-item"
              href={historyHref("testpostmark", {
                id: postId,
                timestamp: snapshot.timestamp,
                compareWith: null,
                referral,
              })}
            >
              {readableDate(item.timestamp / 1000000)}
            </a>
            <a
              class="dropdown-item"
              href={historyHref("testpostmark", {
                id: postId,
                timestamp: item.timestamp,
                compareWith: post.timestamp,
                referral,
              })}
            >
              <i class="bi bi-file-earmark-diff"></i>
            </a>
          </li>
        );
      })}
    </ul>
  </div>
);

return history;
