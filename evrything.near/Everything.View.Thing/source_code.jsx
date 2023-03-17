const ERROR_WIDGET = "evrything.near/widget/Everything.Error";

const ThingContainer = styled.div`
  padding: 2px;
`;

const thingId = props.thingId;

if (!thingId) {
  return (
    <Widget
      src={ERROR_WIDGET}
      props={{
        message: "thing id was not provided.",
      }}
    />
  );
}

const type = props.type;

if (!type) {
  return (
    <Widget
      src={ERROR_WIDGET}
      props={{
        message: `provided type: "${props.type}" is not valid.`,
      }}
    />
  );
}

const data = fetch(type.queries?.getById.url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: type.queries?.getById.query,
    variables: {
      thingId: thingId,
    },
  }),
});

if (data.body.errors) {
  return (
    <Widget
      src={ERROR_WIDGET}
      props={{
        message: JSON.stringify(data.body.errors[0].message),
      }}
    />
  );
}

return (
  <ThingContainer>
    <Widget
      src={props.widget}
      props={{
        data: data.body.data,
      }}
    />
  </ThingContainer>
);
