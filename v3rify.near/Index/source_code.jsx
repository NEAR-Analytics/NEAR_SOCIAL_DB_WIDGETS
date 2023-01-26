initState({
  query: props.query ?? "",
  result: 0,
  show: false,
});

const result = state.show ? (
  <div
    style={{
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      left: 0,
      top: 0,
      width: "100vw",
      height: "100vh",
      opacity: 0.8,
      backgroundColor: "grey",
    }}
  >
    <div className="card">
      <div className="card-header">Verification score for {state.query}</div>
      <div className="card-body">The verification score is: {state.result}</div>
    </div>
  </div>
) : null;

return (
  <div className="card">
    <div className="card-body">
      <label htmlFor="search">Check:</label>
      <input
        type="text"
        role="search"
        id="search"
        placeholder="near.org"
        value={state.query}
        onChange={(e) => State.update({ query: e.target.value })}
      />

      <a
        role="button"
        className="btn btn-primary mt-2"
        // href={`https://near.social/#/v3rify.near/widget/Index?query=${state.query}`}
        onClick={() =>
          Near.asyncView(
            "v3rify.near",
            "get_verification",
            { entry_id: state.query },
            "final"
          ).then((result) => State.update({ result, show: true }))
        }
      >
        Check
      </a>
    </div>
    {result}
  </div>
);
