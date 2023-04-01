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
  zIndex: 9;
      
  img {
     aspect-ratio: 1 / 1;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

function capitalizeWordsAndHyphens(str) {
  return str.replace(/(^|\s|-)\S/g, function (match) {
    return match.toUpperCase();
  });
}

return (
  <div
    style={{
      // maxWidth: 300,
      width: "100%",
      height: "100%",

      border: `1px ${props.theme.borderColor} solid`,
      borderRadius: 8,

      display: "flex",
      flexDirection: "column",
      gap: 8,
      justifyContent: "center",
      alignItems: "center",

      backgroundColor: props.theme.ui,
      position: "relative",
    }}
  >
    <div
      style={{
        color: props.theme.textColor2,
        display: "flex",
        gap: 4,
        justifyContent: "center",
        padding: " 4px 8px",
        borderRadius: 4,

        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: props.theme.ui2,

        zIndex: 10,
      }}
    >
      <i className="bi bi-clock"></i>{" "}
      <Widget
        src="saidulbadhon.near/widget/SearchPage.ComponentItem.TimeAgo"
        props={{
          blockHeight: props.blockHeight,
          keyPath: `${accountId}/widget/${widgetName}`,
          style: { color: props.theme.textColor2, margin: 0 },
        }}
      />
      ago
    </div>

    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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

      <a
        href={detailsUrl}
        style={{
          marginTop: 16,
          fontSize: 20,
          fontWeight: 600,
          color: props.theme.textColor,
          textDecoration: "none",
          textAlign: "canter",

          paddingInline: 8,
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
          marginBottom: 8,
          paddingInline: 8,
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
                fontSize: 12,
              }}
            >
              {capitalizeWordsAndHyphens(tag)}
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
