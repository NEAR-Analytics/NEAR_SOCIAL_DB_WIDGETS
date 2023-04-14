const ERROR_WIDGET = "evrything.near/widget/Everything.Error";

const ThingContainer = styled.div`
  padding: 2px;
`;

const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const content = JSON.parse(
  Social.get(`${accountId}/thing/main`, blockHeight) ?? "null"
);

const type = Type.get(props.type);

if (type === null) {
  return (
    <Widget
      src={ERROR_WIDGET}
      props={{
        message: `type: "${a.value.type}" is not valid.`,
      }}
    />
  );
}

return (
  <ThingContainer>
    <Widget
      src={type.widgets?.view}
      props={{
        data: content,
      }}
    />
  </ThingContainer>
);
