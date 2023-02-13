const initialText = '# Hello World\n\n';
State.init({
  m: initialText,
});

const code = `
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>

<div id="root">
</div>
<script >
function TestReact(props) {
  const [value, setValue] = React.useState(props.initialText || "");
  React.useEffect(() => {
    // Add a listener for messages from other sources
    window.addEventListener("message", handleMessage);

    return () => {
      // Clean up the listener when the component unmounts
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleMessage = (event) => {
    // Handle incoming messages
    console.log("Received message:", event.data);
    // Forward the message to the parent window
    window.top.postMessage(event.data, "*");
  };
  return React.createElement("iframe", {
    src:"http://localhost:3000/query-api-editor",
    height: "750px",
    width: "750px",
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
  <div>
    <iframe
      className="w-100"
      style={{ height: '300px' }}
      srcDoc={code}
      message={initialText}
      onMessage={(m) => console.log(m, 'near social for the win')}
    />
    <Markdown text={state.m} />
  </div>
);
