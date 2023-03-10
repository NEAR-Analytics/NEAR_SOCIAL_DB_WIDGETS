let initialText = "";
const indexerName = props.indexerName;
const registry_contract_id =
  props.registry_contract_id || "registry.queryapi.near";
let accountId = props.accountId || context.accountId;
let base = props.base ?? "query-api-editor";
const labelStrings = props.labels ?? [];
const labels = labelStrings.map((s) => {
  return { name: s };
});

State.init({
  // Should be a list of objects with field "name".
  labels: labels,
  // Should be a list of labels as strings.
  // Both of the label structures should be modified together.
  labelStrings: labelStrings,
  name: "",
  description: "",
});

const normalizeLabel = (label) =>
  label
    .replaceAll(/[- \.]/g, "_")
    .replaceAll(/[^\w]+/g, "")
    .replaceAll(/_+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase()
    .trim("-");

const setLabels = (labels) => {
  labels = labels.map((o) => {
    o.name = normalizeLabel(o.name);
    return o;
  });
  let labelStrings = labels.map((o) => {
    return o.name;
  });
  State.update({ labels, labelStrings });
};
const existingLabelStrings =
  Near.view(nearDevGovGigsContractAccountId, "get_all_labels") ?? [];
const existingLabels = existingLabelStrings.map((s) => {
  return { name: s };
});
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
      schema: data.schema,
      metadata: {
        name: state.name,
        labels: state.labelStrings,
        description: state.description,
      },
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
const code = `  <script>
   let iframe = null;

  function createIframe(base, accountId, indexerName) {
    iframe = document.createElement('iframe');
    iframe.src = 'https://query-api-react.vercel.app';
    // iframe.src = 'http://localhost:3000';

    if (base) {
      console.log("added base")
      iframe.src += base;
    }
    if (accountId != undefined && indexerName != undefined) {
      iframe.src += "?accountId=${accountId}&indexerName=${indexerName}"
      
      } else if (accountId != undefined ){
      iframe.src += "?accountId=${accountId}"
      }
       iframe.style.height = '750px';
      iframe.style.border = "none"
      iframe.style.overflow = "hidden"
      iframe.name = "react-app"
    iframe.id = "react-app-iframe"
    iframe.style.width = '100%';
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
const labelEditor = (
  <div className="col-lg-12  mb-2">
    Labels:
    <Typeahead
      multiple
      labelKey="name"
      onChange={setLabels}
      options={existingLabels}
      placeholder="DeFi, NearSocial, Protocol"
      selected={state.labels}
      positionFixed
      allowNew
    />
  </div>
);

const nameDiv = (
  <div className="col-lg-6  mb-2">
    Name:
    <input
      type="text"
      value={state.name}
      onChange={(event) => State.update({ name: event.target.value })}
    />
  </div>
);

const descriptionDiv = (
  <div className="col-lg-12  mb-2">
    Description:
    <br />
    <textarea
      value={state.description}
      type="text"
      rows={2}
      className="form-control"
      onChange={(event) => State.update({ description: event.target.value })}
    />
  </div>
);
const mode = "Indexer Metadata";
return (
  <div>
    {props.base === "create-new-indexer" && (
      <div className="card">
        <div className="card-header">{mode}</div>
        <div class="card-body">
          <div className="row">
            {labelEditor}
            {nameDiv}
            {descriptionDiv}
          </div>

          <a className="btn btn-outline-primary mb-2" onClick={onClick}>
            Submit
          </a>
        </div>
      </div>
    )}
    <iframe
      name="widget-iframe"
      className="w-100"
      style={{ height: "750px", width: "100%" }}
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
