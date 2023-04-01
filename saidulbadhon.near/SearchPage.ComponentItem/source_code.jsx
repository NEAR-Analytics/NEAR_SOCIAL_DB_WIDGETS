const [accountId, widget, widgetName] = props.src.split("/");
const metadata = Social.get(
  `${accountId}/widget/${widgetName}/metadata/**`,
  "final"
);
const tags = Object.keys(metadata.tags || {});
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

return (
  <div
    style={{
      border: `1px ${props.theme.borderColor} solid`,
      borderRadius: 8,

      display: "flex",
      flexDirection: "column",
      gap: 8,
      justifyContent: "center",
      alignItems: "center",

      backgroundColor: props.theme.backgroundColor,
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
        style={{ fontSize: 20, fontWeight: 600, color: props.theme.textColor }}
      >
        {metadata.name || widgetName}
      </a>

      <a
        href={detailsUrl}
        style={{ fontSize: 14, fontWeight: 400, color: props.theme.textColor3 }}
      >
        @{accountId}
      </a>

      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <p
              style={{
                backgroundColor: props.theme.ui,
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

    <div>
      <button href={detailsUrl}>View Details</button>
      <button href={appUrl} primary>
        Open
      </button>
    </div>
  </div>
);
