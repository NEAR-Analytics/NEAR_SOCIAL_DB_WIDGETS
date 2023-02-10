//props indexer_name
let indexer_name = props.indexer_name;

const initialText = '# Hello World\n\n';
State.init({
  m: initialText,
});

const code = `
<link rel="stylesheet" data-name="vs/editor/editor.main" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/editor/editor.main.min.css">
<div id="container" style="height:400px;border:1px solid black;"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs/loader.min.js"></script>
<script>
// require is provided by loader.min.js.
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});
require(["vs/editor/editor.main"], () => {
  monaco.editor.create(document.getElementById('container'), {
    value: \`function x() {
  console.log("Hello world!");
}\`,
    language: 'javascript',
    theme: 'vs-dark',
  });

window.top.postMessage(monaco.editor.getModels()[0], "*"); 
});

</script>
`;

return (
  <>
    <div>
      <iframe
        className="w-100"
        style={{ height: '300px' }}
        srcDoc={code}
        message={initialText}
        onMessage={(m) => console.log(m, 'yo')}
      />
    </div>
    <Markdown text={state.m} />
    <Widget
      src={'roshaan.near/widget/queryapi__RegisterIndexerFunctionButton'}
    />
  </>
);
