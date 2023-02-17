let initialText = "";
const indexer_function_name = props.indexer_name;
const registry_contract_id =
  props.registry_contract_id || "registry.queryapi.near";
let accountId = props.accountId || context.accountId;
State.init({
  code: initialText,
});

if (!accountId) {
  return "Please sign in to use this widget.";
}

Near.asyncView(registry_contract_id, "read_indexer_function", {
  name: `${accountId}/${indexer_function_name}`,
}).then((data) => {
  if (!data) return;
  console.log(data, "data loaded", `${accountId}/${indexer_function_name}`);
  State.update({ code: data });
});

let updateIndexerCode = (code) => {
  const gas = 200000000000000;

  Near.call(
    contractId,
    "register_indexer_function",
    {
      name: indexer_function_name,
      code: code,
    },
    gas
  );
};

const reducer = (message) => {
  switch (message.action) {
    case "register_function":
      updateIndexerCode(message.value);
      break;

    case "initial_load":
      State.update({ code: message.value });
      break;

    case "default":
      console.log("default case");
  }
};
const code = `
<script>
function test(data) {
  let receiverWindow = document.getElementById("react-app-iframe").contentWindow
  if (!receiverWindow) {
      console.warn("receiver window not found!!!!")
  }
  console.log(receiverWindow, "receiverrrr")
  // try {
  //     if (event.data.action === "send_indexer_details") {
  //       console.log("trying to send the data to react app")
  //         receiverWindow.postMessage({
  //             action: "subscription_request",
  //             data: data
  //         }, "*")
  //     }
  // } catch (error) {
  //     console.log(error, "errored out")
  // }
  console.log("reached here")
window.addEventListener("message", function(event) {
  console.log("received a message")
  console.log(event)
  // console.log("message came from :", event.source.name)
  if (event.data.action === "register_function") {
      window.top.postMessage(event.data, "*");
  }
  if (event.data.action === "request_indexer_details") {
      event.source.postMessage({
          action: "subscription_request",
          from: "iframe", 
          data: data
      }, "*")
  }
})
}
</script>
<iframe name="react-app" id="react-app-iframe" src="http://localhost:3000/query-api-editor" width="1250px" height="500px"></iframe>

<script>
window.addEventListener("message", function(event){
    console.log(event, "event detaisl")
    try {
      if(event.data.action ==="send_indexer_details") {
        console.log("sender-indexer details")
        test(event.data)
      }
  
    // let receiverWindow = document.getElementById("react-app-iframe").contentWindow
    // console.log(receiverWindow, "receiverWindow")
    // receiverWindow.postMessage({action: "subscription", data: event.data}, "*");
    }
    catch(error){
        console.log(error, "we errored out")
    }

})
</script>
`;

return (
  <div>
    <iframe
      name="widget-iframe"
      className="w-100"
      style={{ height: "500px" }}
      srcDoc={code}
      message={{
        action: "send_indexer_details",
        value: {
          indexer_name: indexer_function_name,
          accountId: accountId,
        },
        from: "widget",
      }}
      onMessage={(message) => reducer(message)}
    />
  </div>
);
