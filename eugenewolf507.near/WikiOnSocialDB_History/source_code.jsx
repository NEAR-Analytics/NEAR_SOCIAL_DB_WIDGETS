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
  // ============ WIDGETS
  const widgetPath = "devgovgigs.near/widget/Ideas";

  const historyBlocksRequestKeysWidgets = Social.keys(
    `${widgetPath}`,
    "final",
    {
      return_type: "History",
    }
  );
  const historyBlocksRequestGetWidgets = Social.get(`${widgetPath}`, "final");

  console.log(
    "historyBlocksRequestKeysWidgets",
    historyBlocksRequestKeysWidgets
  );
  console.log("historyBlocksRequestGetWidgets", historyBlocksRequestGetWidgets);

  // ============ ARTICLES
  const articlePath = "eugenewolf507.near/wikiTest2Article/main";

  const historyBlocksRequestKeysArticles = Social.keys(
    `${articlePath}`,
    "final",
    {
      return_type: "History",
    }
  );
  // console.log("historyBlocksRequestKeysArticles", historyBlocksRequestKeysArticles);
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
