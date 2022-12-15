return (
  <>
    <h2>Astro Bounties | V1</h2>
    <Widget src="edwardkcyu.near/widget/AstroFeedback" />
    <Widget
      src="urbanite.near/widget/BountiesSearch"
      props={{
        filterTag: "app",
        placeholder: "🔍 Search Bounties",
        limit: 10,
        onChange: ({ searchTerm }) => State.update({ searchTerm: searchTerm }),
      }}
    />
    <Widget
      src="urbanite.near/widget/ListAstroBounties"
      props={{ searchTerm: state.searchTerm }}
    />
  </>
);
