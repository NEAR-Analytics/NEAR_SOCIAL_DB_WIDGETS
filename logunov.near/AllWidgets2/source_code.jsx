const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const data = Social.get(`${accountId}/graph/widget/*`, "final");

if (!data) {
  return "Loading";
}

const widgets = Object.entries(data);
const wrappedWidgets = [];
for (let i = 0; i < widgets.length; ++i) {
  const widget_src = widgets[i];
  wrappedWidgets.push(
    <div>
      <li>
        <a href={`#/${widget_src}`}>{<i>{widget_src}</i>}</a>
      </li>
    </div>
  );
}

State.init({ new_widget: "" });

return (
  <div>
    <div>{accountId}</div>
    <div>{wrappedWidgets}</div>
    <div className="mb-2">
      <h4>Add favourite widget</h4>
      <textarea
        type="text"
        rows={1}
        className="form-control"
        value={state.note}
        onChange={(e) => State.update({ new_widget: e.target.value })}
      />
    </div>
    <CommitButton data={{ graph: { widget: { [state.new_widget]: "" } } }}>
      Save widget
    </CommitButton>
    <CommitButton data={{ graph: { widget: { [state.new_widget]: null } } }}>
      Remove widget
    </CommitButton>
  </div>
);
