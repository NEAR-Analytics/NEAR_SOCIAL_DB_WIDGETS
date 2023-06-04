const theme = props.theme;

State.init({
  showDialog: false,
  imageUrl: "",
  name: "",
  house: "spectreseek",
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
    color: theme.textColor,
  },

  buttonSuccess: {
    fontWeight: 500,
    width: "100%",
    height: 40,
    borderRadius: 4,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    backgroundColor: "#2ea043",
    border: "1px solid #2ea043",
    color: theme.buttonTextColor,
  },
};

const handleSubmit = () => {
  // console.log("SUBMIT");

  const body = {
    imageUrl: state.imageUrl?.cid,
    name: state.name,
    house: state.house,
    message: state.message,
    session: state.session,
    year: state.year,
  };

  asyncFetch(`http://localhost:8000/api/v1/buildspace`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      State.update({ showDialog: false });
    });
};

return (
  <>
    {state.showDialog ? (
      <div
        style={{
          height: "100%",
          maxHeight: "100vh",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 32,
          position: "relative",
        }}
      >
        <div style={styles.inputContainer}>
          <p style={styles.inputLabel}>Image URL:</p>

          <IpfsImageUpload
            image={state.imageUrl}
            style={{
              fontWeight: 500,
              // border: "1px solid #d0d7de",
              width: "100%",
              cursor: "pointer",
              height: 40,
              padding: 0,
              borderRadius: 4,
              backgroundColor: props.theme.buttonColor,
              color: props.theme.buttonTextColor,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>

        <div style={styles.inputContainer}>
          <p style={styles.inputLabel}>Name:</p>

          <input
            style={styles.input}
            type="text"
            placeholder="Jon Deo"
            value={state.name}
          />
        </div>

        <div style={styles.inputContainer}>
          <p style={styles.inputLabel}>House:</p>

          <select
            style={{ ...styles.input, backgroundColor: theme.ui }}
            value={state.house}
            onChange={(event) => State.update({ house: event.target.value })}
          >
            <option value="spectreseek">Spectreseek</option>
            <option value="alterok">Alterok</option>
            <option value="gaudmire">Gaudmire</option>
            <option value="erevald">Erevald</option>
          </select>
        </div>

        <div style={styles.inputContainer}>
          <p style={styles.inputLabel}>Message:</p>

          <textarea
            className="form-control"
            placeholder="Write your message here"
            rows="7"
            style={styles.input}
            type="text"
            onInput={(event) => {
              State.update({ message: event.target.value });
            }}
            value={state.message}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 20,
            width: "100%",
          }}
        >
          <button
            style={{
              ...styles.buttonSuccess,
              backgroundColor: theme.textColor3 + 33,
              borderColor: theme.textColor3 + 33,
              color: theme.textColor,
            }}
            onClick={() =>
              State.update({
                showDialog: false,
              })
            }
          >
            Back
          </button>

          <button style={styles.buttonSuccess} onClick={() => handleSubmit()}>
            Save
          </button>
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
