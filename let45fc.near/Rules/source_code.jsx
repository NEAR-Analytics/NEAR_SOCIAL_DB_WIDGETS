const markdown = fetch(
  "https://raw.githubusercontent.com/near-social-laser-chess/rules/main/rules.md"
);

State.init({ goBack: false });
const mainMenuSrc = "let45fc.near/widget/MainMenu";

return (
  <>
    {state.goBack ? (
      <Widget src={mainMenuSrc} />
    ) : (
      <>
        <button
          onClick={() => {
            State.update({ goBack: !state.goBack });
          }}
          type="button"
          class="btn btn-secondary"
        >
          <i class="bi bi-arrow-left" style={{ marginBottom: "30px" }}></i> Go
          back
        </button>
        <Markdown text={markdown.body} />
        <button
          onClick={() => {
            State.update({ goBack: !state.goBack });
          }}
          type="button"
          class="btn btn-secondary"
        >
          <i class="bi bi-arrow-left" style={{ marginTop: "30px" }}></i> Go back
        </button>
      </>
    )}
  </>
);
