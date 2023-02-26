/*
---props---
props.widgetPath?: string,
*/

const initWidgetPath = props.widgetPath || "devgovgigs.near/widget/Ideas";

State.init({
  widgetPath: initWidgetPath,
});

// === START ===
const handler = () => {
  const articlePath = "devgovgigs.near/widget/Ideas";
  const historyBlocksRequest = Social.keys(`${articlePath}`, "final", {
    return_type: "History",
  });
  console.log("historyBlocksRequest", historyBlocksRequest);

  const articlePath2 = "eugenewolf507.near/wikiTest2Article/main";
  const historyBlocksRequest2 = Social.keys(`${articlePath2}`, "final", {
    return_type: "History",
  });
  console.log("historyBlocksRequest2", historyBlocksRequest2);
};
// === END ===

return (
  <div>
    {/* === START === */}
    <button onClick={handler}>GET DATA (delete thos button)</button>
    {/* === END === */}
    <h1 class="text-center">Widget History</h1>

    <div class="input-group mb-3">
      <input
        class="form-control"
        placeholder={initWidgetPath}
        defaultValue={state.widgetPath || initWidgetPath}
        onBlur={(e) => {
          State.update({
            widgetPath: e.target.value,
          });
        }}
      />
    </div>

    <Widget
      src={`bozon.near/widget/WidgetHistory.History`}
      props={{
        widgetPath: state.widgetPath,
      }}
    />
  </div>
);
