// add helper function to contract to see whitelisted charity addresses, map them to name, for now just in json

const Header = styled.div`
  padding: 15px;
  position: relative;
  font-weight: normal;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 32px;
  text-align: center;
  color: #333;
`;

const ROW_LIMIT = 10;

// need to have the search result updated and selected in state
// Charity helper functions
function loadCharities() {
  const res = fetch(
    "https://raw.githubusercontent.com/codingshot/donatedao-landing/main/data/charityList.json"
  );
  return res.body && JSON.parse(res.body);
}

function filterCharity(searchText, maxResults) {
  return charityList
    .filter((charity) => {
      if (charity.title.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      if (charity.keywords.includes(searchText)) {
        return true;
      }
      if (charity.description.includes(searchText)) {
        return true;
      }
      if (charity.address.includes(searchText)) {
        return true;
      }
      return false;
    })
    .slice(0, maxResults);
}

// Load Charities
const charityList = loadCharities();
if (!charityList) {
  return "⧗ Loading Charities...";
}

State.init({
  filteredCharity: filterCharity("", ROW_LIMIT),
});

const handleSearchChange = (event) => {
  State.update({
    filteredCharity: filterCharity(event.target.value, ROW_LIMIT),
  });
};

return (
  <div>
    <Widget
      src={`donating.near/widget/DonateDAO.searchInput`}
      props={{ textChange: handleSearchChange }}
    />
    <div>
      {state.filteredCharity.map(({ address, description, title }) => (
        <Widget
          src={`donating.near/widget/DonateDAO.searchResult`}
          props={{
            address,
            description,
            title,
            onChange: ({ address }) => {
              State.update({
                selectedAddress: address,
              });
            },
          }}
        />
      ))}
    </div>
  </div>
);
