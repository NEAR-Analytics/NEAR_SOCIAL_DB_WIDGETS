const accountId = props.accountId ?? context.accountId;
const onChange = props.onChange;
const options = props.options;

State.init({
  optInInfo,
});

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return (
    <>
      <h2>"Please sign in with a NEAR ecosystem wallet to use this widget"</h2>
    </>
  );
}

let page = (
  <div>
    <h1>{`Hello, ${accountId}!`}</h1>
    <p>
      {`Please fill out the following information. Only include the data you are willing to share. Everytime your data is accessed in a query, you will earn NEAR!`}
    </p>
    <p></p>
    <Widget src="trechriron.near/widget/OptInDataEditor" />
    <p></p>
  </div>
);

return page;
