State.init({ text: "" });

const stateUpdate = props.stateUpdate;

return (
  <input
    className="form-control mt-2"
    value={state.articleId}
    onBlur={() => stateUpdate({ articleId: state.text })}
    onChange={(e) => {
      State.update({
        text: e.target.value.replace(/\s+/g, ""),
      });
    }}
  />
);
