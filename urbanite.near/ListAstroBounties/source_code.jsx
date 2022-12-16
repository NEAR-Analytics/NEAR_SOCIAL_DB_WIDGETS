const term = props.searchTerm ? props.searchTerm + "*" : "*";

const bounties = fetch(
  `https://5s59j8guu9.execute-api.us-east-1.amazonaws.com/my-test/bounty/_search?size=20&from=0`,
  {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {
        query_string: {
          query: term,
          default_field: "description",
          type: "best_fields",
          fuzziness: "AUTO",
          fuzzy_transpositions: true,
          fuzzy_max_expansions: 50,
          fuzzy_prefix_length: 0,
          minimum_should_match: 1,
          default_operator: "or",
          analyzer: "standard",
          lenient: false,
          boost: 1,
          allow_leading_wildcard: true,
          enable_position_increments: true,
          phrase_slop: 3,
          quote_field_suffix: "",
          quote_analyzer: "standard",
          analyze_wildcard: false,
          auto_generate_synonyms_phrase_query: true,
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

console.log(bounties);

const Card = styled.div`
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-radius: 5px;
  padding: 30px 0;
  margin-bottom: 10px;
`;

const imageEndpoint = "https://astro-prod-ui.s3.us-east-1.amazonaws.com/";

return (
  <div className="container py-4">
    {bounties
      ? bounties.body.hits.hits.map((bounty) => {
          const bountyId = bounty._source.id;
          return (
            <div className="row justify-content-md-center py-2 px-5">
              <div className="col-2 justify-content-md-center">
                <img
                  style={{
                    width: "100%",
                    maxWidth: "80px",
                    borderRadius: "0.6em",
                  }}
                  src={`${imageEndpoint}${bounty._source.proposal.dao.metadata.flagLogo}`}
                />
              </div>
              <div className="col-10">
                <h4>{bounty._source.proposal.dao.metadata.displayName}</h4>
                <Card>
                  <div
                    style={{
                      borderBottom: "1px solid",
                      borderColor: "rgba(0,0,0,0.2)",
                    }}
                  >
                    <div style={{ padding: "0 30px 15px" }}>
                      <b>Summary:</b>
                      <br />
                      {bounty._source.description}
                    </div>
                  </div>
                  <div style={{ padding: "15px 30px 0" }}>
                    <b>Amount:</b>
                    <br />
                    <Widget
                      src="urbanite.near/widget/YoctoNEARConverter"
                      props={{ amount: bounty._source.amount }}
                    />
                  </div>
                </Card>
                <Widget
                  src="edwardkcyu.near/widget/AstroBountiesCommentEditor"
                  props={{ bountyId, collapsedOnCommentsAvailable: true }}
                />
                <Widget
                  src="edwardkcyu.near/widget/AstroBountiesParticipantEditor"
                  props={{ bountyId }}
                />
              </div>
            </div>
          );
        })
      : "Fetching"}
  </div>
);
