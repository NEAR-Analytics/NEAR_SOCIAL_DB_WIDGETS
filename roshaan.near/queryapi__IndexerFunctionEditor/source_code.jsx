let initialText = "";
const indexerName = props.indexerName;
const registry_contract_id =
  props.registry_contract_id || "registry.queryapi.near";
let accountId = props.accountId || context.accountId;
let base = props.base ?? "query-api-editor";
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
  console.log(data, "dataaa");
  Near.call(
    registry_contract_id,
    "register_indexer_function",
    {
      function_name: data.indexerName || indexerName,
      code: data.code,
      start_block_height: data.startBlockHeight,
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

  function createIframe(base, accountId, indexerName) {
    console.log(accountId, "account ID")
    console.log(indexerName, "indexerName ID")
    console.log(base, "base")
    iframe = document.createElement('iframe');
    iframe.src = 'https://query-api-react.vercel.app';
    if (base) {
      console.log("added base")
      iframe.src += base;
    }
    if (accountId != undefined && indexerName != undefined) {
      iframe.src += "?accountId=${accountId}&indexerName=${indexerName}"
    iframe.style.height = '500px';
    } else if (accountId != undefined ){
      iframe.src += "?accountId=${accountId}"
      iframe.style.height = '370px';
    }
    iframe.name = "react-app"
    iframe.id = "react-app-iframe"
    iframe.style.width = '1250px';

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
      createIframe(event.data.value.base, event.data.value.accountId, event.data.value.indexerName);
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
          base,
        },
        from: "widget",
      }}
      onMessage={(message) => reducer(message)}
    />
  </div>
);
