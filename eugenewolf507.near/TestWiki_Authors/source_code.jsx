const accountsNum = Near.view("thewiki.near", "get_num_accounts");

return (
  <div>
    <h1>Authors</h1>
    <div>Total {accountsNum} authors</div>
  </div>
);
