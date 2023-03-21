const ERROR_WIDGET = "evrything.near/widget/Everything.Error";

const ThingContainer = styled.div`
  padding: 2px;
`;

const src = props.src;

const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const content = JSON.parse(
  Social.get(`${accountId}/thing/main`, blockHeight) ?? "null"
);

return (
  <ThingContainer>
    <Widget
      src={src}
      props={{
        data: content,
      }}
    />
  </ThingContainer>
);
