const accountId = context.accountId;
const widgetSrc = context.widgetSrc;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

return (
  <h1>
    {`Hello, ${accountId}! From ${widgetSrc}`}
    {props.children}
  </h1>
);
