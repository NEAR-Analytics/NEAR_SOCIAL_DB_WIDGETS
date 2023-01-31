if (!props.type) {
  return "Loading ...";
}

const type = props.type.split("/")[1];
return props.type ? (
  <>
    {type == "like"
      ? "liked"
      : type == "reply"
      ? "replied"
      : type == "edit"
      ? "edited"
      : "???"}{" "}
    your
    <a
      className="fw-bold text-muted"
      href={`#/devgovgigs.near/widget/Post?id=${props.post}`}
    >
      Developer Governance post
    </a>
  </>
) : (
  "Loading ..."
);
