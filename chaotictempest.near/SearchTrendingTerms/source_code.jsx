const term = props.term ?? "";
const { appId, apiKey, index } = props.credentials;
const apiUrl =
  props.apiUrl ?? `https://${appId}-dsn.algolia.net/1/indexes/${index}/query?`;

const RenderContainer = props.renderContainer ?? styled.div``;

const fetchSearchSuggestions = (query) => {
  return asyncFetch(apiUrl, {
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "X-Algolia-Api-Key": apiKey,
      "X-Algolia-Application-Id": appId,
    },
    method: "POST",
  });
};

if (!state.results) {
  fetchSearchSuggestions(props.term).then((resp) => {
    const results = [];
    for (const hit of resp.body.hits ?? []) {
      results.push(hit.query);
    }
    State.update({
      results,
    });
  });
}

return (
  <>
    {(!props.renderItem || props.debug) && (
      <pre>{JSON.stringify(state.results, undefined, 2)}</pre>
    )}
    {props.renderItem && (
      <RenderContainer>{state.results?.map(props.renderItem)}</RenderContainer>
    )}
  </>
);
