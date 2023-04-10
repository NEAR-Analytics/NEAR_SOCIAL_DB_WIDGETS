const Card = styled.div`
  background-color: white;
  padding: 12px;
  margin: 8px;
`;
const Icon = styled.div`
  height: 24px;
  width: 24px;
`;
const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Body = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Caption = styled.div`
    font-size: 12px;
    line-height: 15.6px;
    color: #A6A6A6;
`;

const thingId = props.data.thingId;

if (thingId === null) {
  return (
    <Widget
      src={ERROR_WIDGET}
      props={{
        message: "thing id was not provided.",
      }}
    />
  );
}

const data = fetch("https://monkfish-app-ginhc.ondigitalocean.app/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Everything": "simple",
  },
  body: JSON.stringify({
    query:
      "query findDocumentById($is: ID) { findDocuments(id: {is: $is}) { name, description { md }, creationDate } }",
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

data = data.body.data.findDocuments[0];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}.${month}.${year}`;
};

return (
  <Card>
    <div className="d-flex flex-row h-100">
      <Icon></Icon>
      <Body>
        <Content>
          <h1>{data.name}</h1>
          <Markdown text={data.description.md} />
        </Content>
        <Caption>{formatDate(data.creationDate)}</Caption>
      </Body>
    </div>
  </Card>
);
