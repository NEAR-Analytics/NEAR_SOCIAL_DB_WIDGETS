const Content = styled.div`
  .post {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 72px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1200px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 48px;

    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 12px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;
const Button = styled.a`
  display: block;
  color: #ffffff;
  background-color: #30A46C;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 24px;
  border: none;
  border-radius: 50px;
  float: inline-end;

  :hover{ color: #ffffff; cursor: pointer; }
`;

if (context.loading) {
  return "Loading";
}

// By default the form to ask a question is hidden
initState({ askQuestion: false });
const toggleQuestion = () => {
  State.update({ askQuestion: !state.askQuestion });
};

const SidebarWrapper = styled.div`
  border-right: 1px solid #ECEEF0;
`;

return (
  <div class="container-fluid py-6 mb-5">
    <div class="row">
      {/**
    <SidebarWrapper className="col-2 pe-5">
        <Widget
          src="ethpraguedemo.near/widget/Progress-Pool-Proposals-Sidebar"
          props={{ categories: sortByCategories, topics: filterByTopic }}
        />
      </SidebarWrapper>
    */}

      <Content>
        <Tabs>
          <TabsButton
            href={`https://near.org/embed/ethpraguedemo.near/widget/Progress-Pool`}
            selected={state.selectedTab === "overview"}
          >
            For Voters
          </TabsButton>

          <TabsButton
            href={`https://near.org/embed/ethpraguedemo.near/widget/Progress-Pool-Grantees`}
            selected={state.selectedTab === "apps"}
          >
            For Grantees
          </TabsButton>

          <TabsButton
            href={`https://near.org/embed/ethpraguedemo.near/widget/Progress-Pool-Proposals`}
            selected={state.selectedTab === "nfts"}
          >
            Proposals
          </TabsButton>
        </Tabs>
      </Content>

      <div class="col-12">
        <div class="pb-3 border-bottom">
          <Widget
            src="ethpraguedemo.near/widget/Progress-Pool-Proposals-Discussion-Title"
            props={{ disabled: !context.accountId, onClick: toggleQuestion }}
          />
        </div>

        <div class="mt-5">
          <Widget src="ethpraguedemo.near/widget/Progress-Pool-Proposals-Feed" />
        </div>
      </div>
    </div>

    <div class="col-lg-2 col-sm-12 text-center mt-3">
      <Button
        class="btn btn-primary btn-sm"
        disabled={props.disabled}
        onClick={props.onClick}
      >
        Cast Your Vote
      </Button>
    </div>
  </div>
);
