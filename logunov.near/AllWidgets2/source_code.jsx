const data = Social.keys("${props.accountId}/graph/widgets/*", "final");

if (!data) {
  return "Loading";
}

const widgets = Object.entries(data);

for (let i = 0; i < widgets.length; ++i) {
  const widget_src = widgets[i][0];
  const widgets = [];
  widgets.push(
    <div>
      <li>
        <a href={`#/${widget_src}`}>{<i>Noname widget</i>}</a>
      </li>
    </div>
  );
}

State.init({ new_widget: "" });

return (
  <div>
    <div>{widgets}</div>
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
    <CommitButton data={{ graph: { widgets: { [state.new_widget]: "" } } }}>
      Save widget
    </CommitButton>
  </div>
);
