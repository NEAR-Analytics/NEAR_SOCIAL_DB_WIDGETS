const theme = props.theme;

State.init({
  images: [],
});
const res = fetch("http://localhost:8000/api/v1/buildspace");

// console.log(res.body);

// State.update({ images: res.body });

return (
  <div
    className="s3BuildspaceHome"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000" || theme.backgroundColor,
    }}
  >
    <div
      style={{
        // height: "calc(100vh - 100px)",
        height: "100%",
        // maxHeight: "calc(100vh - 85px)",
        maxHeight: "100vh",
        width: "100%",
        maxWidth: 1250,
        display: "grid",
        gap: 32,
        gridTemplateColumns: "1fr 524px",
        paddingInline: 16,
      }}
    >
      <Widget
        src="saidulbadhon.near/widget/s3.buildspace.leftSide"
        props={{ theme }}
      />

      <div
        className="scroll-container"
        style={{
          maxHeight: "100vh",
          overflowY: "hidden",
          display: "flex",
          gap: 24,
        }}
      >
        <div
          className="image-container"
          id="image-container"
          style={{
            display: "grid",
            gridTemplateColumns: "250px",
            gap: 24,
            justifyContent: "center",
            height: "100%",
          }}
        >
          {res.body?.map((item, index) => (
            <Widget
              key={index}
              src="saidulbadhon.near/widget/s3.buildspace.rightSide.card"
              props={{ theme, card: item }}
            />
          ))}
        </div>

        <div
          className="image-container reverse"
          id="image-container"
          style={{
            display: "grid",
            gridTemplateColumns: "250px",
            gap: 24,
            justifyContent: "center",
            height: "100%",
          }}
        >
          {res.body?.map((item, index) => (
            <Widget
              key={index}
              src="saidulbadhon.near/widget/s3.buildspace.rightSide.card"
              props={{ theme, card: item }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
