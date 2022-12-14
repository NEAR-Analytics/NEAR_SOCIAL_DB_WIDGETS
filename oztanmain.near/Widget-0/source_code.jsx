const accountId = context.accountId;

if (!accountId) {
  return "Sign-in with NEAR using the profile icon in the top right";
} else {
  return `Hello ${accountId}!`;
}
