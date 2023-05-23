const data = props.data;
const blockHeight = props.blockHeight || "final";

const blocks = JSON.parse(data);

return (
  <>
    {blocks?.map((it) => (
      <Widget
        src={"efiz.near/widget/Every.Thing.View"}
        props={{ path: it, blockHeight }}
      />
    ))}
  </>
);
