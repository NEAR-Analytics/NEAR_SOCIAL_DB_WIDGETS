return (
  <div>
    <h2>NEAR Books</h2>
    <div>
      <Widget src="serhii.near/widget/BookSearchPane" />
    </div>
    {context.accountId && (
      <div>
        <Widget src="serhii.near/widget/NEARBooksTabs" />
      </div>
    )}
  </div>
);
