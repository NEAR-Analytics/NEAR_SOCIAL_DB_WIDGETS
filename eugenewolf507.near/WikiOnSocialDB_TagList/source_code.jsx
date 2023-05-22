return (
  <>
    {props.tags &&
      props.tags.map((tag) => (
        <a
          key={tag}
          href={`/#/${authorForWidget}/widget/WikiOnSocialDB_ArticlesByTag?tag=${tag}`}
          className="me-1 mb-1 text-primary bg-primary bg-opacity-10 position-relative fw-normal badge border border-primary text-decoration-none"
        >
          #{tag}
        </a>
      ))}
  </>
);
