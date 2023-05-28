const theme = props.theme;
const Card = styled.div`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px rgba(256, 256, 256, .25) solid;
  display: flex;
  flex-direction: column;
  filter: brightness(0.8);
  height: 416px;
  transition: all .2s ease-in-out;

  &:hover {
    filter: brightness(1);
  }
`;
const PTag = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
`;

State.init({
  images: [],
  showBrowser: false,
  selectedHouse: "",
});
// const res = fetch(
//   "https://t4zr86bzl5.execute-api.us-east-1.amazonaws.com/production/api/v1/buildspace" +
//     state.selectedHouse
// );
const res = fetch(
  `http://localhost:8000/api/v1/buildspace/${state.selectedHouse}`
);

if (!res.body)
  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#000" }} />
  );

const handleUpdateHouse = (houseName) => {
  console.log(houseName);

  State.update({
    selectedHouse: state.selectedHouse === houseName ? "" : houseName,
  });
};

return (
  <div className="s3BuildspaceHome">
    <div
      style={{
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#000" || theme.backgroundColor,
        color: "#FFF",

        backgroundColor:
          (state.selectedHouse === "spectreseek" && "#eb413b22") ||
          (state.selectedHouse === "alterok" && "#5499ff22") ||
          (state.selectedHouse === "erevald" && "#10fc5522") ||
          (state.selectedHouse === "gaudmire" && "#f5e03a22") ||
          "#000000",
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
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
          }}
        >
          <button
            style={{
              position: "absolute",
              left: 0,
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
            onClick={() => props.handleBrowseButton()}
          >
            🠈
          </button>
          <div>
            <h1 style={{ fontWeight: 700, textAlign: "center" }}>
              #nw s3 YEARBOOK | state: {state.selectedHouse}
            </h1>

            <p
              style={{
                fontWeight: 500,
                color: theme.textColor2,
                textAlign: "center",
              }}
            >
              {res.body?.length} builders
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
            gap: 8,
          }}
        >
          <button
            style={{
              backgroundColor: "#eb413b33",
              color: "#eb413b",
              border: "none",
            }}
            onClick={() => {
              handleUpdateHouse("spectreseek");
            }}
          >
            Spectreseek
          </button>
          <button
            style={{
              backgroundColor: "#5499ff33",
              color: "#5499ff",
              border: "none",
            }}
            onClick={() => {
              handleUpdateHouse("alterok");
            }}
          >
            Alterok
          </button>
          <button
            style={{
              backgroundColor: "#10fc5533",
              color: "#10fc55",
              border: "none",
            }}
            onClick={() => {
              handleUpdateHouse("erevald");
            }}
          >
            Erevald
          </button>
          <button
            style={{
              backgroundColor: "#f5e03a33",
              color: "#f5e03a",
              border: "none",
            }}
            onClick={() => {
              handleUpdateHouse("gaudmire");
            }}
          >
            Gaudmire
          </button>
        </div>

        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
            height: "100%",
          }}
        >
          {/*state.selectedHouse.length > 2
            ? state.users?.length > 2 &&
              state.users?.map((card, index) => (
                <Widget
                  src="saidulbadhon.near/widget/s3.buildspace.browser.card"
                  props={{
                    theme,
                    card,
                  }}
                />
              ))
            : res.body?.map((card, index) => (
                <div>
                  <p>NOT MATCH, {console.log(state)}</p>

                  <Widget
                    src="saidulbadhon.near/widget/s3.buildspace.browser.card"
                    props={{
                      theme,
                      card,
                    }}
                  />
                </div>
              ))*/}
          {res.body?.map((card, index) => (
            <a
              href={`/s3/${card.name}`}
              style={{ textTransform: "none", textDecoration: "none" }}
            >
              <Card>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: 250,
                    maxHeight: 250,
                    objectFit: "cover",
                    aspectRatio: 1 / 1,
                    backgroundColor: theme.textColor2,
                  }}
                  src={
                    card.imageUrl
                      ? `https://ipfs.near.social/ipfs/${card.imageUrl}`
                      : "https://i.pinimg.com/originals/6b/f6/2c/6bf62c6c123cdcd33d2d693782a46b34.jpg"
                  }
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

                  <PTag
                    style={{
                      textAlign: "center",
                      padding: 0,
                      margin: 0,
                      fontWeight: 500,
                      color: theme.textColor2,
                    }}
                  >
                    {card.message}
                  </PTag>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);
