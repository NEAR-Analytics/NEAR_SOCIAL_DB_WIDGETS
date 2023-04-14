if (!props.type) {
  return "Loading ...";
}

const type = props.type.split("/")[1];
return props.type ? (
  <>
    {type == "like"
      ? "liked"
      : type == "reply"
      ? "relied"
      : type == "edit"
      ? "edited"
      : "???"}{" "}
    your
    <a
      className="fw-bold text-muted"
      href={`#/devgigsboard.bo.near/widget/Ideas?postId=${props.post}`}
    >
      Developer Governance Post
    </a>
  </>
) : (
  "Loading ..."
);
