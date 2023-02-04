const initSearchText = props.searchText;
const data = props.data;
const debug = props.debug;
const minLength = props.minLength;
const placeholder = props.placeholder ?? "Search";
const searchTermKey = props.searchTermKey; // search term key on data item

initState({
  data,
  searchText: initSearchText,
  result: data,
  placeholder,
});

const handleSearch = (_search) => {
  const _result =
    !_search || _search.length < minLength
      ? state.data
      : state.data.filter(
          (item) =>
            item[searchTermKey].toLowerCase().indexOf(_search.toLowerCase()) !==
            -1
        );

  State.update({
    result: _result,
    searchText: _search,
  });

  if (props.onChange) {
    props.onChange({ searchText, result: _result });
  }
};

return (
  <>
    <div className="input-group">
      <input
        type="text"
        className={`form-control ${state.searchText ? "border-end-0" : ""}`}
        value={state.searchText}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={"🔍 " + state.placeholder}
      />

      {state.searchText && (
        <button
          className="btn btn-outline-secondary border border-start-0"
          type="button"
          onClick={() => handleSearch()}
        >
          <i className="bi bi-x"></i>
        </button>
      )}
    </div>
    {debug && <pre>{JSON.stringify(state.result, undefined, 2)}</pre>}
  </>
);
