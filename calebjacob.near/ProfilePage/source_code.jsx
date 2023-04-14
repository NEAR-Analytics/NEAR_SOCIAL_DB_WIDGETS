State.init({
  copiedShareUrl: false,
  selectedTab: "overview",
});

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

const Wrapper = styled.div`
  .button {
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
    color: #11181C !important;

    &.button--primary {
      color: #006ADC !important;
      width: 100%;
    }

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
  }
`;

const Main = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 352px  minmax(0, 1fr);
  align-items: start;
`;

const BackgroundImage = styled.div`
  height: 240px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  margin: 0 -12px;
  background: #ECEEF0;

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

const Content = styled.div``;

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

const Title = styled.h1`
  font-weight: 600;
  font-size: ${(p) => p.size || "25px"};
  line-height: 1.2em;
  color: #11181C;
  margin: ${(p) => (p.margin ? "0 0 24px" : "0")};
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
  
  &[href] {
    display: inline-flex;
    
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const TextLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: #11181C !important;
  font-weight: 400;
  font-size: 14px;
  white-space: nowrap;
  outline: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }

  i {
    color: #7E868C;
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

const Actions = styled.div`
  display: flex;
  gap: 6px;
`;

const Stats = styled.div`
  display: flex;
  gap: 24px;
`;

const SocialLinks = styled.div`
  display: grid;
  gap: 9px;
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    button {
      flex: 1;
    }
  }
`;

const TabsButton = styled.button`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;

  &:hover {
    color: #11181C;
  }

  &::after {
    content: '';
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #0091FF;
  }
`;

const Bio = styled.div`
  color: #11181C;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #ECEEF0;
`;

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
              <a
                className="button button--primary"
                href="/#/mob.near/widget/ProfileEditor"
              >
                Edit Profile
              </a>
            ) : context.accountId ? (
              <>
                <Widget
                  src="calebjacob.near/widget/FollowButton"
                  props={{
                    accountId,
                    className: "button button--primary",
                  }}
                />

                <Widget
                  src="calebjacob.near/widget/PokeButton"
                  props={{
                    accountId,
                    className: "button",
                  }}
                />
              </>
            ) : (
              <></>
            )}

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Copy URL to clipboard</Tooltip>}
            >
              <button
                className="button"
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
              </button>
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

        {profile.linktree && (
          <SidebarSection>
            <SocialLinks>
              {profile.linktree.website && (
                <TextLink
                  href={`https://${profile.linktree.website}`}
                  target="_blank"
                >
                  <i className="bi bi-globe"></i> {profile.linktree.website}
                </TextLink>
              )}

              {profile.linktree.github && (
                <TextLink
                  href={`https://github.com/${profile.linktree.github}`}
                  target="_blank"
                >
                  <i className="bi bi-github"></i> {profile.linktree.github}
                </TextLink>
              )}

              {profile.linktree.twitter && (
                <TextLink
                  href={`https://twitter.com/${profile.linktree.twitter}`}
                  target="_blank"
                >
                  <i className="bi bi-twitter"></i> {profile.linktree.twitter}
                </TextLink>
              )}

              {profile.linktree.telegram && (
                <TextLink
                  href={`https://t.me/${profile.linktree.telegram}`}
                  target="_blank"
                >
                  <i className="bi bi-telegram"></i> {profile.linktree.telegram}
                </TextLink>
              )}
            </SocialLinks>
          </SidebarSection>
        )}
      </Sidebar>

      <Content>
        <Tabs>
          <TabsButton
            type="button"
            onClick={() => State.update({ selectedTab: "overview" })}
            selected={state.selectedTab === "overview"}
          >
            Overview
          </TabsButton>

          <TabsButton
            type="button"
            onClick={() => State.update({ selectedTab: "apps" })}
            selected={state.selectedTab === "apps"}
          >
            Applications
          </TabsButton>

          <TabsButton
            type="button"
            onClick={() => State.update({ selectedTab: "nfts" })}
            selected={state.selectedTab === "nfts"}
          >
            NFTs
          </TabsButton>
        </Tabs>

        {state.selectedTab === "overview" && (
          <>
            <Bio>
              {profile.description && <Markdown text={profile.description} />}
            </Bio>

            <Title as="h2" size="19px" margin>
              Activity
            </Title>

            <Widget
              src="calebjacob.near/widget/Feed"
              props={{ accounts: [accountId] }}
            />
          </>
        )}
      </Content>
    </Main>
  </Wrapper>
);
