const { idePreview } = props;
const { code, config, props: p } = idePreview;
if (typeof code !== "string") {
  throw { message: "No code supplied to perview" };
}
if (code.trim() === "") {
  throw { message: "Preview code is empty" };
}

return <Widget code={code} props={p || {}} config={config || {}} />;
