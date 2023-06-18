const accountId = context.accountId;

if (!accountId) {
  return <Widget src="mob.near/widget/ProfileOnboarding" />;
}

const data = accountId
  ? Social.get(`${accountId}/settings/dev/library`)
  : undefined;

if (data === null) {
  return "Loading...";
}

const library = [data];

return (
  <>
    <Widget src="hack.near/widget/dev.library" props={{ data: library }} />
  </>
);
