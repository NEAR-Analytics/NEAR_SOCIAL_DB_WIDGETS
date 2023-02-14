const initialText = '# Hello World from widget\n\n';
State.init({
  m: initialText,
});

const code = `
<div id="root"></div>
<iframe id="react-app-iframe" onload="test()" src="http://localhost:3000/query-api-editor" width="750px" height="750px"></iframe>

<script>
function test() {
let receiverWindow = document.getElementById("react-app-iframe").contentWindow

window.addEventListener("message", function(event){
     window.top.postMessage(event.data, "*");
     console.log("mesage received2!", event.data)
});
}
</script>
`;

return (
  <div>
    <iframe
      className="w-100"
      style={{ height: '300px' }}
      srcDoc={code}
      message={initialText}
      onMessage={(m) => State.update({ m })}
    />
    <Markdown text={state.m} />
    <Widget
      src={'roshaan.near/widget/queryapi__RegisterIndexerFunctionButton'}
      props={{ indexer_name: 'roshaan', indexer_code: state.m }}
    />
  </div>
);
