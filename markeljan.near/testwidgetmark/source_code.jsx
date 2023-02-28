/*
---props---
props.post: {};
props.id: number;
props.referral: any;
*/

const postId = props.post.id ?? (props.id ? parseInt(props.id) : 0);
const post =
  props.post ??
  Near.view("devgovgigs.near", "get_post", {
    post_id: postId,
  });
if (!post || post.snapshot_history.length === 0) {
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
                timestamp: item.timestamp,
                compareWith: null,
                referral,
              })}
            >
              {readableDate(item.timestamp / 1000000)}

              <Widget
                src="mob.near/widget/ProfileImage"
                props={{
                  accountId: item.editor_id,
                  style: {
                    width: "1.25em",
                    height: "1.25em",
                  },
                  imageStyle: {
                    transform: "translateY(-10%)",
                  },
                }}
              />
              {post.author_id.substring(0, 8)}
            </a>
            <a
              class="dropdown-item"
              href={historyHref("testpostmark", {
                id: postId,
                timestamp: snapshot_timestamp,
                compareWith: item.timestamp,
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
