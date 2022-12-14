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
    <br />
    <div className="mb-2">
      <h4>Add widget</h4>
      <input
        type="text"
        className="form-control"
        placeholder="mob.near/widget/Welcome"
        onChange={(e) => State.update({ new_widget: e.target.value })}
      />
    </div>
    <CommitButton
      data={{ graph: { widget: { [widgets.length]: state.new_widget } } }}
    >
      Save
    </CommitButton>
    <br />
    <div className="mb-2">
      <h4>Remove widget</h4>
      <input
        type="text"
        className="form-control"
        placeholder="0"
        onChange={(e) => State.update({ new_widget: e.target.value })}
      />
    </div>
    <CommitButton
      data={{ graph: { widget: { [widgets.length]: state.new_widget } } }}
    >
      Save
    </CommitButton>
  </div>
);
