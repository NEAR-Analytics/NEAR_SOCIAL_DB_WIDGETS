const accountId = context.accountId;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Not signed in huh?";
}

return <h1>{`Hello, ${accountId}!`}</h1>;
