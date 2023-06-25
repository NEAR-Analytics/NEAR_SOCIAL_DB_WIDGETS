const nounFont = fetch(
  "https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@100;300;400;900&display=swap"
).body;
const glyphFont = `
  @font-face {
    font-family: GraublauWeb;
    src: url("https://nouns.center/assets/nountown.otf") format("opentype");
  }
`;

const Centered = styled.div`
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 400px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

const ButtonSpacer = styled.div`
  max-width: 150px;
`;

const Heading = styled.h1`
  display: block;
  ${glyphFont}
  color: white;
  background: blue;
  width: 100%;
  padding-top: 100px;
  padding-left: 24px;
  font-size: 96px;
  margin: 0px;
  font-family: GraublauWeb;

  span {
    position: absolute;
    bottom: 0;
    display: flex
  }
`;

const Subheading = styled.h3`
  padding: 12px;
  font-size: 20px;
  margin-top: 20px;
`;

const Glyph = styled.b`
  ${nounFont}
  font-size: 23px;
  font-family: 'Londrina Solid', sans-serif;
`;

const { onSessionID } = props;

State.init({
  view: "splash",
});

const { body } = fetch("https://seq.ceremony.ethereum.org/auth/request_link");
const { eth_auth_url, github_auth_url } = body ?? {};

const handleSessionID = (event) => {
  State.update({
    sessionID: event.target.value,
  });
};

return (
  <>
    <Heading>
      Nounish KZG
      <span>
        <img src="https://api.cloudnouns.com/v1/pfp?background=n&size=100&text=k" />
        <img src="https://api.cloudnouns.com/v1/pfp?background=n&size=100&text=z" />
        <img src="https://api.cloudnouns.com/v1/pfp?background=n&size=100&text=g" />
      </span>
    </Heading>
    <Centered>
      {state.view === "splash" && (
        <>
          <Subheading>
            Hello anoun.
            <br />
            Are you ready for your <Glyph>Noun</Glyph> to go down in{" "}
            <b>history?</b>
          </Subheading>
          <Widget
            src="near/widget/DIG.Button"
            props={{
              fill: "ghost",
              iconLeft: "ph-bold ph-currency-eth",
              label: "Unlock using Ethereum",
              variant: "secondary",
              href: eth_auth_url,
            }}
          />
          <Widget
            src="near/widget/DIG.Button"
            props={{
              fill: "ghost",
              iconLeft: "ph-bold ph-github-logo",
              label: "Unlock using Github",
              variant: "secondary",
              href: github_auth_url,
            }}
          />
          <Widget
            src="near/widget/DIG.Button"
            onClick={() => {
              State.update({ view: "input" });
            }}
            props={{
              fill: "ghost",
              iconLeft: "ph-bold ph-fingerprint",
              label: "I have my Session ID!",
              variant: "secondary",
            }}
          />
        </>
      )}

      {state.view === "input" && (
        <>
          <Subheading>
            Enter your <b>Session ID</b>.
            <br />
          </Subheading>

          <Row>
            <ButtonSpacer>
              <input onChange={handleSessionID} placeholder="..." />
            </ButtonSpacer>
            <Widget
              src="near/widget/DIG.Button"
              onClick={() => {
                State.update({ view: "submitted" });
                setTimeout(() => onSessionID?.(state.sessionID), 1000);
              }}
              props={{
                fill: "ghost",
                icon: "ph-bold ph-arrow-right",
                variant: "secondary",
                disabled: !(state?.sessionID && state.sessionID.trim().length),
              }}
            />
          </Row>
        </>
      )}

      {state.view === "submitted" && (
        <Subheading>
          Polishing <Glyph>Noggles...</Glyph>{" "}
        </Subheading>
      )}
    </Centered>
  </>
);
