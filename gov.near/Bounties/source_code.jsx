return (
  <>
    <h2>Bounties</h2>
    <Widget
      src="urbanite.near/widget/BountiesSearch"
      props={{
        placeholder: "🔍 Search Bounties",
        onChange: ({ searchTerm }) => State.update({ searchTerm: searchTerm }),
      }}
    />
    <Widget
      src="gov.near/widget/ListBounties"
      props={{ searchTerm: state.searchTerm }}
    />
  </>
);
