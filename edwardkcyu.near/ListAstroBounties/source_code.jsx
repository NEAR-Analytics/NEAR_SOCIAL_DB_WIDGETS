const bounties = fetch(
  "https://search.testnet.app.astrodao.com/bounty/_search?size=2&from=0",
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
          const bountyId = bounty._source.id;
          return (
            <li>
              <div>{bountyId}</div>
              <Widget
                src="edwardkcyu.near/widget/AstroBountiesCommentEditor"
                props={{ bountyId }}
              />
              <Widget
                src="edwardkcyu.near/widget/AstroBountiesParticipantEditor"
                props={{ bountyId }}
              />
            </li>
          );
        })
      : ""}
  </ul>
);
