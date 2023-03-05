const code = `
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/@uiw/react-textarea-code-editor@2.1.1/dist/editor.min.js" crossorigin></script>
<link rel="stylesheet" href="https://unpkg.com/@uiw/react-textarea-code-editor@2.1.1/dist/editor.min.css" />


<div id="react-root"></div>

<script>
const CodeEditor = window["@uiw/react-textarea-code-editor"].default;

function App(props) {
  return React.createElement(CodeEditor, {
    "padding": 15,
    "data-color-mode": "light", 
    "language": "js",
    "style": {
      "fontSize": 14,
      "backgroundColor": "#f5f5f5",
      "fontFamily":
        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
    },
    ...props,
  }); 
}

const domContainer = document.querySelector('#react-root');
const root = ReactDOM.createRoot(domContainer);

window.addEventListener("message", (event) => {
  root.render(React.createElement(App, event.props));
});

</script>
`;

return (
  <div>
    <iframe className="w-100" srcDoc={code} message={props} />
  </div>
);
