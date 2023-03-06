State.init({ link: null });

if (context.accountId == null) {
  return <h2 style={{ width: "100%", textAlign: "center" }}>Sign in please</h2>;
}

return (
  <div
    style={{
      width: "100%",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    }}
  >
    <iframe
      style={{ width: "100%", height: 800 }}
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
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.3",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={state.link}
          style={{ fontSize: 24 }}
          onClick={() => State.update({ link: null })}
        >
          Open link
        </a>
      </div>
    )}
  </div>
);
