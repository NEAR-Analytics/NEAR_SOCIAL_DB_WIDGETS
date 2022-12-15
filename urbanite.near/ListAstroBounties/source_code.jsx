const term = props.searchTerm ? props.searchTerm + "*" : "*";

State.init({
  index: 0,
  hasMore: true,
  bounties,
});

const fetchAstroBounties = () => {
  const bounties = fetch(
    `https://5s59j8guu9.execute-api.us-east-1.amazonaws.com/my-test/bounty/_search?size=20&from=${state.index}`,
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
  console.log("called");
  console.log(bounties);

  const nextIndex = state.index + 19;
  const hasMore = bounties.body.hits.hits.length > 0;

  State.update({
    bounties: bounties.body.hits,
    index: nextIndex,
    hasMore: false,
  });
};

return (
  <ol>
    <InfiniteScroll
      loadMore={fetchAstroBounties}
      hasMore={state.hasMore}
      loader={<div className="loader">Loading ...</div>}
    >
      {state.bounties
        ? state.bounties.hits.map((bounty) => {
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
        : "Fetching"}
    </InfiniteScroll>
  </ol>
);
