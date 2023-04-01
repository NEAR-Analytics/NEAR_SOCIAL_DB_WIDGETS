const [accountId, widget, widgetName] = props.src.split("/");
const metadata = Social.get(
  `${accountId}/widget/${widgetName}/metadata/**`,
  "final"
);
const tags = Object.keys(metadata.tags || {});
const detailsUrl = `/#/adminalpha.near/widget/ComponentDetailsPage?src=${accountId}/widget/${widgetName}`;
const appUrl = `/#/${accountId}/widget/${widgetName}`;
const accountUrl = `/#/adminalpha.near/widget/ProfilePage?accountId=${accountId}`;

function makeUpperCase(sentence) {
  let words = sentence.split(/[\s-]+/); // split on spaces or hyphens
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    if (words[i].includes("-")) {
      // capitalize after hyphen
      let hyphenIndex = words[i].indexOf("-");
      words[i] =
        words[i].substr(0, hyphenIndex + 1) +
        words[i][hyphenIndex + 1].toUpperCase() +
        words[i].substr(hyphenIndex + 2);
    }
  }
  return words.join(" ");
}

const MainContainer = styled.div`
  width: 100%;
  height: 100%;

  border: 1px ${props.theme.borderColor} solid;
  borderradius: 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;
  justifycontent: space-between;
  alignitems: center;

  backgroundcolor: ${props.theme.ui};
`;
const TopSection = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeAgoContainer = styled.div`
  color: ${props.theme.textColor2};
  display: flex;
  gap: 4px;
  justifycontent: center;
  padding: 4px 8px;
  borderradius: 4px;

  position: absolute;
  top: 8px;
  right: 8px;
  backgroundcolor: ${props.theme.ui2};

  zindex: 10;
`;

const Logo = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;

  border-radius: 8px;
  overflow: hidden;
  zindex: 9;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const BottomSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px;
  width: calc(100% - 32px);
  box-sizing: border-box;
`;

{
  /* <TimeAgoContainer>
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
</TimeAgoContainer> */
}

return (
  <MainContainer>
    <TopSection>
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
              {makeUpperCase(tag)}
            </p>
          ))}
      </div>
    </TopSection>

    <BottomSection>
      <button href={detailsUrl}>View Details</button>
      <button href={appUrl} primary>
        Open
      </button>
    </BottomSection>
  </MainContainer>
);
