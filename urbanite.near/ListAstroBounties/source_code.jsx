const term = props.searchTerm ? props.searchTerm + "*" : "*";

State.init({
  index: 0,
});

const makeMoreItems = () => {
  State.update({
    index: state.index + 19,
  });
};

const bounties = fetch(
  `https://search.testnet.app.astrodao.com/bounty/_search?size=20&from=${state.index}`,
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

console.log(bounties.body.hits);
if (!bounties) {
  return "Loading...";
}
if (bounties.body.hits.total.value == 0) {
  return "No search results";
}

return (
  <ol>
    <InfiniteScroll
      pageStart={0}
      loadMore={makeMoreItems}
      hasMore={bounties.body.hits.hits.length !== 0}
      loader={<div className="loader">Loading ...</div>}
    >
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
    </InfiniteScroll>
  </ol>
);
