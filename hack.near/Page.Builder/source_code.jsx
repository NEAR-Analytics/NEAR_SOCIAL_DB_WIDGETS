return (
  <div className="d-flex flex-column">
    <div className="mt-auto py-3">
      <div className="container">
        <div className="d-flex justify-content-end">
          <a
            href={
              "/#/https://temp.everything.dev/#/evrything.near/widget/Everything.View.Thing?src=evrything-docs.near/widget/Everything.View.Document&accountId=evrything.near&blockHeight=89268687"
            }
          >
            docs
          </a>
        </div>
      </div>
    </div>
    <Widget
      src="hack.near/widget/Page.Template"
      props={{
        accountId: "hack.near",
        font: "Courier",
        type: "everything",
        text: "build",
        domain: "abc",
      }}
    />
  </div>
);
