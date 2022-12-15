return (
  <div>
    <h2>NEAR Books</h2>
    {context.accountId && (
      <div>
        <Widget src="serhii.near/widget/NEARBooksTabs" />
      </div>
    )}
  </div>
);
