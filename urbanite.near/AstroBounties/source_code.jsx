return (
  <>
    <h2>Astro Bounties | V2</h2>
    <Widget
      src="edwardkcyu.near/widget/AstroFeedback"
      props={{ version: "v2" }}
    />
    <Widget
      src="urbanite.near/widget/BountiesSearch"
      props={{
        placeholder: "🔍 Search Bounties",
        onChange: ({ searchTerm }) => State.update({ searchTerm: searchTerm }),
      }}
    />
    <Widget
      src="urbanite.near/widget/ListAstroBounties"
      props={{ searchTerm: state.searchTerm }}
    />
  </>
);
