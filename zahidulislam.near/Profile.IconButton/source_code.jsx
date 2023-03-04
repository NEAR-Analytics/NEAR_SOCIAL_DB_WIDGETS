return (
  <div
    style={{
      display: "flex",
      gap: 10,
      alignItems: "center",
    }}
  >
    <img style={{ height: 15, opacity: 0.5 }} src={props.icon} alt="icon" />
    <p
      style={{
        color: "rgba(0,0,0,.5)",
        fontWeight: 500,
        fontSize: ".9rem",

        margin: 0,
        padding: 0,
      }}
    >
      {props.label}
    </p>
  </div>
);
