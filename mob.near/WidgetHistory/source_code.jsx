const src = props.src ?? "mob.near/widget/WidgetSource";

const code = Social.get(src);
let history = Social.keys(src, "final", {
  return_type: "History",
});
if (history === null || code === null) {
  return "Loading";
}
src.split("/").forEach((key) => {
  history = history[key];
});

const text = `
### ${src}

\`\`\`jsx
${code}
\`\`\`
`;

return (
  <>
    <Markdown text={text} />
    {history &&
      history
        .reverse()
        .slice(1)
        .map((blockHeight, i) => {
          const oldSrc = `${src}@${blockHeight}`;
          const newSrc = `${src}@${history[i]}`;
          return (
            <div className="mb-3">
              <h4>{oldSrc}</h4>
              <Widget
                src="mob.near/widget/ValueDiff"
                props={{
                  newSrc,
                  oldSrc,
                }}
              />
            </div>
          );
        })}
  </>
);
