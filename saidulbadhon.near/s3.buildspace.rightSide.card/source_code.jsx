const theme = props.theme;
const card = props.card;

return (
  <div
    key={index}
    style={{
      // height: "100%",
      height: 350,
      width: "100%",
      maxWidth: 250,
      borderRadius: 24,
      overflow: "hidden",

      position: "relative",
      border: `1px rgba(256, 256, 256, .25) solid`,

      display: "flex",
    }}
  >
    <img
      style={{ width: "100%", height: "100%" }}
      src={card.imageUrl}
      alt={card.name}
    />

    <div
      style={{
        // backgroundColor: "#FFF",
        color: "#FFF",
        position: "absolute",
        left: "50%",
        width: "calc(100% - 48px)",
        transform: "translateX(-50%)",
        zIndex: 100,
        bottom: 24,
        borderRadius: 16,
        display: "flex",
        justifyContent: "center",
        aligncards: "center",

        backdropFilter: "blur(10px)",
        border: `1px rgba(256, 256, 256, .25) solid`,

        padding: "8px 16px",
      }}
    >
      <p
        style={{
          textAlign: "center",
          padding: 0,
          margin: 0,
          fontWeight: 600,
        }}
      >
        {item.message || card.name}
      </p>
    </div>
  </div>
);
