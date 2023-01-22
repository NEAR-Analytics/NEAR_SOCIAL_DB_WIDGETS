const initWidgetPath = "devgovgigs.near/widget/Ideas";

State.init({
  widgetPath: initWidgetPath,
  code: "",
});

const widgetCode = Social.get(state.widgetPath);

if (widgetCode === null) return "loading...";

const [widgetAccountId, _, widgetName] = state.widgetPath.split("/");

function getDatastringFromBlockHeight(blockHeight) {
  const block = Near.block(blockHeight);
  const date = new Date(block.header.timestamp_nanosec / 1e6);
  return date.toDateString() + " " + date.toLocaleTimeString();
}

return (
  <div>
    <h1 class="text-center">Create Pull Request</h1>

    <input
      class="form-control mb-3"
      placeholder="path to widget"
      defaultValue={state.widgetPath || initWidgetPath}
      onBlur={(e) => {
        State.update({
          widgetPath: e.target.value,
        });
      }}
    />

    {widgetCode ? (
      <div>
        <textarea
          class="form-control mb-3"
          placeholder="code"
          onBlur={(e) => {
            State.update({
              code: e.target.value,
            });
          }}
        />
        <Widget
          src={`bozon.near/widget/CodeDiff`}
          props={{
            currentCode: state.code,
            prevCode: widgetCode,
          }}
        />
      </div>
    ) : (
      <div>Widget not found</div>
    )}
  </div>
);
