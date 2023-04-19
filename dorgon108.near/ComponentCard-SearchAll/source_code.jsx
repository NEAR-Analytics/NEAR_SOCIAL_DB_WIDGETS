const [accountId, widget, widgetName] = props.src.split("/");
const metadata = Social.get(
  `${accountId}/widget/${widgetName}/metadata/**`,
  "final"
);
const tags = Object.keys(metadata.tags || {});
const detailsUrl = `/#/adminalpha.near/widget/ComponentDetailsPage?src=${accountId}/widget/${widgetName}`;
const appUrl = `/#/${accountId}/widget/${widgetName}`;
const accountUrl = `/#/adminalpha.near/widget/ProfilePage?accountId=${accountId}`;
const onPointerUp =
  props.onClick ??
  ((event) => {
    if (props.debug) {
      console.log("click", event);
    }
  });

const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eceef0;
box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  width: 408px;
height: 88px;
`;

// Update the CardBody styled component
const CardBody = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

// Update the CardContent styled component
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

// Create a new styled component for the middle column
const MiddleColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #eceef0;
`;

const CardTag = styled.p`
  margin: 0;
  font-size: 9px;
  line-height: 14px;
  background: #eceef0;
  color: #687076;
  font-weight: 400;
  white-space: nowrap;
  position: absolute;
  top: 0;
  right: 0;
  border-bottom-left-radius: 3px;
  padding: 0 4px;

  i {
    margin-right: 3px;
  }
`;

const TextLink = styled.a`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 18px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;

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
  display: flex;
  align-items: center;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border: 1px solid #eceef0;
  border-radius: 8px;
  overflow: hidden;
  outline: none;
  transition: border-color 200ms;

  &:focus,
  &:hover {
    border-color: #d0d5dd;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const TagsWrapper = styled.div`
  position: relative;
  margin-top: 4px;
`;

const ButtonLink = styled.a`
  padding: 8px;
  height: 32px;
  border: 1px solid #d7dbdf;
  border-radius: 16px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #006ADC !important;
  background: #FAFAFA;
  white-space: nowrap;

  &:hover,
  &:focus {
    background: #E6E8EB; // Adjust the hover color to a slightly darker shade
    text-decoration: none;
    outline: none;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

return (
  <Card>
    <CardBody>
      <Thumbnail href={detailsUrl} onPointerUp={onPointerUp}>
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

      <MiddleColumn style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        <TextLink
          as="a"
          href={detailsUrl}
          onPointerUp={onPointerUp}
          bold
          ellipsis
        >
          {metadata.name || widgetName}
        </TextLink>
        <TextLink
          small
          as="a"
          href={accountUrl}
          onPointerUp={onPointerUp}
          ellipsis
        >
          @{accountId}
        </TextLink>
        {tags.length > 0 && (
          <TagsWrapper>
            <Widget
              src="adminalpha.near/widget/Tags"
              props={{
                tags,
                scroll: true,
              }}
            />
          </TagsWrapper>
        )}{" "}
      </MiddleColumn>

      <ButtonWrapper>
        <ButtonLink href={detailsUrl} onPointerUp={onPointerUp}>
          Details
        </ButtonLink>
      </ButtonWrapper>
    </CardBody>
  </Card>
);
