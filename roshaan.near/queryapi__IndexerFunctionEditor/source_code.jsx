let initialText = '';
const indexer_function_name = props.indexer_function_name;
const registry_contract_id =
  props.registry_contract_id || 'registry.queryapi.testnet';
let accountId = context.accountId;
State.init({
  m: initialText,
});
if (!accountId) {
  return 'Please sign in to use this widget.';
}

let QueryIndexerCode = () => {
  Near.view(registry_contract_id, 'register_indexer_function', {
    name: indexer_function_name,
  });
};
let loadIndexerCode = QueryIndexerCode();
if (loadIndexerCode !== undefined) {
  state.update({ m: loadIndexerCode });
  initialText = loadIndexerCode;
}

const code = `
<iframe id="react-app-iframe" onload="test()" src="https://query-api-react.vercel.app/query-api-editor" width="1250px" height="500px"></iframe>
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
      style={{ height: '500px' }}
      srcDoc={code}
      message={initialText}
      onMessage={(m) => State.update({ m })}
    />
    <Widget
      src={'roshaan.near/widget/queryapi__RegisterIndexerFunctionButton'}
      props={{
        indexer_name: 'registry.queryapi.testnet',
        indexer_code: state.m,
      }}
    />
  </div>
);
