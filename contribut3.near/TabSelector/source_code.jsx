const buttons = props.buttons ?? [];

return (
  <div className="btn-group" role="group" aria-label="Content Tab Selector">
    {buttons.map(({ id, text, icon, count }) => (
      <a
        className={`btn ${state.content === id ? "btn-secondary" : "btn-outline-secondary"
          }`}
        href={`https://near.social/#/${ownerId}/widget/Index?tab=entity&content=${id}${props.search ? "&search=" + props.search : ""
          }&accountId=${accountId}`}
        onClick={() => props.update(id)}
        key={id}
      >
        <i className={icon} />
        <span>{text}</span>
        {!!count && count > 0 ? (
          <div
            className="d-inline-block rounded-circle bg-danger text-center"
            style={{ minWidth: "1.5em", height: "1.5em", color: "#FFF" }}
          >
            {count}
          </div>
        ) : (
          <></>
        )}
      </a>
    ))}
  </div>
);
