const [accountId, widget, widgetName] = props.src.split("/");
const metadata = Social.get(
  `${accountId}/widget/${widgetName}/metadata/**`,
  "final"
);
const tags = Object.keys(metadata.tags || {});
const detailsUrl = `/#/components/${accountId}/widget/${widgetName}/details`;
const appUrl = `/#/components/${accountId}/widget/${widgetName}`;
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
//   height: 100%;

  border: 1px ${props.theme.borderColor} solid;
  border-radius: 4px;

  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  position: relative;

  background-color: ${props.theme.backgroundColor};
`;
const TopSection = styled.div`
  width: 100%;
  height:100%;
  display: flex;
  flex-direction:column;
  align-items: flex-start;
  justify-content: flex-start;

`;

const Logo = styled.div`
  width: 100%;
  max-width: 100px;
  height:100px;
  aspect-ratio: 1 / 1;

  border-radius: 4px;
//   border-bottom: 1px ${props.theme.borderColor} solid;
  overflow: hidden;
  zindex: 9;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: ${props.theme.buttonColor};
  color: ${props.theme.buttonTextColor};
  width: 100%;
  height: 40px;
  outline:none;
  transition: all .2s ease-in-out;

  border: none;
  font-weight: 600;
  border-radius: 4px;

  &:hover{
    background-color: ${props.theme.buttonColor}CC;
    outline:none;
    border:none;
  }
  
  &:active{
    background-color: ${props.theme.buttonColor}99;
  }
`;

return (
  <MainContainer>
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

    <TopSection>
      <a
        href={detailsUrl}
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: props.theme.textColor,
          textDecoration: "none",
          textAlign: "canter",

          wordBreak: "break-all",
          textAlign: "center",
        }}
      >
        {metadata.name || widgetName}
      </a>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
          gap: 8,
        }}
      >
        <a
          href={detailsUrl}
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: props.theme.textColor3,
            textDecoration: "none",
            padding: 0,
            margin: 0,
          }}
        >
          @{accountId} •
        </a>
        <Widget
          src="saidulbadhon.near/widget/SearchPage.ComponentItem.TimeAgo"
          props={{
            blockHeight: props.blockHeight,
            keyPath: `${accountId}/widget/${widgetName}`,
            style: {
              color: props.theme.textColor3,
              margin: 0,
              fontSize: 14,
              fontWeight: 600,
            },
            theme: props.theme,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",

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
      <a href={detailsUrl}>
        <Button
          style={
            {
              // backgroundColor: props.theme.buttonColor + 33,
            }
          }
        >
          <i class="bi bi-eye"></i>
          {/*View Details*/}
        </Button>
      </a>
      <a href={appUrl}>
        <Button
          style={{
            // backgroundColor: props.theme.buttonColor,
            color: props.theme.buttonTextColor,
            border: "none",
            fontWeight: 600,
            borderRadius: 4,
          }}
        >
          <i class="bi bi-box-arrow-up-right"></i>
          {/*Open*/}
        </Button>
      </a>
    </BottomSection>
  </MainContainer>
);
