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
        accountId:
          "3513937518421a6650d50b4e3e522ac55fe569d1bd2f4be374edd3416509bf38",
        font: "Times New Roman",
        type: "everything",
        text: "kashyab",
        domain: "kashyab",
      }}
    />
  </div>
);
