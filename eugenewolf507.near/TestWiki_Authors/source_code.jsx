const accountsNum = Near.view("testwiki.near", "get_num_accounts");

const accounts = Near.view("testwiki.near", "get_accounts_paged");

const getAuthorArticles = (authorId) => {
  if (authorId) {
    return Near.view("testwiki.near", "get_account", {
      account_id: authorId,
    });
  }
  return [];
};

console.log(getAuthorArticles("motzart.near"));

return (
  <div>
    <h1>Authors</h1>
    <div>Total: {accountsNum} authors</div>
    {accounts.map(([accountId, account]) => (
      <li key={accountId}>
        <span>{accountId} - </span>
        {account.articles.length > 0 && (
          <span className="muted">
            {" "}
            {account.articles.length} article
            {account.articles.length > 1 ? "s" : ""}
          </span>
        )}
      </li>
    ))}
  </div>
);
