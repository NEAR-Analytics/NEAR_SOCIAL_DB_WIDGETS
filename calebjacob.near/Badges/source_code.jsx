const accountId = props.accountId || context.accountId;

State.init({ giveBadgeAccountId: "" });

if (!accountId) {
  return <p>No account ID.</p>;
}

let queries = [];
const yourBadgesQuery = Social.keys(`*/badge/*/holder/${accountId}`, "final");

if (!yourBadgesQuery) {
  return <p>Loading...</p>;
}

Object.entries(yourBadgesQuery).forEach(([badgeAccountId, contractData]) => {
  Object.entries(contractData.badge).forEach(([badgeId, badgeData]) => {
    const query = Social.getr(`${badgeAccountId}/badge/${badgeId}`);
    queries.push(query);
  });
});

return (
  <div className="container">
    <div className="d-flex gap-2 flex-wrap">
      {queries.map((badge) => {
        return (
          <div className="card overflow-hidden" style={{ width: "15rem" }}>
            <img
              style={{
                objectFit: "cover",
                objectPosition: "center",
                height: "15rem",
                width: "15rem",
              }}
              src={badge.info.image.url}
              alt={badge.info.name}
              title={badge.info.description}
            />
            <div className="card-body">
              <h5 className="card-title">{badge.info.name}</h5>
              <p className="card-text">{badge.info.description}</p>
            </div>
          </div>
        );
      })}
    </div>

    {props.devMode && (
      <div
        class="d-flex flex-row"
        style={{ marginTop: "2rem", gap: "1rem", whiteSpace: "nowrap" }}
      >
        <input
          className="form-control"
          type="text"
          placeholder="Account Address"
          value={state.giveBadgeAccountId}
          onChange={(e) => {
            const accountId = e.target.value
              .toLowerCase()
              .replace(/[^a-z0-9_.-]/g, "");
            State.update({ giveBadgeAccountId: accountId });
          }}
        />

        <CommitButton
          data={{
            badge: {
              brownie: {
                info: {
                  name: "Brownie",
                  description: "A cool brownie",
                  image: {
                    url: "https://www.inspiredtaste.net/wp-content/uploads/2016/06/Brownies-Recipe-1-1200.jpg",
                  },
                },
                holder: {
                  [state.giveBadgeAccountId]: "",
                },
              },
            },
          }}
        >
          Give Badge
        </CommitButton>
      </div>
    )}
  </div>
);
