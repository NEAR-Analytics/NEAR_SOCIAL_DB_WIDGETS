return props.post === undefined ? (
  "Loading ..."
) : (
  <>
    <a
      className="btn btn-outline-dark"
      href={`#/devgovgigs.near/widget/Post?id=${props.post}`}
    >
      View Developer Governance post
    </a>
  </>
);
