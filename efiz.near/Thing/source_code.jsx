const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to view this thing";
}

return <p>{props.thing.id}</p>;
