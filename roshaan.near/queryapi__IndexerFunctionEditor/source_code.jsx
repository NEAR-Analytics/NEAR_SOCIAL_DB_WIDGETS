const initialText = '';
State.init({
  m: initialText,
});

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
