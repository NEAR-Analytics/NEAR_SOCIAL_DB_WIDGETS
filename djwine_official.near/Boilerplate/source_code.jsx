// Inheritance
const { accountId, loading } = context;
console.log("context", context);
console.log("props", props);

if (loading) return "Loading";
if (!accountId) return "Please sign in with NEAR wallet to use this widget";

// Profile
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
console.log("profile", profile);

return `Hello, ${accountId}!`;
