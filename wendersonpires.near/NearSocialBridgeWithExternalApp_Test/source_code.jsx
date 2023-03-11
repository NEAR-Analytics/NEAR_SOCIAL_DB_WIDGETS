State.init({
  externalAppMessage: "",
});

const accountId = props.accountId ?? context.accountId ?? "*";
const profileInfo = props.profile ?? Social.getr(`${accountId}/profile`);

return (
  <div>
    <iframe
      className="w-100"
      style={{ height: "600px" }}
      // My external app
      src="https://satori-hq.github.io/near-social-bridge-temp"
      // Data the Near Social View is going to send to my External App
      message={{
        accountId,
        ipfsCidAvatar: profileInfo.image?.ipfs_cid,
        msg: "Hello from Near Social View :D",
      }}
      // When my external app send a message back to the NS View
      onMessage={(m) => {
        State.update({ externalAppMessage: m });
      }}
    />
    <p>
      <strong>Message received from the External App: </strong>
      {state.externalAppMessage || "waiting..."}
    </p>
  </div>
);
