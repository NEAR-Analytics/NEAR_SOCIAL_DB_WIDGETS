const accountId = context.accountId;

State.init({
  infoAccountId: "",
});

state.infoAccountId = accountId;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

function createOptInDataElements(dataElements) {
  // verify object is formatted JSON
  // build form based on elements
  // return form
}

let page = (
  <div>
    <h1>{`Hello, ${accountId}!`}</h1>
    <p>
      {`Please fill out the following information. Only include the data you are willing to share. Everytime your data is accessed in a query, you will earn NEAR!`}
    </p>
    <br></br>
    {bigForm}
  </div>
);

return page;
