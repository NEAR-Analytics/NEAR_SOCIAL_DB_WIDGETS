const [currentQuery, setCurrentQuery] = useState("select 1");

let defaultQuery;
props.query || `select 'Please Enter a Query in Props' as Error`;

const options = {
  method: "POST",
  body: `{ "query": "${defaultQuery}" }`,
  headers: {
    "Content-Type": "application/json",
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

function updateQuery(value) {
  setCurrentQuery(value);
}

return (
  <div>
    <input
      type="text"
      onChange={(e) => updateQuery(e.target.value)}
      // className={`form-control ${state.term ? "border-end-0" : ""}`}
      // value={state.term ?? ""}
      // onChange={(e) => computeResults(e.target.value)}
      // placeholder={props.placeholder ?? `Enter your query here!`}
    />
    <div>${currentQuery}</div>
    <MyButton>Submit Query</MyButton>
    {JSON.stringify(res.body.records)}
  </div>
);
