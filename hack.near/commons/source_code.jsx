const accountId = context.accountId;

if (!accountId) {
  return <Widget src="mob.near/widget/ProfileOnboarding" />;
}

const library = accountId
  ? Social.get(`${accountId}/settings/dev/library`)
  : undefined;

if (library === null) {
  return "Loading...";
}

return (
  <>
    <CommitButton data={{ settings: { dev: { library: data } } }}>
      Save
    </CommitButton>
    <hr />
    <p>{library}</p>
    <hr />
    <Widget src="hack.near/widget/dev.library" props={{ data: library }} />
  </>
);
