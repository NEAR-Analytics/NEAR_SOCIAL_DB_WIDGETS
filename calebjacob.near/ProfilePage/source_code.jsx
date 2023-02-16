const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

// Profile Data:
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const tags = Object.keys(profile.tags || {});
const viewingOwnAccount = accountId === context.accountId;
const shareUrl = `https://alpha.near.org/#/calebjacob.near/widget/ProfilePage?accountId=${accountId}`;

// Follower Count:
const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
const followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
const followingCount = following
  ? Object.keys(following[accountId].graph.follow || {}).length
  : null;
const followersCount = followers ? Object.keys(followers || {}).length : null;

// Account follows you:
const accountFollowsYouData = Social.keys(
  `${props.accountId}/graph/follow/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);
const accountFollowsYou = Object.keys(accountFollowsYouData || {}).length > 0;

const Wrapper = styled.div``;

const Main = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 352px  minmax(0, 1fr);
`;

const BackgroundImage = styled.div`
  height: 240px;
  width: 100%;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  margin: 0 -12px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Sidebar = styled.div`
  display: grid;
  gap: 40px;
  position: relative;
  z-index: 5;
  margin-top: -55px;
`;

const SidebarSection = styled.div`
  display: grid;
  gap: 24px;
`;

const Avatar = styled.div`
  width: 133px;
  height: 133px;
  flex-shrink: 0;
  border: 3px solid #fff;
  overflow: hidden;
  border-radius: 100%;
  box-shadow: 0px 12px 16px rgba(16, 24, 40, 0.08), 0px 4px 6px rgba(16, 24, 40, 0.03);

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  color: #11181C;
  margin: 0;
  overflow-wrap: anywhere;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181C;
  }
`;

const TextBadge = styled.p`
  display: inline-block;
  margin: 0;
  font-size: 10px;
  line-height: 1.1rem;
  background: #687076;
  color: #fff;
  font-weight: 600;
  white-space: nowrap;
  padding: 0 6px;
  border-radius: 3px;
`;

const sharedButtonStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  height: 32px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  background: #FBFCFD;
  border: 1px solid #D7DBDF;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
  }

  i {
    color: #7E868C;
  }

  .bi-16 {
    font-size: 16px;
  }
`;

const Button = styled.button`
  color: ${(p) => (p.primary ? "#006ADC" : "#11181C")} !important;
  width: ${(p) => (p.primary ? "100%" : "auto")};
  ${sharedButtonStyles}
`;

const ButtonLink = styled.a`
  color: ${(p) => (p.primary ? "#006ADC" : "#11181C")} !important;
  width: ${(p) => (p.primary ? "100%" : "auto")};
  ${sharedButtonStyles}
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
`;

const Stats = styled.div`
  display: flex;
  gap: 24px;
`;

const FollowButtonWrapper = styled.div`
  width: 100%;
`;

console.log(profile);

if (profile === null) {
  return "Loading";
}

return (
  <Wrapper>
    <BackgroundImage>
      {profile.backgroundImage && (
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.backgroundImage,
            alt: "profile background image",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
      )}
    </BackgroundImage>

    <Main>
      <Sidebar>
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

        <SidebarSection>
          <div>
            <Title>{profile.name || accountId}</Title>
            <Text>@{accountId}</Text>

            {accountFollowsYou && <TextBadge>Follows You</TextBadge>}
          </div>

          <Actions>
            {viewingOwnAccount ? (
              <ButtonLink href="/#/mob.near/widget/ProfileEditor" primary>
                Edit Profile
              </ButtonLink>
            ) : context.accountId ? (
              <>
                <FollowButtonWrapper>
                  <Widget
                    src="calebjacob.near/widget/FollowButton"
                    props={{
                      accountId,
                    }}
                  />
                </FollowButtonWrapper>

                <Button type="button">
                  <i className="bi bi-hand-index-thumb"></i> Poke
                </Button>
              </>
            ) : (
              <></>
            )}

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Copy URL to clipboard</Tooltip>}
            >
              <Button
                type="button"
                onMouseLeave={() => {
                  State.update({ copiedShareUrl: false });
                }}
                onClick={() => {
                  clipboard.writeText(shareUrl).then(() => {
                    State.update({ copiedShareUrl: true });
                  });
                }}
              >
                {state.copiedShareUrl ? (
                  <i className="bi-16 bi bi-check"></i>
                ) : (
                  <i className="bi-16 bi-link-45deg"></i>
                )}
                Share
              </Button>
            </OverlayTrigger>
          </Actions>
        </SidebarSection>

        {tags.length > 0 && (
          <SidebarSection>
            <Widget
              src="calebjacob.near/widget/ComponentTags"
              props={{
                tags,
              }}
            />
          </SidebarSection>
        )}

        <SidebarSection>
          <Stats>
            <Text>
              <b bold as="span">
                {followingCount === null ? "--" : followingCount}
              </b>{" "}
              Following
            </Text>
            <Text>
              <b>{followersCount === null ? "--" : followersCount}</b> Followers
            </Text>
          </Stats>
        </SidebarSection>
      </Sidebar>
    </Main>
  </Wrapper>
);

// return (
//   <div className="py-1 px-1">
//     <h1>Testing</h1>
//     <div className="mx-auto">
//       <Widget
//         src="mob.near/widget/ProfileLarge"
//         props={{
//           accountId,
//           profile,
//           link: true,
//           showEditButton: !props.profile,
//         }}
//       />

//       <div className="mt-3">
//         <Widget
//           src="mob.near/widget/ProfileTabs"
//           props={{ accountId, profile }}
//         />
//       </div>
//     </div>
//   </div>
// );
