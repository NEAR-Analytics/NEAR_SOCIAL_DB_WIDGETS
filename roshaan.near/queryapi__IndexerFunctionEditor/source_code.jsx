let initialText = "";
const indexer_function_name = props.indexer_name;
const registry_contract_id =
  props.registry_contract_id || "registry.queryapi.near";
let accountId = context.accountId;
State.init({
  m: initialText,
});

if (!accountId) {
  return "Please sign in to use this widget.";
}

let queryIndexerCode = () => {
  return Near.asyncView(registry_contract_id, "read_indexer_function", {
    name: indexer_function_name,
  });
};
queryIndexerCode().then((data) => {
  if (!data) return;
  console.log(data, "data");
  State.update({ m: data });
});

const code = `
<iframe id="react-app-iframe" onload="test()" src="http://localhost:3001/query-api-editor" width="1250px" height="500px"></iframe>
<script>
function test() {
let receiverWindow = document.getElementById("react-app-iframe").contentWindow
window.addEventListener("message", function(event){
     window.top.postMessage(event.data, "*");
});
}
</script>
`;

return (
  <div>
    <iframe
      className="w-100"
      style={{ height: "500px" }}
      srcDoc={code}
      message={stae.m}
      onMessage={(m) => State.update({ m })}
    />
    <Widget
      src={"roshaan.near/widget/queryapi__RegisterIndexerFunctionButton"}
      props={{
        indexer_name: indexer_function_name,
        indexer_code: state.m,
      }}
    />
  </div>
);
