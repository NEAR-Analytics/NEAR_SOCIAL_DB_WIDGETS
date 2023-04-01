const [accountId, widget, widgetName] = props.src.split("/");
const metadata = Social.get(
  `${accountId}/widget/${widgetName}/metadata/**`,
  "final"
);
// const tags = Object.keys(metadata.tags || {});
const detailsUrl = `/#/adminalpha.near/widget/ComponentDetailsPage?src=${accountId}/widget/${widgetName}`;
const appUrl = `/#/${accountId}/widget/${widgetName}`;
const accountUrl = `/#/adminalpha.near/widget/ProfilePage?accountId=${accountId}`;

const Logo = styled.a`
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const tags = [
  "Reprehenderit",
  "do",
  "aliqua",
  "proident",
  "amet",
  "velit",
  "in",
  "reprehenderit",
  "mollit",
  "minim",
];

return (
  <div
    style={{
      maxWidth: 300,

      border: `1px ${props.theme.borderColor} solid`,
      borderRadius: 8,

      display: "flex",
      flexDirection: "column",
      gap: 8,
      justifyContent: "center",
      alignItems: "center",

      backgroundColor: props.theme.ui,
    }}
  >
    {/*
      <div>
        <i className="bi bi-clock"></i>{" "}
        <Widget
          src="mob.near/widget/TimeAgo"
          props={{
            blockHeight: props.blockHeight,
            keyPath: `${accountId}/widget/${widgetName}`,
          }}
        />
        ago
      </div>
    */}

    <Logo>
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: metadata.image,
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreifc4burlk35hxom3klq4mysmslfirj7slueenbj7ddwg7pc6ixomu",
          alt: metadata.name,
        }}
      />
    </Logo>

    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <a
        href={detailsUrl}
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: props.theme.textColor,
          textDecoration: "none",
        }}
      >
        {metadata.name || widgetName}
      </a>

      <a
        href={detailsUrl}
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: props.theme.textColor3,
          textDecoration: "none",
        }}
      >
        @{accountId}
      </a>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginTop: 8,
          padding: "0 16px",

          justifyContent: "center",
        }}
      >
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <p
              style={{
                marginBottom: 0,
                backgroundColor:
                  props.theme.name === "dark"
                    ? "rgba(255,255,255,.075)"
                    : "rgba(0,0,0,.075)",
                color: props.theme.textColor,
                padding: "4px 8px",
                borderRadius: 4,
              }}
            >
              {tag}
            </p>
          ))}
      </div>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        margin: 16,
        width: "calc(100% - 32px)",
        boxSizing: "border-box",
      }}
    >
      <button href={detailsUrl}>View Details</button>
      <button href={appUrl} primary>
        Open
      </button>
    </div>
  </div>
);
