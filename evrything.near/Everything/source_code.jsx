const Button = styled.button`
  text-transform: lowercase !important;
`;

const Link = styled.a`
  text-decoration: none;
`;

const createEverything = () => {
  Social.set(
    {
      widget: {
        everything: {
          "": `return (<Widget src="evrything.near/widget/Everything.Template" props={{ accountId: "${context.accountId}", font: "Times New Roman", type: "everything", text: "${context.accountId}", domain: "everything" }} />);`,
          metadata: {
            tags: {
              everything: "",
            },
          },
        },
      },
    },
    {
      force: true,
    }
  );
};

return (
  <div className="d-flex flex-column">
    <div className="mt-auto py-3">
      <div className="container">
        <div className="d-flex justify-content-end gap-2">
          {context.accountId && (
            <Button onClick={createEverything}>
              create your own everything
            </Button>
          )}
          <a href={"/#/evrything-docs.near/widget/Everything.Documentation"}>
            <Button>documentation</Button>
          </a>
        </div>
      </div>
    </div>
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
  </div>
);
