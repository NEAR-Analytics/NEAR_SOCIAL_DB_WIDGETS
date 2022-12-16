const PAGING_SIZE = 50;

const fetchBounties = (term, from) => {
  const response = fetch(
    `https://5s59j8guu9.execute-api.us-east-1.amazonaws.com/my-test/bounty/_search?size=${PAGING_SIZE}&from=${from}`,
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

  console.log("fetch", { from, response });
  const bounties = response.body?.hits?.hits;
  const total = response.body?.hits?.total?.value;

  return {
    bounties,
    total,
  };
};

const term = props.searchTerm ? props.searchTerm + "*" : "*";

if (!state) {
  const bountiesData = fetchBounties(term, 0);

  if (bountiesData.bounties) {
    State.init({
      term,
      bounties: bountiesData.bounties,
      total: bountiesData.total || state.total,
    });
    console.log("init state", { state });
  }
}

const fetchMoreBounties = (page) => {
  const bountiesData = fetchBounties(term, page * PAGING_SIZE);

  console.log("fetch more", { page, bountiesData });

  State.update({
    total: bountiesData.total,
    bounties: state.bounties.concat(bountiesData.bounties),
  });
};

console.log({ state });

return state.bounties ? (
  <InfiniteScroll
    pageStart={0}
    initialLoad={true}
    loadMore={fetchMoreBounties}
    hasMore={state.bounties.length < state.total}
    loader={<div className="loader">Loading ...</div>}
  >
    <ol>
      {state.bounties.map((bounty) => {
        const bountyId = bounty._source.id;
        return (
          <li>
            <div>{bountyId}</div>
          </li>
        );
      })}
    </ol>
  </InfiniteScroll>
) : (
  "Fetching "
);
