State.init({ link: null });

console.log(context);

const Page = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0;
    bottom: 0px;
    background: rgba(244, 235, 234, 0.56);
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 68px 0;
`;

const BlurScreen = styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

if (context.accountId == null) {
  return (
    <Page>
      <h2 style={{ width: "100%", textAlign: "center" }}>Sign in please</h2>
    </Page>
  );
}

console.log(state);
return (
  <Page>
    <iframe
      style={{ width: "100%", maxWidth: 460, height: "100%" }}
      src="https://my.herewallet.app?stake"
      message={{
        accountId: context.accountId,
        localStorage: Storage.get("localStorage"),
      }}
      onMessage={(e) => {
        switch (e.action) {
          case "saveLocalStorage":
            Storage.set("localStorage", e.data);
            return;

          case "openLink":
            State.update({ link: e.data.link });
            return;

          case "signAndSendTransaction":
            const call = e.data.actions[0].params;
            Near.call(
              e.data.receiverId,
              call.methodName,
              call.args,
              call.gas,
              call.deposit
            );
            return;
        }
      }}
    />

    {state.link && (
      <BlurScreen>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={state.link}
          style={{ fontSize: 24 }}
          onClick={() => State.update({ link: null })}
        >
          Open link
        </a>
      </BlurScreen>
    )}
  </Page>
);
