let initialText = "";
const indexerName = props.indexerName;
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
  name: `${accountId}/${indexerName}`,
}).then((data) => {
  if (!data) return;
  console.log(data, "data loaded", `${accountId}/${indexerName}`);
  State.update({ code: data });
});

let updateIndexerCode = (data) => {
  const gas = 200000000000000;

  Near.call(
    registry_contract_id,
    "register_indexer_function",
    {
      name: data.indexer_name || indexerName,
      code: data.code,
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
   let iframe = null;

  function createIframe(accountId, indexerName) {
    console.log(accountId, "account ID")
    console.log(indexerName, "indexerName ID")

    iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:3002/query-api-editor';
    if (accountId != undefined && indexerName != undefined) {
      console.log("indexer name exists")
      iframe.src += "?accountId=${accountId}&indexerName=${indexerName}"
    } else {
      console.log("does not exist")
    }
    iframe.name = "react-app"
    iframe.id = "react-app-iframe"
    iframe.style.width = '1250px';
    iframe.style.height = '500px';

    document.body.appendChild(iframe);
  }

  window.addEventListener('message', function (event) {
      if (event.data.action === "register_function") {
        console.log("registering")
        window.top.postMessage(event.data, "*");
      }
    if (event.data.action === 'createIframe') {
     
      // Check if the iframe element already exists

      if (iframe) {
        // The iframe already exists, do nothing
        return;
      }
      createIframe(event.data.value.accountId, event.data.value.indexerName);
    }
  });
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
        action: "createIframe",
        value: {
          indexerName: indexerName,
          accountId: accountId,
        },
        from: "widget",
      }}
      onMessage={(message) => reducer(message)}
    />
  </div>
);
