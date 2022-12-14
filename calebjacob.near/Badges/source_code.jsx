const accountId = props.accountId;

if (!accountId) {
  return "No account ID";
}

let queries = [];
const yourBadgesQuery = Social.keys(`*/badge/*/holder/${accountId}`, "final");

if (!yourBadgesQuery) {
  return "Loading";
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
      <div style={{ marginTop: "2rem" }}>
        <CommitButton
          data={{
            badge: {
              goldStar: {
                info: {
                  name: "Gold Star",
                  description: "A cool gold star",
                  image: {
                    url: "https://png.pngitem.com/pimgs/s/111-1112079_hollywood-star-png-gold-star-png-small-transparent.png",
                  },
                },
                holder: {
                  [accountId]: "",
                },
              },
              silverMedal: {
                info: {
                  name: "Silver Medal",
                  description: "A cool silver medal",
                  image: {
                    url: "https://png.pngtree.com/png-vector/20191212/ourmid/pngtree-second-place-silver-medal-for-sport-podium-winner-png-image_2050419.jpg",
                  },
                },
                holder: {
                  [accountId]: "",
                },
              },
              goldenBoot: {
                info: {
                  name: "Golden Boot",
                  description: "A cool golden boot",
                  image: {
                    url: "https://www.aljazeera.com/wp-content/uploads/2022/12/000_DV885236.jpg?resize=1920%2C1440",
                  },
                },
                holder: {
                  [accountId]: "",
                },
              },
              apple: {
                info: {
                  name: "Apple",
                  description: "A cool apple",
                  image: {
                    url: "https://png.pngtree.com/element_our/png/20181129/vector-illustration-of-fresh-red-apple-with-single-leaf-png_248312.jpg",
                  },
                },
                holder: {
                  [accountId]: "",
                },
              },
            },
          }}
        >
          Get Demo Badges
        </CommitButton>
      </div>
    )}
  </div>
);
