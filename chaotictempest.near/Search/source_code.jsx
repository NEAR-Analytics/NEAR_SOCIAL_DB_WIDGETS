const SEARCH_API_KEY = "57ad1944e94432510f067a6e3d13f022";
const APPLICATION_ID = "B6PI9UKKJT";
let search_params = "query=";
const api_url = `https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/dev_near-social-feed/query?${search_params}`;

const LIMIT_PER_GROUP = 5;

const writeStateTerm = (term) => {
  console.log("writeStateTerm:", term);

  State.update({
    term,
  });
};

const computeResults = (term) => {
  console.log("computeResults:", term);
  const raw_content = fetchAlgoliaData(term);

  State.update({
    term,
    post: getCategoryResults("post", raw_content),
    comment: getCategoryResults("comment", raw_content),
    profile: getCategoryResults("profile", raw_content),
  });
};

const fetchAlgoliaData = (queryURI) => {
  search_params = "query=" + queryURI;
  const res_data = useCache(
    () =>
      asyncFetch(api_url, {
        body: `{ "params": "${search_params}" }`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Algolia-Api-Key": `${SEARCH_API_KEY}`,
          "X-Algolia-Application-Id": `${APPLICATION_ID}`,
        },
        method: "POST",
      }).then((res) => res.body),
    "apiResponse1",
    { subscribe: true }
  );
  return res_data;
};

const getCategoryResults = (category, raw_result_data) => {
  const results = [];
  for (const result of raw_result_data.hits) {
    const { author, content, objectID, categories: categories_raw } = result;
    if (categories_raw.includes(category)) {
      const categories = categories_raw.join(", ");
      results.push({
        author,
        content,
        objectID,
        categories,
      });
    }
  }

  return results.slice(0, LIMIT_PER_GROUP);
};

return (
  <div>
    <div>
      <input
        type="text"
        value={state.term ?? ""}
        onChange={(e) => writeStateTerm(e.target.value)}
        placeholder="Search..."
      />
      {state.term && (
        <button type="button" onClick={() => writeStateTerm("")}>
          Clear
        </button>
      )}
      {state.term && (
        <button type="button" onClick={() => computeResults(state.term)}>
          Go
        </button>
      )}
    </div>

    {state.term && (
      <>
        {state.post?.length > 0 && (
          <div>
            <p>Posts:</p>

            <ul>
              {state.post.map((data, i) => (
                <li key={i}>
                  {data.author}, {data.content}
                </li>
              ))}
            </ul>
          </div>
        )}

        {state.comment?.length > 0 && (
          <div>
            <p>Comments:</p>

            <ul>
              {state.comment.map((data, i) => (
                <li key={i}>
                  {data.author}: {data.content}
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )}

    {state.term && state.apps?.length === 0 && state.people?.length === 0 && (
      <p>No people or applications match your search.</p>
    )}

    {props.debug && (
      <div>
        <p>Debug Data:</p>
        <pre>{JSON.stringify(state, undefined, 2)}</pre>
      </div>
    )}
  </div>
);
