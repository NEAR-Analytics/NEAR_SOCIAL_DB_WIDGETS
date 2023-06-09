State.init({});
const wikiTestData = Social.keys("*/wikiTest/articles/*", "final");
console.log(wikiTestData);
const accountsSocialDB = Object.keys(wikiTestData);
console.log(accountsSocialDB);
const accountsNum = Near.view("testwiki.near", "get_num_accounts");
const accounts = Near.view("testwiki.near", "get_accounts_paged");
return (
  <div>
    <h1>Authors</h1>
    <div>Total: {accountsNum} authors</div>
    <ul>
      {accountsSocialDB &&
        accountsSocialDB.map((accountId) => (
          <li key={accountId}>
            <span>{accountId} -</span>
          </li>
        ))}
    </ul>
    <ul>
      {accounts &&
        accounts.map(([accountId, account]) => (
          <li key={accountId}>
            <span>
              {accountId} -
              {account.articles.length > 0 && (
                <span>
                  {" "}
                  {account.articles.length} article
                  {account.articles.length > 1 ? "s" : ""}
                </span>
              )}
            </span>
          </li>
        ))}
    </ul>
  </div>
);
