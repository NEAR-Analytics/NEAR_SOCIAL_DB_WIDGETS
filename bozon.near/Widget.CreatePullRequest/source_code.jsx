/*

onClose(): function

*/

const initWidgetPath = "devgovgigs.near/widget/Ideas";

State.init({
  widgetPath: initWidgetPath,
  code: "",
  memo: "",
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
    <div className="card">
      <div className="card-header d-flex align-items-center justify-content-between">
        Create Pull Request<button onClick={() => props.onClose()}>X</button>
      </div>

      <div class="card-body">
        <div className="row">
          <div className="col-lg-12  mb-2">
            Widget path:
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
            Code:
            <textarea
              type="text"
              rows={6}
              class="form-control"
              placeholder="code"
              onBlur={(e) => {
                State.update({
                  code: e.target.value,
                });
              }}
            />
            Memo:
            <textarea
              type="text"
              rows={2}
              class="form-control"
              placeholder="code"
              onBlur={(e) => {
                State.update({
                  memo,
                });
              }}
            />
          </div>
        </div>

        <button
          onClick={onClick}
          class={`btn btn-primary`}
          disabled={widgetCode === undefined}
        >
          {widgetCode ? "Submit" : "Widget not found"}
        </button>
      </div>
      <div class="card-footer">
        Preview:
        <Widget
          src={`bozon.near/widget/CodeDiff`}
          props={{
            currentCode: state.code,
            prevCode: widgetCode,
          }}
        />
      </div>
    </div>
  </div>
);
