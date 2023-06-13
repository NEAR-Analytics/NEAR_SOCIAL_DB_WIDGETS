const componentsUrl = "#/near/widget/ComponentsPage";
//bozon.near/widget/WidgetHistory

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181c;
  margin: 0;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Item = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const TextLink = styled.a`
  color: #006adc;
  outline: none;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;

  &:hover,
  &:focus {
    color: #006adc;
    text-decoration: underline;
  }
`;

return (
  <Wrapper>
    <Header>
      <H2>DAO COMPONENTS</H2>
    </Header>

    <Items>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "sking.near/widget/DAO.Page" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{
            src: "hack.near/widget/DAO.Page",
          }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{
            src: "frichard5.near/widget/NDC-Page",
          }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "frichard5.near/widget/NDC-alldaos" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "onboarder.near/widget/DAOSocialSearch" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "frichard5.near/widget/SputnikBOS.Homer" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "every.near/widget/Settings" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "hack.near/widget/DAO.Profile.Editor" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "hack.near/widget/CreateDAO" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "sking.near/widget/DAO.Permissions" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "mob.near/widget/DAO.Main" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "hack.near/widget/Every.DAO" }}
        />
      </Item>
    </Items>
  </Wrapper>
);

// add mintbase widgets
// add geneadrop
// add indexer widgets
// add linkdrop widgets
