const computeResults = (term) => {
  const searchTerm = term.toLowerCase();
  State.update({
    searchTerm,
  });

  if (props.onChange) {
    props.onChange({ searchTerm });
  }
};

return (
  <>
    <input
      type="text"
      className="form-control"
      value={state.term ?? ""}
      onChange={(e) => computeResults(e.target.value)}
      placeholder={props.placeholder ?? `🔍 Search Components`}
    />
    {props.debug && <pre>{JSON.stringify(state.result, undefined, 2)}</pre>}
  </>
);
