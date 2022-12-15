const bounties = fetch(
  "https://search.testnet.app.astrodao.com/bounty/_search?size=20&from=0",
  {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {
        bool: {
          must: [
            {
              simple_query_string: {
                query: "*",
                fields: ["accounts"],
              },
            },
          ],
          must_not: [],
          should: [],
        },
      },
      sort: [
        {
          createTimestamp: {
            order: "desc",
          },
        },
      ],
    }),
  }
);

console.log(bounties.body.hits);

if (bounties.body.hits.hits.length == 0) {
  return "Loading...";
}

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
    <ol>
      {bounties
        ? bounties.body.hits.hits.map((bounty) => {
            const bountyId = bounty._source.id;
            return (
              <li>
                <div>
                  <h3>
                    <b>DAO:</b> {bounty._source.daoId}
                  </h3>
                  <p>
                    <b>Summary:</b> {bounty._source.description}
                  </p>
                  <p>
                    <b>Amount:</b>{" "}
                    <Widget
                      src="urbanite.near/widget/YoctoNEARConverter"
                      props={{ amount: bounty._source.amount }}
                    />
                  </p>
                  <Widget
                    src="edwardkcyu.near/widget/AstroBountiesCommentEditor"
                    props={{ bountyId }}
                  />
                </div>
              </li>
            );
          })
        : ""}
    </ol>
  </>
);
