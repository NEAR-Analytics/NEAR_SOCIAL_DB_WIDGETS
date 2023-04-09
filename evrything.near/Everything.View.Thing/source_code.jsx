const ERROR_WIDGET = "evrything.near/widget/Everything.Error";

const ThingContainer = styled.div`
  padding: 2px;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Icon = styled.div`
  cursor: pointer;
`;

const src = props.src;

const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const content = JSON.parse(
  Social.get(`${accountId}/thing/main`, blockHeight) ?? "null"
);

const hideThing = () => {
  // this will hide from ALL domains... how can this be selective?
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
    {context.accountId === accountId ? (
      <Toolbar>
        <Icon onClick={hideThing}>Hide</Icon>
      </Toolbar>
    ) : null}

    <Widget
      src={src}
      props={{
        data: content,
      }}
    />
  </ThingContainer>
);
