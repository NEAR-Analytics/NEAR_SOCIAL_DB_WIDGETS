const { idePreview } = props;
const { code, config, props: p } = idePreview;
if (typeof code !== "string") {
  throw {
    message: "No code supplied to perview. Props: " + JSON.stringify(props),
  };
}
if (code.trim() === "") {
  throw { message: "Preview code is empty. Props: " + JSON.stringify(props) };
}

return <Widget code={code} props={p || {}} config={config || {}} />;
