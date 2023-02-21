const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to view this thing";
}

const entry = {
  thing: props.thing,
};

return (
  <div className="d-flex flex-column gap-1">
    <Widget
      src="efiz.near/widget/Thing"
      props={{
        thing: {
          id: entry.thing.id,
        },
      }}
    />
    <CommitButton
      data={{
        thing: entry.thing,
      }}
    >
      Commit
    </CommitButton>
  </div>
);
