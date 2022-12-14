const accountId = context.accountId;

if (context.loading) {
  return "Loading . . . ";
} else if (!accountId) {
  return "Sign-in with NEAR using the profile icon in the top right";
} else {
  return `Hello ${accountId}!`;
}
