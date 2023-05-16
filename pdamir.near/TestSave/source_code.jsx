const accountId = context.accountId;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Testing save of this widget";
}

return <h1>{`Hello, ${accountId}!`}</h1>;
