State.init({
  widgetPath: "bozon.near/widget/WidgetHistory.CodeHistory",
});

return (
  <div>
    <input
      value={state.widgetPath}
      onChange={(e) => State.update({ widgetPath: e.target.value })}
      class="form-control mb-3"
    ></input>
    <Widget
      src="bozon.near/widget/Widget.Main"
      props={{ widgetPath: state.widgetPath }}
    />
  </div>
);
