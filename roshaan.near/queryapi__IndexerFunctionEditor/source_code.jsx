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
<script src="https://unpkg.com/@monaco-editor/react@4.4.6/lib/umd/monaco-react.min.js " crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

<link rel="stylesheet" href="https://unpkg.com/react-markdown-editor-lite@1.3.4/lib/index.css" />

<div id="editor-window"></div>

<div id="react-root"></div>

<script type="text/babel">
      class App extends React.Component {
        render() {

          return (<div>
            <h1>React Setup</h1>
          </div>);
        }
      }
      ReactDOM.render(
        <App />,
        document.getElementById('root')
      );
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
