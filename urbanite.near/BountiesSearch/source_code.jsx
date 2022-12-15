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
      value={state.searchTerm ?? ""}
      onChange={(e) => computeResults(e.target.value)}
      placeholder={props.placeholder ?? `🔍 Search Components`}
    />
    {props.debug && <pre>{JSON.stringify(state.searchTerm, undefined, 2)}</pre>}
  </>
);
