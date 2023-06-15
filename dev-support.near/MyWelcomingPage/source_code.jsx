if (!context.accountId) {
  return "Please login to use this application";
}

return (
  <>
    <div class="container">
      <h1> This is my page {context.accountId} </h1>
    </div>
  </>
);
