const accountId = props.accountId;
const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);
const renderTag = props.renderTag;

const name = metadata.name ?? widgetName;
const description = metadata.description;
const image = metadata.image;
const tags = Object.keys(metadata.tags ?? {});

const linktree = Object.entries(metadata.linktree ?? {});
const linktreeElements = {
  website: {
    prefix: "https://",
    icon: "bi-globe2",
  },
};

const linktreeObjects = linktree.map((o) => {
  const key = o[0];
  let value = o[1];
  if (!value) {
    return null;
  }
  const e = linktreeElements[key];
  if (e.prefix) {
    value = value && value.replace(e.prefix, "");
  }
  const icon = e.icon ? (
    <i className={`bi ${e.icon ?? ""} text-secondary me-1`}></i>
  ) : (
    ""
  );
  return e.prefix ? (
    <div className="text-truncate">
      <a href={`${e.prefix}${value}`}>
        {icon}
        {value}
      </a>
    </div>
  ) : (
    <div className="text-truncate">
      {key}: {icon}
      {value}
    </div>
  );
});

const descriptionKey = `${widgetPath}-description`.replaceAll(/[._\/-]/g, "--");

return (
  <div className="card" style={{ borderRadius: "2em" }}>
    <div className="row py-3 g-1">
      <div className="m-auto text-center" style={{ maxWidth: "12em" }}>
        <div
          className="d-inline-block"
          style={{ width: "10em", height: "10em" }}
        >
          <Widget
            src="mob.near/widget/Image"
            props={{
              image,
              className: "w-100 h-100",
              style: { objectFit: "cover", borderRadius: "2em" },
              thumbnail: false,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
              alt: widgetName,
            }}
          />
        </div>
      </div>
      <div className="col px-2">
        <div className="position-relative">
          <h5 className="card-title">{name}</h5>
          <div className="text-truncate mb-1">
            <a className="stretched-link" href={`#/${widgetPath}`}>
              <i className="bi bi-box-arrow-up-right text-secondary me-1" />
              {widgetPath}
            </a>
          </div>
        </div>
        <div className="card-text">
          {tags.length > 0 && (
            <div>
              {tags.map((tag) => {
                const tagBadge = (
                  <span className="me-1 mb-1 badge bg-secondary">#{tag}</span>
                );
                return renderTag ? renderTag(tag, tagBadge) : tagBadge;
              })}
            </div>
          )}
          {(description || linktreeObjects.length > 0) && (
            <>
              <button
                className="btn btn-sm btn-outline-secondary border-0"
                data-bs-toggle="collapse"
                data-bs-target={`#${descriptionKey}`}
                aria-expanded="false"
                aria-controls={descriptionKey}
              >
                <i class="bi bi-arrows-angle-expand me-1"></i>Show details
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    <div className="card-text p-2 pt-0 collapse" id={descriptionKey}>
      <Markdown text={description} />
      {linktreeObjects}
    </div>
    <div
      className="card-footer"
      style={{ borderBottomLeftRadius: "2em", borderBottomRightRadius: "2em" }}
    >
      <div className="d-flex justify-content-start">
        <div className="flex-grow-1 me-1 text-truncate">
          <span className="text-secondary me-1">By</span>
          <Widget
            src="mob.near/widget/ProfileLine"
            props={{ accountId, link: props.profileLink }}
          />
        </div>
        <div>
          <small className="ps-1 text-nowrap text-muted ms-auto">
            <i className="bi bi-clock me-1"></i>
            <Widget
              src="mob.near/widget/TimeAgo"
              props={{ keyPath: widgetPath, now: props.metadata, blockHeight }}
            />
          </small>
        </div>
      </div>
    </div>
  </div>
);
