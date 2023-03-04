let defaultQuery = props.query || "select 'Hello World from Flipside's API!'";

const returnValue = "test";
const options = {
  method: "POST",
  body: `{ "query": ${defaultQuery} }`,
  headers: {
    "Content-Type": "application/json",
    "X-Algolia-Api-Key": `${SEARCH_API_KEY}`,
    "X-Algolia-Application-Id": `${APPLICATION_ID}`,
  },
};

const res = fetch("https://flipside-api.antonyip.com/getCachedQuery", options);

if (!res.ok) {
  return <div>near.social issue with fetch</div>;
}

if (res.body.error) {
  return (
    <div>
      anton's api issue with website or query {JSON.stringify(res.body)}{" "}
    </div>
  );
}

return <div>{JSON.stringify(res.body.records)}</div>;
