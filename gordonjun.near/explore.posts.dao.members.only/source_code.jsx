State.init({
  selectedTab: Storage.privateGet("selectedTab") || "all",
});

const daoId = props.daoId ?? "bbclan.near";

const domains = ["dev", "gov", "edu", "art", "fun"];

const hashtags = ["near", "bos"];

const previousSelectedTab = Storage.privateGet("selectedTab");

if (previousSelectedTab && previousSelectedTab !== state.selectedTab) {
  State.update({
    selectedTab: previousSelectedTab,
  });
}

let daoFollowers = Social.keys(`*/graph/follow/${daoId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

let accounts = undefined;

if (state.selectedTab === "following" && context.accountId) {
  const graph = Social.keys(`${context.accountId}/graph/follow/*`, "final");
  if (graph !== null) {
    daoFollowers = Object.entries(daoFollowers || {}).map(
      ([accountId]) => accountId
    );
    const followings = Object.entries(graph || {}).map(
      ([accountId]) => accountId
    );
    const daoFollowings = daoFollowers.filter((accountId) =>
      followings.includes(accountId)
    );
    accounts = Object.keys(daoFollowings || {});
    accounts.push(context.accountId);
  } else {
    accounts = [];
  }
} else {
  accounts = Object.keys(daoFollowers || {});
  accounts.push(context.accountId);
}

function selectTab(selectedTab) {
  Storage.privateSet("selectedTab", selectedTab);
  State.update({ selectedTab });
}

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181c;
  margin: 0 0 24px;
  padding: 0 24px;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const Content = styled.div`
  @media (max-width: 1200px) {
    > div:first-child {
      border-top: none;
    }
  }
`;

const ComposeWrapper = styled.div`
  border-top: 1px solid #eceef0;
`;

const FilterWrapper = styled.div`
  border-top: 1px solid #eceef0;
  padding: 24px 24px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 1200px) {
    padding: 12px;
  }
`;

const PillSelect = styled.div`
  display: inline-flex;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;

    button {
      flex: 1;
    }
  }
`;

const PillSelectButton = styled.button`
  display: block;
  position: relative;
  border: 1px solid #e6e8eb;
  border-right: none;
  padding: 3px 24px;
  border-radius: 0;
  font-size: 12px;
  line-height: 18px;
  color: ${(p) => (p.selected ? "#fff" : "#687076")};
  background: ${(p) => (p.selected ? "#006ADC !important" : "#FBFCFD")};
  font-weight: 600;
  transition: all 200ms;

  &:hover {
    background: #ecedee;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: #006adc !important;
    box-shadow: 0 0 0 1px #006adc;
    z-index: 5;
  }

  &:first-child {
    border-radius: 6px 0 0 6px;
  }
  &:last-child {
    border-radius: 0 6px 6px 0;
    border-right: 1px solid #e6e8eb;
  }
`;

const FeedWrapper = styled.div`
  .post {
    padding-left: 24px;
    padding-right: 24px;

    @media (max-width: 1200px) {
      padding-left: 12px;
      padding-right: 12px;
    }
  }
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "14px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
  max-width: 670px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

return (
  <>
    <Content>
      <h2 className="mb-3">post</h2>
      {context.accountId && (
        <>
          <ComposeWrapper>
            <Widget src="hack.near/widget/create.posts" props={{ domains }} />
          </ComposeWrapper>
          <h2 className="mb-3">explore</h2>
          <div className="mt-3 mb-3">
            <Text>check out what the other bbclan members are up to</Text>
          </div>

          <FilterWrapper>
            <PillSelect>
              <PillSelectButton
                type="button"
                onClick={() => selectTab("all")}
                selected={state.selectedTab === "all"}
              >
                all
              </PillSelectButton>

              <PillSelectButton
                type="button"
                onClick={() => selectTab("following")}
                selected={state.selectedTab === "following"}
              >
                following
              </PillSelectButton>
            </PillSelect>
            <div className="d-inline-flex gap-2">
              <Typeahead
                options={hashtags}
                multiple
                onChange={(value) => {
                  State.update({ hashtags: value });
                }}
                placeholder="hashtag filter"
              />
              <Typeahead
                options={domains}
                multiple
                onChange={(value) => {
                  State.update({ choose: value });
                }}
                placeholder="domain filter"
              />
            </div>
          </FilterWrapper>
        </>
      )}

      <FeedWrapper>
        <Widget
          src="hack.near/widget/view.posts"
          props={{
            accounts,
            domains: state.choose,
            hashtags: state.hashtags,
          }}
        />
      </FeedWrapper>
    </Content>
  </>
);
