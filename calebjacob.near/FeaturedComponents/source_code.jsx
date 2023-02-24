const componentsUrl = `/#/calebjacob.near/widget/ComponentsPage`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181C;
  margin: 0;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Item = styled.div``;

const ButtonLink = styled.a`
  display: block;
  width: 100%;
  padding: 8px;
  height: 32px;
  background: #FBFCFD;
  border: 1px solid #D7DBDF;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #11181C !important;
  margin: 0;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
  }

  span {
    color: #687076 !important;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const TextLink = styled.a`
  color: #006ADC;
  outline: none;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;

  &:hover,
  &:focus {
    color: #006ADC;
    text-decoration: underline;
  }
`;

return (
  <Wrapper>
    <Header>
      <H2>Featured Components</H2>
      <TextLink href={componentsUrl}>View All</TextLink>
    </Header>

    <Items>
      <Item>
        <Widget
          src="calebjacob.near/widget/ComponentCard"
          props={{ src: "calebjacob.near/widget/ActivityPage" }}
        />
      </Item>

      <Item>
        <Widget
          src="calebjacob.near/widget/ComponentCard"
          props={{ src: "devgovgigs.near/widget/Ideas" }}
        />
      </Item>

      <Item>
        <Widget
          src="calebjacob.near/widget/ComponentCard"
          props={{ src: "frichard2.near/widget/most-active-contracts" }}
        />
      </Item>

      <Item>
        <Widget
          src="calebjacob.near/widget/ComponentCard"
          props={{ src: "bozon.near/widget/WidgetHistory" }}
        />
      </Item>
    </Items>

    <ButtonLink href={componentsUrl}>View All Components</ButtonLink>
  </Wrapper>
);
