const theme = props.theme;

State.init({
  images: [],
  showBrowser: false,
  selectedHouse: "",
});
const res = fetch(
  "https://t4zr86bzl5.execute-api.us-east-1.amazonaws.com/production/api/v1/buildspace"
);

if (!res.body)
  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#000" }} />
  );

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
              #nw s3 YEARBOOK
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
              State.update({
                selectedHouse:
                  state.selectedHouse === "spectreseek" ? "" : "spectreseek",
              });
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
              State.update({
                selectedHouse:
                  state.selectedHouse === "alterok" ? "" : "alterok",
              });
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
              State.update({
                selectedHouse:
                  state.selectedHouse === "erevald" ? "" : "erevald",
              });
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
              State.update({
                selectedHouse:
                  state.selectedHouse === "gaudmire" ? "" : "gaudmire",
              });
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
          {res.body?.map((card, index) => {
            return state.selectedHouse === card.house ? (
              <Widget
                src="saidulbadhon.near/widget/s3.buildspace.browser.card"
                props={{
                  theme,
                  card,
                }}
              />
            ) : (
              <Widget
                src="saidulbadhon.near/widget/s3.buildspace.browser.card"
                props={{
                  theme,
                  card,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  </div>
);
