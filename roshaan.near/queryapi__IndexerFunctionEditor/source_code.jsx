//props indexer_name
let indexer_name = props.indexer_name;

const initialText = '# Hello World\n\n';
State.init({
  m: initialText,
});

const code = `
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/react-markdown-editor-lite@1.3.4/lib/index.js" crossorigin></script>
<link rel="stylesheet" href="https://unpkg.com/react-markdown-editor-lite@1.3.4/lib/index.css" />

<style>
#text-editor {
  border: 1px solid red;
}
#react-root {
  border: 1px solid blue;
}
</style>
<div id="root">
<h1> code editor </h1>
<div id="code-editor">
code editor </div>
<h1> text editor </h1>

<div id="text-editor">
text editor
</div>
</div>
<script type="module">
import ReactMarkdownEditorLite from "https://esm.sh/react-markdown-editor-lite@1.3.4"
import Editor from "https://esm.sh/@monaco-editor/react@4.4.6"
function TestReact(props) {
  const [value, setValue] = React.useState(props.initialText || "");
  return React.createElement(ReactMarkdownEditorLite, {
      value,
      view: { menu: true, md: true, html: false },
      canView: { menu: true, md: false, html: false, fullScreen: false, hideMenu: true },
      onChange: ({ text }) => {
        setValue(text);
        window.top.postMessage(text, "*");
      },
      renderHTML: () => {},
      className: "full",
    }); 
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);

window.addEventListener("message", (event) => {
  root.render(React.createElement(TestReact, {
    initialText: event.data,
  }));
   
});

</script>
`;
return (
  <>
    <Widget
      src={'roshaan.near/widget/queryapi__RegisterIndexerFunctionButton'}
    />
  </>
);

function TestReact(props) {
  const [value, setValue] = React.useState(props.initialText || '');
  return React.createElement(ReactMarkdownEditorLite, {
    value,
    view: { menu: true, md: true, html: false },
    canView: {
      menu: true,
      md: false,
      html: false,
      fullScreen: false,
      hideMenu: true,
    },
    onChange: ({ text }) => {
      setValue(text);
      window.top.postMessage(text, '*');
    },
    renderHTML: () => {},
    className: 'full',
  });
}
