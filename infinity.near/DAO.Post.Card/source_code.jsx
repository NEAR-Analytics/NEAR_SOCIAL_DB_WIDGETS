const accountId = props.accountId ?? "infinity.near";

const profile = Social.get(`${accountId}/profile/**`, "final");

const posts = Social.get(`${accountId}/post/main`, "final");
const discussionUrl = `#/hack.near/widget/DAO.Post?accountId=${accountId}&blockHeight=${blockHeight}`;

const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");
const subscribe = !!props.subscribe;
const raw = !!props.raw;

const accountUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;

const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
`;

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;

  > * {
    min-width: 0;
  }
`;

const CardContent = styled.div`
  width: 100%;
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
  display: block;
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
  border-radius: 100px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: ${(p) => (p.primary ? "#006ADC" : "#11181C")} !important;
  background: #fbfcfd;
  white-space: nowrap;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }
`;

return (
  <Card>
    <CardBody>
      <Thumbnail href={profileUrl}>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.image,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreifc4burlk35hxom3klq4mysmslfirj7slueenbj7ddwg7pc6ixomu",
          }}
        />
      </Thumbnail>

      <CardContent>
        <TextLink small as="a" href={profileUrl} ellipsis>
          {profile.name}
        </TextLink>
        <TextLink small as="a" href={profileUrl} ellipsis>
          @{accountId}
        </TextLink>
      </CardContent>
    </CardBody>

    <CardFooter>
      <ButtonLink href={discussionUrl} primary>
        Open Discussion
      </ButtonLink>
    </CardFooter>
  </Card>
);
