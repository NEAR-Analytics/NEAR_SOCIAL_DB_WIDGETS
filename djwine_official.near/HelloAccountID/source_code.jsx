const { accountId, loading } = context;

if (loading) return "Loading";
if (!accountId) return "Please sign in with NEAR wallet to use this widget";

return `Hello, ${accountId}!`;
