const limitPerPage = 21;
let people = [];
let totalPeople = 0;
const peopleUrl = "/#/calebjacob.near/widget/PeoplePage";

State.init({
  currentPage: 0,
  selectedTab: props.tab || "everyone",
});

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const data = Social.keys("*/profile", "final", {
  return_type: "BlockHeight",
});

if (data) {
  const result = [];

  Object.keys(data).forEach((accountId) => {
    totalPeople++;

    result.push({
      accountId,
      blockHeight: data[accountId].profile,
    });
  });

  result.sort((a, b) => b.blockHeight - a.blockHeight);
  people = result.slice(0, state.currentPage * limitPerPage + limitPerPage);
}

function onSearchChange({ result, term }) {
  State.update({
    selectedTab: "everyone",
  });

  if (term.trim()) {
    State.update({ searchResults: result || [] });
  } else {
    State.update({ searchResults: null });
  }
}

const items = state.searchResults || people;

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
  gap: 24px;

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

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
  margin-bottom: -24px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1200px) {
    background: #F8F9FA;
    border-top: 1px solid #ECEEF0;
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

return (
  <Wrapper>
    <Header>
      <H1>{totalPeople} People</H1>
      <H2>Connect with the NEAR community.</H2>
    </Header>

    <Search>
      <Widget
        src="calebjacob.near/widget/ProfileSearch"
        props={{
          limit: 21,
          onChange: onSearchChange,
        }}
      />
    </Search>

    <Tabs>
      <TabsButton
        href={`${peopleUrl}?tab=everyone`}
        selected={state.selectedTab === "everyone"}
      >
        Everyone
      </TabsButton>

      {context.accountId && (
        <TabsButton
          href={`${peopleUrl}?tab=following`}
          selected={state.selectedTab === "following"}
        >
          Following
        </TabsButton>
      )}
    </Tabs>

    {state.searchResults?.length === 0 && (
      <Text>No people matched your search.</Text>
    )}

    {items.length > 0 && (
      <Items>
        {items.map((person, i) => (
          <Item key={person.accountId}>
            <Widget
              src="calebjacob.near/widget/AccountProfileCard"
              props={{
                accountId: person.accountId,
                blockHeight: person.blockHeight,
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
