const theme = props.theme;

return (
  <div
    style={{
      height: "100%",
      maxHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: 32,
    }}
  >
    <h1
      style={{
        color: "#FFF",
        fontSize: 84,
        lineHeight: 1,
        fontWeight: 800,
        width: "11ch",
      }}
    >
      six weeks to finally work on your ideas. <br />
      you in?
    </h1>

    <button
      style={{
        backgroundColor: theme.buttonTextColor,
        color: "#000",
        fontSize: 24,
        fontWeight: 600,
        padding: "12px 32px",
        border: "none",

        borderRadius: 40,
      }}
    >
      Apply Now
    </button>

    <p style={{ color: theme.textColor3, fontWeight: 400 }}>
      season 3 is now in progress.
    </p>
  </div>
);
