const ERROR_WIDGET = "efiz.testnet/widget/Everything.Error";

const Card = styled.div`
    height: 180px;
    background-color: white;
    padding: 12px;
    margin: 8px;
    border-radius: 22px;
    box-shadow: 5px 5px 5px gray;
    border: solid gray;
`;

const Icon = styled.div`
    height: 24px;
    width: 24px;
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

const Title = styled.div`
    max-height: 56px;
    font-size: 20px;
    line-height: 28px;
    overflow: hidden;
    position: relative;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;

const Preview = styled.div`
    font-size: 16px;
    line-height: 20.8px;
    color: #A6A6A6;
    overflow: hidden;
    position: relative;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
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
  },
  body: JSON.stringify({
    query:
      "query findIdeaByThingId($thingId: ID) { findIdeas(id: {is: $thingId}) { name, description { md }, creationDate } }",
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

data = data.body.data.findIdeas[0];

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
      <Icon>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z"
            fill="#292D32"
          />
          <path
            d="M19.02 3.47997C17.08 1.53997 15.18 1.48997 13.19 3.47997L11.98 4.68997C11.88 4.78997 11.84 4.94997 11.88 5.08997C12.64 7.73997 14.76 9.85997 17.41 10.62C17.45 10.63 17.49 10.64 17.53 10.64C17.64 10.64 17.74 10.6 17.82 10.52L19.02 9.30997C20.01 8.32997 20.49 7.37997 20.49 6.41997C20.5 5.42997 20.02 4.46997 19.02 3.47997Z"
            fill="#292D32"
          />
          <path
            d="M15.61 11.53C15.32 11.39 15.04 11.25 14.77 11.09C14.55 10.96 14.34 10.82 14.13 10.67C13.96 10.56 13.76 10.4 13.57 10.24C13.55 10.23 13.48 10.17 13.4 10.09C13.07 9.80999 12.7 9.44999 12.37 9.04999C12.34 9.02999 12.29 8.95999 12.22 8.86999C12.12 8.74999 11.95 8.54999 11.8 8.31999C11.68 8.16999 11.54 7.94999 11.41 7.72999C11.25 7.45999 11.11 7.18999 10.97 6.90999C10.9488 6.86459 10.9283 6.81943 10.9084 6.77452C10.7609 6.44121 10.3262 6.34376 10.0685 6.60152L4.34 12.33C4.21 12.46 4.09 12.71 4.06 12.88L3.52 16.71C3.42 17.39 3.61 18.03 4.03 18.46C4.39 18.81 4.89 19 5.43 19C5.55 19 5.67 18.99 5.79 18.97L9.63 18.43C9.81 18.4 10.06 18.28 10.18 18.15L15.9013 12.4287C16.1609 12.1691 16.0629 11.7237 15.7253 11.5796C15.6873 11.5634 15.6489 11.5469 15.61 11.53Z"
            fill="#292D32"
          />
        </svg>
      </Icon>
      <Body>
        <Content>
          <Title>{data.name}</Title>
          <Preview>
            <Markdown text={data.description.md} />
          </Preview>
        </Content>
        <Caption>{formatDate(data.creationDate)}</Caption>
      </Body>
    </div>
  </Card>
);
