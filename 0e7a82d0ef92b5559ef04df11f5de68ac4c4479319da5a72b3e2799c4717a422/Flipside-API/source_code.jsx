let defaultQuery =
  props.query || `select 'Please Enter a Query in Props' as Error`;

const returnValue = "test";
const options = {
  method: "POST",
  body: `{ "query": "${defaultQuery}" }`,
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

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

return (
  <div>
    <div> Query Things </div>
    <Button>Submit Query</Button>
    {JSON.stringify(res.body.records)}
  </div>
);
