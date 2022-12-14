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

return (
  <ul>
    {bounties
      ? bounties.body.hits.hits.map((bounty) => {
          return <li>{bounty._source.daoId}</li>;
        })
      : ""}
  </ul>
);
