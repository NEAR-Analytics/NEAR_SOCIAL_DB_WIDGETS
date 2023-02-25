State.init({
  widgetPath: "",
});

return (
  <div>
    <input
      onChange={(e) => State.update({ widgetPath: e.target.value })}
      class="form-control mb-3"
    ></input>
    <Widget
      src="bozon.near/widget/Widget.Main"
      props={{ widgetPath: state.widgetPath }}
    />
  </div>
);
