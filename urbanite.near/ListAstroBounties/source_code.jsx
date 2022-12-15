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
  <ol>
    {bounties
      ? bounties.body.hits.hits.map((bounty) => {
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
                  <b>Amount:</b> {bounty._source.amount}
                </p>
              </div>
            </li>
          );
        })
      : ""}
  </ol>
);
