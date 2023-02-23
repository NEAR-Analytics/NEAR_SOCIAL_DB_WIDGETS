const limitPerPage = 21;
let components = [];
let totalComponents = 0;

State.init({
  currentPage: 0,
});

const data = Social.keys("*/widget/*", "final", {
  return_type: "BlockHeight",
});

if (data) {
  const result = [];

  Object.keys(data).forEach((accountId) => {
    return Object.keys(data[accountId].widget).forEach((widgetName) => {
      totalComponents++;

      result.push({
        accountId,
        widgetName,
        blockHeight: data[accountId].widget[widgetName],
      });
    });
  });

  result.sort((a, b) => b.blockHeight - a.blockHeight);
  components = result.slice(0, state.currentPage * limitPerPage + limitPerPage);
}

function onSearchChange({ result, term }) {
  if (term.trim()) {
    State.update({ searchResults: result || [] });
  } else {
    State.update({ searchResults: null });
  }
}

const items = state.searchResults || components;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 48px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SubHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 500px) {
      flex-direction: column;
      align-items: start;
  }
`;

const Search = styled.div`
  width: 246px;
  height: 40px;
  position: relative;

  .bi-search {
      position: absolute;
      top: 0;
      left: 18px;
      z-index: 100;
      font-size: 14px;
      line-height: 40px;
      color: #687076;
  }

  .input-group {
      height: 100%;
  }

  input {
      padding: 0 14px 0 42px;
      border: 1px solid #D0D5DD;
      background: #FFFFFF;
      border-radius: 100px;
  }

  button {
      border-color: #D0D5DD !important;
      border-radius: 0 100px 100px 0 !important;
      border-left: none !important;
      background: #fff !important;
      color: #687076 !important;

      &:hover, &:focus {
          color: #000 !important;
      }
  }

  .spinner-grow {
      display: none !important; 
  }

  @media (max-width: 500px) {
      width: 100%;
  }
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #11181C;
  margin: 0;
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #687076;
  margin: 0;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
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
    gap: 0.25rem;
    
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Item = styled.div``;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  height: 32px;
  background: #FBFCFD;
  border: 1px solid #D7DBDF;
  border-radius: 6px;
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

return (
  <Wrapper>
    <Header>
      <H1>Components</H1>
      <H2>Discover the latest components from the NEAR community.</H2>
    </Header>

    <SubHeader>
      <Text>{totalComponents} components</Text>

      <Search>
        <i className="bi bi-search"></i>
        <Widget
          src="mob.near/widget/ComponentSearch"
          props={{
            placeholder: "Search components",
            limit: 21,
            onChange: onSearchChange,
          }}
        />
      </Search>
    </SubHeader>

    {state.searchResults?.length === 0 && (
      <Text>No components matched your search.</Text>
    )}

    {items.length > 0 && (
      <Items>
        {items.map((component, i) => (
          <Item key={component.accountId + component.widgetName}>
            <Widget
              src="calebjacob.near/widget/ComponentCard"
              props={{
                src: `${component.accountId}/widget/${component.widgetName}`,
                blockHeight: component.blockHeight,
              }}
            />
          </Item>
        ))}
      </Items>
    )}

    {!state.searchResults && (
      <Button
        type="button"
        onClick={() => State.update({ currentPage: state.currentPage + 1 })}
      >
        Load More
      </Button>
    )}
  </Wrapper>
);
