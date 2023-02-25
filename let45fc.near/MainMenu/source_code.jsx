const buttonStyle = {
  width: "50em",
  height: "10em",
  display: "block",
  background:
    "linear-gradient(15.09deg, rgba(0, 109, 210, 0.69) 9.51%, rgba(121, 178, 232, 0.69) 141.73%)",
  color: "#fff",
  border: "1px solid #fff",
  fontFamily: "Kadwa",
};

const rulesSrc = "let45fc.near/widget/Rules";
const gameSetupSrc = "let45fc.near/widget/GameSetup";

State.init({ nextPageSrc: null });

return (
  <>
    {state.nextPageSrc ? (
      <Widget src={state.nextPageSrc} props={props} />
    ) : (
      <div
        style={{
          width: "100%",
          height: "100%",
          // "margin-left": "-8%",
          background:
            "center / contain no-repeat url(https://raw.githubusercontent.com/near-social-laser-chess/vault/main/menu-animation.gif)",
        }}
      >
        <div
          class="container"
          style={{ position: absolute, top: 0, left: 0, padding: "10rem" }}
        >
          <div class="row justify-content-center">
            <button
              onClick={() => {
                State.update({ nextPageSrc: gameSetupSrc });
              }}
              style={buttonStyle}
            >
              <h1>Play game</h1>
            </button>
          </div>
          <div class="row justify-content-center mt-3">
            <button
              onClick={() => {
                State.update({ nextPageSrc: rulesSrc });
              }}
              style={buttonStyle}
            >
              <h1>Learn rules</h1>
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);
