return props.post === undefined ? (
  "Loading ..."
) : (
  <>
    <a
      className="btn btn-outline-dark"
      href={`#/devgigsboard.bo.near/widget/Ideas?postId=${props.post}`}
    >
      View Developer Governance post
    </a>
  </>
);
