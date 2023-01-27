initState({
  authorities: props.authorities
    ? props.authorities.split(",").map((accountId) => ({
        accountId,
      }))
    : [],
});

return (
  <div className="card">
    <div className="card-body">
      <label htmlFor="search">
        Authorities to add (a comma separated list of account IDs):
      </label>
      <Typeahead
        id="authorities"
        labelKey="accountId"
        placeholder="v3rify.near"
        selected={state.authorities}
        onChange={(authorities) => State.update({ authorities })}
        options={[]}
        multiple
        allowNew
        positionFixed
      />

      <a
        role="button"
        className="btn btn-primary mt-2"
        onClick={() =>
          Near.call(
            "v3rify.near",
            "add_authorities",
            {
              authorities: state.authorities.map(({ accountId }) => accountId),
            },
            "30000000000000",
            "1"
          )
        }
      >
        Add
      </a>
    </div>
  </div>
);
