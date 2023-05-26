const theme = props.theme;

State.init({
  images: [],
  showBrowser: false,
});
const res = fetch("http://localhost:8000/api/v1/buildspace");

console.log("body : ", res.body);

if (!res.body)
  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#000" }} />
  );

const Card = styled.div`

  // height: "100%",
//   height: 350px;
  width: 100%;
  max-width: 250px;
  border-radius: 24px;
  overflow: hidden;

  position: relative;
  border: 1px rgba(256, 256, 256, .25) solid;

  display: flex;
  flex-direction: column;
  filter: brightness(0.8);

  transition: all .2s ease-in-out;

  &:hover {
    filter: brightness(1);
  }
`;

return (
  <div
    // className="s3BuildspaceHome"
    style={{
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000" || theme.backgroundColor,
      color: "#FFF",
      height: "100% !important",
    }}
  >
    <div
      style={{
        height: "100%",
        width: "100%",
        maxWidth: 1250,
        padding: 16,
        display: "flex",
        gap: 16,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          //   flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <button
          style={{
            position: "absolute",
            left: 16,
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
          onClick={() => props.handleBrowseButton()}
        >
          🠈
        </button>
        <h1 style={{ fontWeight: 700 }}>#nw s3 YEARBOOK</h1>
      </div>

      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {res.body?.map((card, index) => (
          <Card key={index}>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={`https://ipfs.near.social/ipfs/${card.imageUrl}`}
              alt={card.name}
            />

            <div
              style={{
                color: "#FFF",

                bottom: 24,
                borderRadius: 16,

                display: "flex",
                justifyContent: "center",
                aligncards: "center",
                flexDirection: "column",
                gap: 8,
                padding: "16px 16px 8px 16px",
              }}
            >
              <h5
                style={{
                  textAlign: "center",
                  padding: 0,
                  margin: 0,
                  fontWeight: 700,
                }}
              >
                {card.name}
              </h5>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <p
                  style={{
                    textAlign: "center",
                    padding: 0,
                    margin: 0,
                    fontWeight: 400,

                    fontSize: "12px",

                    backgroundColor: theme.textColor3 + 66,
                    color: theme.textColor,
                    padding: "4px 12px",
                    borderRadius: 4,
                  }}
                >
                  #{card.house}
                </p>
              </div>

              <p
                style={{
                  textAlign: "center",
                  padding: 0,
                  margin: 0,
                  fontWeight: 500,
                  color: theme.textColor2,
                }}
              >
                {card.message}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </div>
);
