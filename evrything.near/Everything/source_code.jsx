return (
  <div className="d-flex flex-column min-vh-100">
    <Widget
      src="evrything.near/widget/Everything.Template"
      props={{
        accountId: "evrything.near",
        font: "Times New Roman",
        type: "everything",
        text: "everything",
        domain: "everything",
      }}
    />
    <div className="mt-auto py-3 bg-light">
      <div className="container">
        <div className="d-flex justify-content-end">
          <a href={"/#/evrything-docs.near/widget/Everything.Documentation"}>
            documentation
          </a>
        </div>
      </div>
    </div>
  </div>
);
