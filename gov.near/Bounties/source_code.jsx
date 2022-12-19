return (
  <>
    <h2>Bounties</h2>
    <Widget
      src="gov.near/widget/SearchBounties"
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
