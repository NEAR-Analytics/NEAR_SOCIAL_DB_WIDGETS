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

const imageEndpoint = "https://astro-prod-ui.s3.us-east-1.amazonaws.com/";

return (
  <div className="container">
    {bounties
      ? bounties.body.hits.hits.map((bounty) => {
          const bountyId = bounty._source.id;
          return (
            <div className="row">
              <div className="col-1">
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "0.6em",
                  }}
                  src={`${imageEndpoint}${bounty._source.proposal.dao.metadata.flagLogo}`}
                />
              </div>
              <div className="col-11">
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
                  props={{ bountyId, collapsedOnCommentsAvailable: false }}
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
