return (
  <button
    className="nav-link"
    aria-current="page"
    href=""
    onClick={(e) => {
      e.preventDefault();
      props.onClick();
    }}
  >
    {props.label}
  </button>
);
