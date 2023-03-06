State.init({ link: null });

if (context.accountId == null) {
  return null;
}

return (
  <div style={{ width: 480, height: 700, position: "relative" }}>
    <iframe
      style={{ width: 480, height: 700 }}
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
