const ERROR_WIDGET = "evrything.near/widget/Everything.Error";

const ThingContainer = styled.div`
  padding: 2px;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  gap: 8px;
`;

const Icon = styled.button`
  cursor: pointer;
  text-transform: lowercase !important;
`;

const src = props.src;

const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const content = JSON.parse(
  Social.get(`${accountId}/thing/main`, blockHeight) ?? "null"
);

const hideThing = () => {
  // this will hide from ALL domains... how can this be selective?
  // and it only works if hidden by the account...
  // maybe the "owner" account could have moderation abilities
  Social.set(
    {
      modification: {
        [blockHeight]: {
          "": JSON.stringify({ action: "HIDE" }),
        },
      },
    },
    {
      force: true,
    }
  );
};

return (
  <ThingContainer>
    <Toolbar>
      <p>thing created by : {accountId}</p>
      {context.accountId === accountId ? (
        <Icon onClick={hideThing}>Hide</Icon>
      ) : null}
    </Toolbar>

    <Widget
      src={src}
      props={{
        data: content,
      }}
    />
  </ThingContainer>
);
