const ownerId = "contribut3.near";

State.init({
  search: props.search ?? "",
  content: props.content,
  tab: props.tab ?? "home",
  accountId: props.accountId,
  entityId: props.entityId,
  contributorId: props.contributorId,
  kind: props.kind,
  cid: props.cid,
});

const isModerator = Near.view(
  ownerId,
  "check_is_owner",
  { account_id: context.accountId },
  "final",
  false
);

const isContributor = Near.view(
  ownerId,
  "check_is_vendor",
  { account_id: context.accountId },
  "final",
  false
);

const update = (state) => State.update(state);

const tabContent = {
  home: (
    <Widget
      src={`${ownerId}/widget/Dashboard`}
      props={{ content: state.content, search: state.search, update }}
    />
  ),
  contributor: (
    <Widget
      src={`${ownerId}/widget/Profile`}
      props={{
        content: state.content,
        search: state.search,
        accountId: state.accountId,
        update,
      }}
    />
  ),
  inbox: (
    <Widget
      src={`${ownerId}/widget/Inbox`}
      props={{ content: state.content, search: state.search, update }}
    />
  ),
  entities: (
    <Widget
      src={`${ownerId}/widget/ManageEntities`}
      props={{ content: state.content, search: state.search, update }}
    />
  ),
  project: (
    <Widget
      src={`${ownerId}/widget/Project.Page`}
      props={{
        accountId: state.accountId,
        search: state.search,
        content: state.content,
        update,
      }}
    />
  ),
  need: (
    <Widget
      src={`${ownerId}/widget/NeedPage`}
      props={{
        accountId: state.accountId,
        cid: state.cid,
        search: state.search,
        content: state.content,
        update,
      }}
    />
  ),
  createproject: (
    <Widget
      src={`${ownerId}/widget/Project.Form`}
      props={{
        search: state.search,
        content: state.content,
        accountId: props.accountId,
        kind: state.kind,
        cid: state.cid,
        update,
      }}
    />
  ),
  contributions: (
    <Widget
      src={`${ownerId}/widget/ContributionsPage`}
      props={{
        search: state.search,
        content: state.content,
        update,
      }}
    />
  ),
  contribution: (
    <Widget
      src={`${ownerId}/widget/ContributionPage`}
      props={{
        entityId: state.entityId,
        contributorId: state.contributorId,
        search: state.search,
        update,
      }}
    />
  ),
}[state.tab];

const ContentContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border: 1px solid #eceef0;
  border-radius: 24px 24px 0px 0px;
  padding: 2.5em 1.5em;
`;

const Sidebar = styled.div`
  display: ${({ show }) => show ? "flex" : "none"};
  flex-direction: row;
  position: sticky;
  top: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
`;

return (
  <div>
    <Widget src={`${ownerId}/widget/NavbarControl`} props={{ update }} />
    <Content>
      <Sidebar show={state.tab !== "createproject"}>
        <Widget
          src={`${ownerId}/widget/Sidebar`}
          props={{ tab: state.tab, update }}
        />
      </Sidebar>
      <ContentContainer>{tabContent}</ContentContainer>
    </Content>
  </div>
);
