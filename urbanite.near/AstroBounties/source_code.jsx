return (
  <>
    <h2>Astro Bounties | V1</h2>
    <Widget src="edwardkcyu.near/widget/AstroFeedback" />
    <Widget
      src="urbanite.near/widget/ComponentSearch"
      props={{
        filterTag: "app",
        placeholder: "🔍 Search Bounties",
        limit: 10,
        onChange: ({ result }) => State.update({ apps: result }),
      }}
    />
    <Widget src="urbanite.near/widget/ListAstroBounties" />
  </>
);
