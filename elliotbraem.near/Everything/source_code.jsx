return (
  <div className="d-flex flex-column">
    <div className="mt-auto py-8">
      <div className="container">
        <div className="d-flex justify-content-end">
          <a href={"/#/evrything-docs.near/widget/Everything.Documentation"}>
            documentation
          </a>
        </div>
      </div>
    </div>
    <Widget
      src="evrything.near/widget/Everything.Template"
      props={{
        accountId: "elliotbraem.near",
        font: "Verdana",
        type: "everything",
        text: "elliot",
        domain: "elliotbraem",
      }}
    />
  </div>
);
