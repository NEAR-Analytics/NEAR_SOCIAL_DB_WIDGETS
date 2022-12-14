const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const data = Social.get(`${accountId}/graph/widget/*`, "final");

const widgets = data ? Object.entries(data) : [];
const wrappedWidgets = [];
const maxIndex = -1;
for (let i = 0; i < widgets.length; ++i) {
  const index = widgets[i][0];
  maxIndex = Math.max(maxIndex, index);
  const src = widgets[i][1];
  wrappedWidgets.push(
    <tr border="1">
      <td>{index}</td>
      <td>
        <a href={`#/${src}`}>
          <i>{src}</i>
        </a>
      </td>
    </tr>
  );
}

State.init({ new_widget: "", next_index: maxIndex + 1, remove_index: 0 });

return (
  <div>
    <div className="mb-2">
      <h4>Add widget by relative link</h4>
      <input
        type="text"
        className="form-control"
        placeholder="mob.near/widget/Welcome"
        onChange={(e) => State.update({ new_widget: e.target.value })}
      />
    </div>
    <CommitButton
      data={{ graph: { widget: { [state.next_index]: state.new_widget } } }}
      onClick={(e) => State.update({ next_index: state.next_index + 1 })}
    >
      Save
    </CommitButton>

    <div className="mb-2">
      <h4>Remove widget by index</h4>
      <input
        type="text"
        className="form-control"
        placeholder="0"
        onChange={(e) => State.update({ remove_index: e.target.value })}
      />
    </div>
    <CommitButton data={{ graph: { widget: { [state.remove_index]: null } } }}>
      Remove
    </CommitButton>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Index</th>
          <th scope="col">Link</th>
        </tr>
      </thead>
      <tbody>{wrappedWidgets}</tbody>
    </table>
    <br />
  </div>
);
