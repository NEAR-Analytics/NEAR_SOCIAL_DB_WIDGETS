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

return (
  <div
    className="s3BuildspaceHome"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000" || theme.backgroundColor,
      color: "#FFF",
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
      <h1 style={{ fontWeight: 700 }}>#nw s3 YEARBOOK</h1>

      <button>SDADS</button>
    </div>
  </div>
);
