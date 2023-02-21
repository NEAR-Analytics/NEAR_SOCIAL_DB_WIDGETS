const accountId = props.accountId;
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");

const Wrapper = styled.a`
  --avatar-size: 24px;
  position: relative;
  padding-left: ${props.hideAvatar ? "0" : "calc(var(--avatar-size) + 6px)}"};
  display: inline-flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  margin: 0;
  color: #11181C !important;
  outline: none;
  text-decoration: none;
  max-width: 100%;
  white-space: normal;

  > * {
    min-width: 0;
  }

  &:hover,
  &:focus {
    text-decoration: underline;

    div:first-child {
      border-color: #D0D5DD;
    }
  }
`;

const Text = styled.span`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  font-size: 14px;
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
`;

const Avatar = styled.div`
  width: var(--avatar-size);
  height: var(--avatar-size);
  position: absolute;
  left: 0;
  right: 0;
  flex-shrink: 0;
  border: 1px solid #ECEEF0;
  overflow: hidden;
  border-radius: 24px;
  transition: border-color 200ms;

  img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;

const AccountProfile = (
  <Wrapper
    href={`/#/calebjacob.near/widget/ProfilePage?accountId=${accountId}`}
  >
    {!props.hideAvatar && (
      <Avatar>
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
    )}

    <Text ellipsis>{profile.name || accountId.split(".near")[0]}</Text>
  </Wrapper>
);

if (props.noOverlay) return AccountProfile;

return (
  <Widget
    src="calebjacob.near/widget/AccountProfileOverlay"
    props={{
      accountId: props.accountId,
      profile,
      children: AccountProfile,
      inline: true,
    }}
  />
);
