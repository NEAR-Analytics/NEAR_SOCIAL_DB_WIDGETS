const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const defaultGuide = "hack.near/widget/DAO.Profile";

const guide = Social.get(`${accountId}/settings/dev/guide`);

if (guide === null) {
  return "Loading...";
}

State.init({
  guide: guide ?? defaultGuide,
});

const resetGuide = () => {
  state.guide = defaultGuide;
  State.update();
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 48px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

return (
  <Wrapper>
    <Header>
      <Widget src="hack.near/widget/dev.Page.Header" />
    </Header>
    <Widget src={state.guide} props={{ accountId }} />
  </Wrapper>
);
