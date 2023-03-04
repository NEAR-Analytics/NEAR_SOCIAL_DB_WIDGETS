return (
  <div
    style={{
      display: "flex",
      gap: 10,
      alignItems: "center",
    }}
  >
    <img
      style={{ height: 15, opacity: 0.5 }}
      src="https://cdn-icons-png.flaticon.com/512/3179/3179068.png"
      alt="folder"
    />
    <p
      style={{
        color: "rgba(0,0,0,.5)",
        fontWeight: 500,
        fontSize: ".9rem",

        margin: 0,
        padding: 0,
      }}
    >
      {props.location}
    </p>
  </div>
);
