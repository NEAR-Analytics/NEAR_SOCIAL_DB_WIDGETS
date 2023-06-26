State.init({ text: props.firstText });

const stateUpdate = props.stateUpdate;
const filterText = props.filterText;

return (
  <input
    className="form-control mt-2"
    value={state.text}
    onBlur={() => stateUpdate({ articleId: state.text })}
    onChange={(e) => {
      State.update({
        text: filterText(e),
      });
    }}
  />
);
