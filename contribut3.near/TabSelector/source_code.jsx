const buttons = props.buttons ?? [];

const contentSelectButton = ({ id, text, icon, count = 0 }) => (
  <a
    className={`btn ${state.content === id ? "btn-secondary" : "btn-outline-secondary"
      }`}
    href={`https://near.social/#/${ownerId}/widget/Index?tab=entity&content=${id}${props.search ? "&search=" + props.search : ""
      }&accountId=${accountId}`}
    onClick={() => props.update(id)}
  >
    <i className={icon} />
    <span>{text}</span>
    {count > 0 ? (
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
);

return (
  <div className="btn-group" role="group" aria-label="Content Tab Selector">
    {buttons.map((button) => contentSelectButton(button))}
  </div>
);
