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
      width: "100%",
      height: "100%",
      opacity: 0.8,
      backgroundColor: "grey",
    }}
  >
    <div className="card" style={{ opacity: 1 }}>
      <div className="card-header">Verification score for {state.query}</div>
      {isNaN(state.result) ? (
        <>
          <div>There is no entry for this query</div>
          <a
            href={`https://near.social/#/v3rify.near/widget/Submit?${state.query}`}
          >
            Submit a verification
          </a>
        </>
      ) : (
        <div className="card-body">
          The verification score is: {state.result}
        </div>
      )}
    </div>
  </div>
) : null;

return (
  <div style={{ height: "80vh" }}>
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
            ).then((result) => {
              console.log(result);
              State.update({ result, show: true });
            })
          }
        >
          Check
        </a>
      </div>
    </div>
    {result}
  </div>
);
