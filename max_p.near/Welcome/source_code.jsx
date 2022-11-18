return (
  <div className="container">
    <div className="row">
      <div>
        Welcome to NearSocial REKTSCAM Network!
        <br />
        {context.accountId ? (
          <Widget
            src="mob.near/widget/ProfileEditor"
            props={{ accountId: context.accountId }}
          />
        ) : (
          "Please sign in! and get rekt!"
        )}
      </div>
    </div>
    <div className="row mt-3">
      <div>
        <h4>All available scams</h4>
        <Widget src="mob.near/widget/AllWidgets" />
      </div>
    </div>
  </div>
);
