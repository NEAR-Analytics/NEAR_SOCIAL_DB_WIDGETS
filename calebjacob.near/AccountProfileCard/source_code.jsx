const accountId = props.accountId;
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
const tags = Object.keys(profile.tags || {});
const profileUrl = `/#/calebjacob.near/widget/ProfilePage?accountId=${accountId}`;

State.init({
  show: false,
});

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 12px;
  width: 100%;
  border-radius: 12px;
  z-index: 1070;
  background: #fff;
  border: 1px solid #ECEEF0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 12px;
`;

const CardTop = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  min-width: 0;

  > div {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    min-width: 0;
  }
`;

const Name = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  width: 100%;
  min-width: 0;
`;

const Avatar = styled.a`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border: 1px solid #ECEEF0;
  overflow: hidden;
  border-radius: 56px;
  transition: border-color 200ms;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &:hover,
  &:focus {
    border-color: #D0D5DD;
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
  max-width: ${(p) => (p.max ? "10rem" : "")};

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const FollowButtonWrapper = styled.div`
  width: 100%;
  
  div, button {
    width: 100%;
  }
`;

return (
  <Card>
    <CardTop>
      <Avatar href={profileUrl}>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.image,
            alt: profile.name,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
      </Avatar>

      <div>
        <Name>
          <TextLink href={profileUrl} ellipsis bold>
            {profile.name || accountId.split(".near")[0]}
          </TextLink>
          <TextLink href={profileUrl} ellipsis max>
            @{accountId}
          </TextLink>
        </Name>

        <Widget
          src="calebjacob.near/widget/Tags"
          props={{ tags, scroll: true }}
        />
      </div>
    </CardTop>

    {!!context.accountId && context.accountId !== props.accountId && (
      <FollowButtonWrapper>
        <Widget
          src="calebjacob.near/widget/FollowButton"
          props={{ accountId: props.accountId }}
        />
      </FollowButtonWrapper>
    )}
  </Card>
);
