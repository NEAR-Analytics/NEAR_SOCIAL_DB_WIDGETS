const [accountId, widget, widgetName] = props.src.split("/");
const metadata = Social.get(
  `${accountId}/widget/${widgetName}/metadata/**`,
  "final"
);

const tags = Object.keys(metadata.tags || {});

const detailsUrl = `#/near/widget/ComponentDetailsPage?src=${accountId}/widget/${widgetName}`;
const appUrl = `#/${accountId}/widget/${widgetName}`;
const accountUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;

const Card = styled.div`
  position: relative;
  display:block;
  overflow: hidden;
width: 350px;
background: radial-gradient(88.1% 88.1% at 49.7% 100%, #5B8088 0%, #091518 100%);
border-radius: 16px;
padding: 16px;
`;

const CardBody = styled.div`
  display: flex;
  gap: 13px;
  align-items: center;
  overflow: hidden;
  justify-center: center
  > * {
    min-width: 0;
  }
`;

const CardContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction:column

`;

const TextLink = styled.div`

  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  cursor:pointer;

  color: #FFFFFF;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: nowrap;

  i {
    margin-right: 3px;
  }
`;

const Thumbnail = styled.a`
  display: block;
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  border-radius: 26px;
  overflow: hidden;
  outline: none;
  display:flex;
  margin:auto;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const TagsWrapper = styled.div`
  margin-top: 4px;
  display: flex;
  
`;

const Tag = styled.div`
    box-sizing: border-box;
    background: rgba(26, 46, 51, 0.25);
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    border-radius: 38px;
    color: #FFFFFF;
    font-weight: 500;
    font-size: 12px;
    text-center;
    display:flex;
    align-items:center;
    justify-center: center;
    margin-right: 5px;
    padding: 1px 11px 1px 11px;
    white-space: nowrap;

`;

const FooterIcon = styled.div`
  width: 16px;
height: 16px;
  flex-shrink: 0;
  overflow: hidden;
  outline: none;
  display:flex;
  margin-right: 4px;

border-radius: 100%;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

return (
  <Card>
    <CardBody>
      <Thumbnail href={detailsUrl}>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: metadata.image,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreifc4burlk35hxom3klq4mysmslfirj7slueenbj7ddwg7pc6ixomu",
            alt: metadata.name,
          }}
        />
      </Thumbnail>

      <CardContent>
        <TextLink href={detailsUrl}>{metadata.name || widgetName}</TextLink>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FooterIcon>
            {" "}
            <Widget
              src="mob.near/widget/Image"
              props={{
                image: metadata.image,
                fallbackUrl:
                  "https://ipfs.near.social/ipfs/bafkreifc4burlk35hxom3klq4mysmslfirj7slueenbj7ddwg7pc6ixomu",
                alt: metadata.name,
              }}
            />
          </FooterIcon>

          <TextLink href={accountUrl}>{accountId}</TextLink>
        </div>

        <TagsWrapper>
          {tags.length > 0 &&
            tags.map((t) => {
              return <Tag>{t}</Tag>;
            })}
        </TagsWrapper>
      </CardContent>
    </CardBody>
  </Card>
);
