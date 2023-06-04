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
    backgroundColor: theme.buttonColor,
    border: `1px solid ${theme.buttonColor}`,
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

  if (
    !state.imageUrl?.cid ||
    state.name?.length < 2 ||
    state.house?.length < 2 ||
    state.message?.length < 2
  ) {
    State.update({
      showError: true,
    });
    return;
  } else {
    State.update({
      showError: false,
    });
  }

  asyncFetch(
    `https://perzvjxfz9.execute-api.us-east-1.amazonaws.com/production/api/v1/buildspace`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
    .then((res) => {
      State.update({
        imageUrl: "",
        name: "",
        house: "",
        message: "",
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      State.update({ showDialog: false });
    });
};

const H1Wrapper = styled.h1`
  font-size: 84px;
  color: #FFFFFF;
  line-height: 1;
  font-weight: 800;

  @media screen and (max-width: 800px)  {
    font-size: 64px;
  }
`;

return (
  <>
    {state.showDialog ? (
      <div
        style={{
          height: "100%",
          maxHeight: "100dvh",
          maxWidth: 400,
          width: "100%",
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
            style={{ ...styles.input, backgroundColor: theme.backgroundColor }}
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

        {state.showError && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p style={{ color: "red", fontWeight: 600 }}>
              Please fill all the fields
            </p>
          </div>
        )}
      </div>
    ) : (
      <div
        style={{
          height: "100%",
          minHeight: "100vh",
          maxHeight: "100vh",
          top: 0,
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
        <div>
          <h1
            style={{
              color: "#FFF",
              lineHeight: 1,
              fontWeight: 700,
            }}
          >
            #nw s3
          </h1>
          <H1Wrapper>YEARBOOK</H1Wrapper>

          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <p
              style={{
                color: "#FFF",
                lineHeight: 1,
                fontWeight: 500,
              }}
            >
              power by
            </p>
            <a href="/">
              <p
                style={{
                  color: "#FFF",
                  lineHeight: 1,
                  fontWeight: 600,

                  backgroundColor: theme.buttonTextColor,
                  color: "#000",
                  padding: "4px 8px",
                  borderRadius: 4,
                }}
              >
                nearpad.dev
              </p>
            </a>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
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
            Sign Now
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              color: theme.buttonTextColor,
              fontSize: 24,
              fontWeight: 500,
              padding: "12px 32px",
              border: "none",

              borderRadius: 40,
              // backgroundColor: theme.buttonTextColor,
              // color: "#000",
              // fontSize: 24,
              // fontWeight: 600,
              // padding: "12px 32px",
              // border: "none",

              // borderRadius: 40,
            }}
            onClick={() => {
              props.handleBrowseButton();
            }}
          >
            Browse
          </button>
        </div>

        <div style={{ position: "absolute", bottom: 16, left: 0 }}>
          <p style={{ color: theme.textColor, fontWeight: 500 }}>
            Made with ❤️ with nearpad.dev
          </p>
        </div>
      </div>
    )}
  </>
);
