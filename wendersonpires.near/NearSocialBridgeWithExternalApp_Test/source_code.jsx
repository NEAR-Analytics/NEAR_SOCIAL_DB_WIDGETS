State.init({
  externalAppMessage: "",
});

const accountId = props.accountId ?? context.accountId ?? "*";
const profileInfo = props.profile ?? Social.getr(`${accountId}/profile`);

const code = `
<div>Expression: <pre id="exp" /></div>
<div>Results: <pre id="res" /></div>

<script>
    window.top.postMessage({type: "history-push-state", payload: { path: "?r=/home" }}, "*");
    // window.history.pushState({}, "", "?r=/home");
    // window.top.postMessage("loaded", "*");
    // window.addEventListener("message", (event) => {
    //     const data = event.data
    //     document.getElementById("exp").innerHTML = JSON.stringify(data);
    //     try {
    //         const result = eval(data.exp);
    //         document.getElementById("res").innerHTML = result;
    //         event.source.postMessage(result, "*");
    //     } catch (e) {
    //         // ignore
    //     }
    // }, false);
</script>
`;

console.log("Props", props);

window.history.pushState({}, "Page 2", "/page3.html");

const historyPushState = (newUrlState) => {
  //   console.log(window.parent);
};

const processMessage = (message) => {
  if (message.type === "history-push-state") {
    historyPushState(message.payload.path);
  }
};

return (
  <div>
    <iframe
      className="w-50 border"
      srcDoc={code}
      message={{ exp: state.text || "" }}
      onMessage={(res1) => processMessage(res1)}
    />
  </div>
);

return (
  <div>
    <iframe
      className="w-100"
      style={{ height: "600px" }}
      // My external app
      src="https://satori-hq.github.io/near-social-bridge-temp/"
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
