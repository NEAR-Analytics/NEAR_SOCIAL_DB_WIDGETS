const initialText = props.initialText ?? "# Hello World\n\n";

const code = `
<script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=770e5b96-533a-4b0c-a0f4-519d2f459535"> </script>
`;

return <iframe className="w-100 h-100" srcDoc={code} message={initialText} />;
