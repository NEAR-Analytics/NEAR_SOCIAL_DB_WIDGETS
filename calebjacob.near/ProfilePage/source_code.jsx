State.init({
  selectedTab: "overview",
});

const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const Wrapper = styled.div``;

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

const SidebarWrapper = styled.div`
  position: relative;
  z-index: 5;
  margin-top: -55px;
`;

const Content = styled.div`
  .post {
    padding-left: 0;
    padding-right: 0;
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

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
  margin-bottom: 72px;

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
  margin-bottom: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid #ECEEF0;

  > *:last-child {
    margin-bottom: 0 !important;
  }
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
      <SidebarWrapper>
        <Widget
          src="calebjacob.near/widget/ProfilePage.Sidebar"
          props={{
            accountId,
            profile,
          }}
        />
      </SidebarWrapper>

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
            {profile.description && (
              <>
                <Title as="h2" size="19px" margin>
                  About
                </Title>

                <Bio>
                  <Markdown text={profile.description} />
                </Bio>
              </>
            )}

            <Title as="h2" size="19px">
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
