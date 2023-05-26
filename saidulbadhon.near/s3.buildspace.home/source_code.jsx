const theme = props.theme;

State.init({
  images: [],
  showBrowser: false,
});
const res = fetch("http://localhost:8000/api/v1/buildspace/showcase");

if (!res.body?.list1)
  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#000" }} />
  );

const handleBrowseButton = () => {
  State.update({
    showBrowser: !state.showBrowser,
  });
};

return state.showBrowser ? (
  <Widget
    src="saidulbadhon.near/widget/s3.buildspace.browser"
    props={{
      theme,
      handleBrowseButton,
    }}
  />
) : (
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
        height: "100%",
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
        props={{
          theme,
          handleBrowseButton,
        }}
      />

      <div
        className="scroll-container"
        style={{
          maxHeight: "100vh",
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
            overflowY: "hidden",
          }}
        >
          {res.body?.list1?.map((item, index) => (
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
            overflowY: "hidden",
          }}
        >
          {res.body?.list2?.map((item, index) => (
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
