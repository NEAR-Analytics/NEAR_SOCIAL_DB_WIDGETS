const theme = props.theme;

State.init({
  showDialog: true,
  name: "",
  house: "",
  message: "",
  session: "s3",
  year: "2023",
});

const styles = {
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  inputLabel: {
    padding: 0,
    margin: 0,
    color: props.theme.textColor3,
  },
  input: {
    width: "100%",
    backgroundColor: "transparent",
    minHeight: 40,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 4,
    resize: "vertical",
    paddingInline: 8,
    color: theme.textColor2,
  },

  buttonSuccess: {
    fontWeight: 500,
    // border: "1px solid #d0d7de",
    width: "100%",
    height: 40,
    borderRadius: 4,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    backgroundColor: "#2ea043",
    color: theme.buttonTextColor,
  },
};

return (
  <>
    {state.showDialog ? (
      <div
        style={{
          height: "100%",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 32,
          position: "relative",
        }}
      >
        <div style={styles.inputContainer}>
          <p style={styles.inputLabel}>Name:</p>

          <input style={styles.input} type="text" value={state.name} />
        </div>

        <div style={styles.inputContainer}>
          <select
            style={styles.input}
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="spectreseek">Spectreseek</option>
            <option value="alterok">Alterok</option>
            <option value="gaudmire">Gaudmire</option>
            <option value="erevald">Erevald</option>
          </select>
        </div>

        <div style={styles.inputContainer}>
          <p style={styles.inputLabel}>House:</p>

          <input style={styles.input} type="select" value={state.name} />
        </div>

        <div style={styles.inputContainer}>
          <p style={styles.inputLabel}>Message:</p>
          <textarea
            className="form-control"
            rows="7"
            style={styles.input}
            type="text"
            onInput={(event) => {
              State.update({ message: event.target.value });
            }}
            value={state.message}
          />
        </div>
      </div>
    ) : (
      <div
        style={{
          height: "100%",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 32,
          position: "relative",
        }}
      >
        <div style={{ width: 150, position: "absolute", top: 16, left: 0 }}>
          <img
            width="100%"
            src="https://nearpad-images.s3.amazonaws.com/buildspace.png"
            alt="logoo"
          />
        </div>

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
          onClick={() => {
            State.update({
              showDialog: true,
            });
          }}
        >
          Apply Now
        </button>

        <p style={{ color: theme.textColor3, fontWeight: 400 }}>
          season 3 is now in progress.
        </p>
      </div>
    )}
  </>
);