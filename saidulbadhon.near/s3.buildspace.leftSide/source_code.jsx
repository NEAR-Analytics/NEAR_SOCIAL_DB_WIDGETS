const theme = props.theme;

return (
  <div
    style={{
      height: "100%",
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
        fontSize: 72,
        lineHeight: 1,
        fontWeight: 700,
      }}
    >
      six weeks to finally work on your ideas. you in?
    </h1>

    <button
      style={{
        backgroundColor: theme.buttonTextColor,
        color: "#000",
        fontWeight: 600,
        padding: "8px 16px",
        border: "none",

        borderRadius: 20,
      }}
    >
      Apply Now
    </button>

    <p style={{ color: theme.textColor3, fontWeight: 500 }}>
      season 3 is now in progress.
    </p>
  </div>
);
