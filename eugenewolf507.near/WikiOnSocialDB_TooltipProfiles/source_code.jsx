const accounts = props.accounts || [];
const emoji = props.emoji || "";

const Button = styled.button`
border: 0;
background: transparent;
`;

return (
  <>
    {accounts && (
      <OverlayTrigger
        placement="auto"
        overlay={
          <Tooltip>
            <div
              className="text-truncate text-start"
              style={{ maxWidth: "16em" }}
            >
              {accounts.slice(0, 10).map((accountId) => (
                <Fragment key={accountId}>
                  <Widget
                    src="mob.near/widget/ProfileLine"
                    props={{ accountId, link: false }}
                  />
                  <br />
                </Fragment>
              ))}
              {accounts.length > 10 ? "..." : ""}
            </div>
          </Tooltip>
        }
      >
        <Button type="button">
          {accounts.length} {emoji}
        </Button>
        <span>{accounts.length}</span>
      </OverlayTrigger>
    )}
  </>
);
