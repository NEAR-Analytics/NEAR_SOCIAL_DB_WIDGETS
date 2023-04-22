let events = [];

const data = fetch("https://monkfish-app-ginhc.ondigitalocean.app/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Everything": "simple",
  },
  body: JSON.stringify({
    query:
      "query events($source: String) { findEvents(source: {is: $source}) { id, title, start, end, url } }",
  }),
  variables: {
    source: "xrnyc",
  },
});

if (!data.body.errors) {
  events = data.body.data.findEvents;
}

return <Widget src={"evrything.near/widget/Calendar"} props={{ events }} />;
