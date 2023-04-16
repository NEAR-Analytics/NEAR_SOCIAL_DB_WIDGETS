return (
  <div className="d-flex flex-column">
    <div className="mt-auto py-3">
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
        accountId: "connectamey.near", // which account's Types to use (your near account)
        font: "Times New Roman", // select a web safe font
        text: "documentation", // main title
        domain: "lionhack23", // domain data should be saved to
      }}
    />
  </div>
);
