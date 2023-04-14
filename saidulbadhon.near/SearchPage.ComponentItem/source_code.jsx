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

  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  position: relative;
  padding: 8px 8px;

  background-color: ${props.theme.backgroundColor};
  &:hover{
    background-color: ${props.theme.ui2};
    outline:none;
    border:none;
  }
`;

const TopSection = styled.div`
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Logo = styled.div`
  width: 75px;
  min-width:75px;
  height:75px;
  aspect-ratio: 1 / 1;

  border-radius: 4px;
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
  gap: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: ${props.theme.buttonColor}66;
  color: ${props.theme.buttonTextColor};
  width: 100%;
  height:30px;
  width:30px;
  outline:none;
  transition: all .2s ease-in-out;

  border: none;
  font-weight: 600;
  border-radius: 4px;

  &:hover{
    background-color: ${props.theme.buttonColor}33;
    outline:none;
    border:none;
  }
  
  &:active{
    background-color: ${props.theme.buttonColor}44;
  }
`;
const Button2 = styled.button`
  background-color: ${props.theme.buttonColor};
  color: ${props.theme.buttonTextColor};
  width: 100%;
  height: 30px;
  width: 30px;
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
          fontSize: 14,
          fontWeight: 600,
          color: props.theme.textColor,
          textDecoration: "none",

          wordBreak: "break-all",
          textAlign: "left",
        }}
      >
        {metadata.name || widgetName}
      </a>

      <a
        href={detailsUrl}
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: props.theme.textColor3,
          textDecoration: "none",
          padding: 0,
          margin: 0,
          wordBreak: "break-all",
          textAlign: "left",
        }}
      >
        @{accountId}
      </a>

      <Widget
        src="saidulbadhon.near/widget/SearchPage.ComponentItem.TimeAgo"
        props={{
          blockHeight: props.blockHeight,
          keyPath: `${accountId}/widget/${widgetName}`,
          style: {
            color: props.theme.textColor3,
            margin: 0,
            fontSize: 11,
            fontWeight: 400,
          },
          theme: props.theme,
        }}
      />

      {tags.length > 0 && tags.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            marginTop: 8,

            justifyContent: "flex-start",
          }}
        >
          {tags.map((tag, index) => (
            <p
              style={{
                marginBottom: 0,
                backgroundColor:
                  props.theme.name === "dark"
                    ? "rgba(255,255,255,.075)"
                    : "rgba(0,0,0,.075)",
                color: props.theme.textColor,
                padding: "4px 8px",
                fontWeight: 500,
                borderRadius: 4,
                fontSize: 12,
              }}
            >
              {makeUpperCase(tag)}
            </p>
          ))}
        </div>
      )}
    </TopSection>

    <BottomSection>
      <a href={detailsUrl}>
        <Button>
          <i class="bi bi-eye"></i>
          {/*View Details*/}
        </Button>
      </a>
      <a href={appUrl}>
        <Button2>
          <i class="bi bi-box-arrow-up-right"></i>
          {/*Open*/}
        </Button2>
      </a>
    </BottomSection>
  </MainContainer>
);
