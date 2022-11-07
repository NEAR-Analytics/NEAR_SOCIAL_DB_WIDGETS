const accountId = props.accountId;
const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);

const name = metadata.name;
const description = metadata.description;
const image = metadata.image;
const tags = Object.keys(metadata.tags ?? {});

const linktree = Object.entries(metadata.linktree ?? {});
linktree.push(["path", widgetPath]);
const linktreeElements = {
  website: {
    prefix: "https://",
    icon: "bi-globe2",
  },
  path: {
    prefix: "#/",
    icon: "bi-box-arrow-up-right",
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
      <a className="text-decoration-none" href={`${e.prefix}${value}`}>
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

return (
  <div
    className="card shadow my-3 overflow-hidden"
    style={{ maxWidth: "30em" }}
  >
    <div className="row g-0">
      <div className="col-md-5 my-auto text-center">
        <div
          className="d-inline-block"
          style={{ width: "10em", height: "10em" }}
        >
          <Widget
            src="mob.near/widget/Image"
            props={{
              image,
              className: "w-100 h-100 shadow rounded",
              imageStyle: { objectFit: "cover" },
              thumbnail: false,
              alt: widgetName,
            }}
          />
        </div>
      </div>
      <div className="col-md-7 py-1">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <h5 className="card-title">{name}</h5>
            <div className="card-text">
              <Markdown text={description} />

              {tags.length > 0 && (
                <div>
                  {tags.map((tag) => (
                    <span className="me-1 mb-1 badge bg-secondary">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </li>
          <li className="list-group-item">{linktreeObjects}</li>
          <li className="list-group-item">
            <Widget src="mob.near/widget/Profile" props={{ accountId }} />
          </li>
        </ul>
      </div>
    </div>
  </div>
);
