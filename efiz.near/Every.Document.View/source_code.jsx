"[\"efiz.near/thing/0.5072631191373673\",\"efiz.near/thing/0.2610492566021896\"]";
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
