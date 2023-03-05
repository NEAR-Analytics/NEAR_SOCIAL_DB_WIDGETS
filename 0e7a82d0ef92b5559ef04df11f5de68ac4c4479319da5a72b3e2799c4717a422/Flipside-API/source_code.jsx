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

const MyButton = styled.button`
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const MyTextArea = styled.div`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => (props.primary ? "white" : "palevioletred")};
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  border: 2px solid palevioletred;
  border-radius: 3px;
  contentEditable: true;
`;

return (
  <div>
    <MyTextArea>asd</MyTextArea>
    <MyButton>Submit Query</MyButton>
    {JSON.stringify(res.body.records)}
  </div>
);
