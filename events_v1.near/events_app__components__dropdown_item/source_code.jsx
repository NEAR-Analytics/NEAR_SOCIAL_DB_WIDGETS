return (
  <button
    className="nav-link active"
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
