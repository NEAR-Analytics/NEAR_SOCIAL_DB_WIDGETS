const agreementsForUser = Social.index("tosAccept", "kgrbg", {
  accountId: context.accountId, // make sure it was written by the user in question
});

return <>{JSON.stringify(agreementsForUser)}</>;
