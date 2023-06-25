State.init({
  sessionID: null,
  entropy: null,
});

const Hidden = styled.div`
    height: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
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

return (
  <>
    <Hidden>
      <iframe
        srcDoc={code}
        message={"hello"}
        onMessage={(val) => console.log("WOW2", val)}
      />
    </Hidden>
    {state?.sessionID && !state?.entropy && (
      <>
        <Heading>
          Selector
          <span>
            <img src="https://api.cloudnouns.com/v1/pfp?background=n&size=100&text=k" />
            <img src="https://api.cloudnouns.com/v1/pfp?background=n&size=100&text=z" />
            <img src="https://api.cloudnouns.com/v1/pfp?background=n&size=100&text=g" />
          </span>
        </Heading>
        <Widget
          src="spieler.near/widget/NounSelector"
          props={{
            sessionID: state?.sessionID,
            onSelect: (urlObject) => {
              urlObject?.search &&
                State.update({
                  entropy: urlObject.search,
                });
            },
          }}
        />
      </>
    )}
    {state?.sessionID && state?.entropy && (
      <>
        <Widget
          src="spieler.near/widget/NounishKZG.Lobby.Layout"
          props={{
            sessionID: state?.sessionID,
            entropy: state?.entropy,
          }}
        />
      </>
    )}
    {!state?.sessionID && (
      <Widget
        src="spieler.near/widget/NounishKZG.Splash"
        props={{
          onSessionID: (val) => {
            console.log("bruh22", val);
            State.update({
              sessionID: val,
            });
          },
        }}
      />
    )}
  </>
);
