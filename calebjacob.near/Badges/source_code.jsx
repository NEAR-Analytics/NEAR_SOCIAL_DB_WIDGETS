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
  <div className="container">
    <div className="d-flex gap-2 flex-wrap">
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
        Get that badge
      </CommitButton>
    </div>
  </div>
);
