/*
---props---
props.widgetPath?: string,
*/
const authorForWidget = "eugenewolf507.near";
const initWidgetPath = props.widgetPath || "devgovgigs.near/widget/Ideas";

State.init({
  widgetPath: initWidgetPath,
});

return (
  <div>
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
      src={`${authorForWidget}/widget/WikiOnSocialDB_History.History`}
      props={{
        widgetPath: state.widgetPath,
      }}
    />
  </div>
);
