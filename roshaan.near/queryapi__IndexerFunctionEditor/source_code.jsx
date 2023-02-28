let initialText = "";
const indexerName = props.indexerName;
const registry_contract_id =
  props.registry_contract_id || "registry.queryapi.near";
let accountId = props.accountId || context.accountId;
let base = props.base ?? "query-api-editor";

if (!accountId) {
  return "Please sign in to use this widget.";
}

let updateIndexerCode = (data) => {
  const gas = 200000000000000;
  Near.call(
    registry_contract_id,
    "register_indexer_function",
    {
      function_name: data.indexerName || indexerName,
      code: data.code,
      start_block_height: data.startBlockHeight,
      schema: data.schema,
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
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.container {
 max-width: 800px;
}

.iframe-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
    <script>
   let iframe = null;

  function createIframe(base, accountId, indexerName) {
    console.log(accountId, "account ID")
    console.log(indexerName, "indexerName ID")
    console.log(base, "base")
    iframe = document.createElement('iframe');
    iframe.src = 'https://query-api-react.vercel.app';
        // iframe.src = 'http://localhost:3000';

    if (base) {
      console.log("added base")
      iframe.src += base;
    }
    if(base.includes("create-new-indexer")) {
       iframe.style.height = '1000px';
    } else if(base.includes("query-api-editor")) {
      iframe.style.height = '500px';
    }

    if (accountId != undefined && indexerName != undefined) {
      iframe.src += "?accountId=${accountId}&indexerName=${indexerName}"
    } else if (accountId != undefined ){
      iframe.src += "?accountId=${accountId}"

    }
    iframe.name = "react-app"
    iframe.id = "react-app-iframe"
    iframe.style.width = '1250px';
    // iframe.class = "responsive-iframe";
    // iframe.allowFullScreen="true";
    // iframe_wrapper = document.createElement("div");

    // iframe_wrapper.class = "iframe-wrapper";
    // container_div = document.createElement("div");
    // container_div.class = "container";

    // iframe_wrapper.appendChild(iframe);
    // container_div.appendChild(iframe_wrapper)
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
