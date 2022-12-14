const accountId = props.accountId;

// State.init({ badges: [] });

if (!accountId) {
  return "No account ID";
}

const badges = Social.getr(`${accountId}/badges/*`);

if (!badges) {
  return "Loading";
}

console.log(Object.values(badges));

return (
  <div className="container row">
    <div>
      {Object.values(badges).map((badge) => {
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

    <div className="mb-2">
      <CommitButton
        data={{
          badges: {
            whale: {
              info: {
                name: "Whale",
                description: "A really whalethy user",
                image: {
                  url: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Southern_right_whale.jpg",
                },
              },
              holder: {
                [accountId]: "",
              },
            },
          },
        }}
      >
        Get that badge
      </CommitButton>
    </div>
  </div>
);
