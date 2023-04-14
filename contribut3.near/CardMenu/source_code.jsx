const buttonAction = ({ text, icon, id }) => (
  <li>
    <a className="dropdown-item" id={id}>
      <i className={icon} />
      <span>{text}</span>
    </a>
  </li>
);

return (
  <div className="btn-group dropstart">
    <a
      className="btn btn-outline-secondary dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i className="bi-three-dots-vertical" />
    </a>

    <ul className="dropdown-menu">
      {buttonAction({
        text: "Propose contribution",
        icon: "bi-person-up",
        id: "contribute",
      })}
      <li>
        <hr className="dropdown-divider" />
      </li>
      {buttonAction({
        text: "Invite to contribute",
        icon: "bi-person-plus",
        id: "invite",
      })}
      <li>
        <hr className="dropdown-divider" />
      </li>
      {buttonAction({
        text: "View details",
        icon: "bi-info-circle",
        id: "info",
      })}
      <li>
        <hr className="dropdown-divider" />
      </li>
      {buttonAction({
        text: "Share",
        icon: "bi-arrow-up-right",
        id: "share",
      })}
    </ul>
  </div>
);
