let greeting = "and have a great day";
let user_account = context.accountId;

return (
  <>
    <div class="container border border-info p-3 text-center min-vw-100">
      <h1>Hello World</h1>
      <p>{greeting}</p>
      {user_account}
    </div>
  </>
);
