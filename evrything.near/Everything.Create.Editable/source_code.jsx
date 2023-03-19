const ERROR_WIDGET = "evrything.near/widget/Everything.Error";

const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    font-size: 24px;
    line-height: 33.6px;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Input = styled.input`
    width: 100%;
`;

const TextArea = styled.textarea`
    width: 100%;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;

const Button = styled.button`
    padding: 8px 20px;
    max-width: 90px;
`;

const Caption = styled.div`
    font-size: 12px;
    line-height: 15.6px;
    color: #A6A6A6;
`;

const typeStr = "evrything.near/type/Editable";

const type = Type.get(typeStr);
// const type = props.type;

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

State.init({
  title: "",
  description: "",
  data: null,
});

const createThing = () => {
  const data = asyncFetch(
    "https://monkfish-app-ginhc.ondigitalocean.app/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          "mutation CreateIdea($type: String, $title: String) { things { create(name: $type) { message } addIdea(name: $title) { entities { id } } } }",
        variables: {
          type: typeStr,
          title: state.title,
        },
      }),
    }
  );
  State.update({
    data: data,
  });
};

function composeData() {
  const data = {
    thing: {
      main: JSON.stringify(state),
    },
    index: {
      everythingv0: JSON.stringify({
        key: "main",
        value: {
          type: typeStr,
        },
      }),
    },
  };
  return data;
}

const resetThing = () => {
  State.update({
    title: "",
    description: "",
  });
};

return (
  <>
    <Header>
      <Title>{typeStr.split("/")[2]}</Title>
    </Header>

    <Form>
      <Input
        placeholder={"title"}
        onChange={({ target }) => State.update({ title: target.value })}
      />
      <TextArea
        onInput={({ target }) => State.update({ description: target.value })}
        placeholder={"description, markdown supported"}
      />
      {state.data}
      <ButtonRow>
        <Button onClick={createThing}>reset</Button>
        <CommitButton
          disabled={!state.title}
          force
          data={composeData}
          onCommit={resetThing}
        >
          create
        </CommitButton>
        <Button onClick={resetThing}>reset</Button>
      </ButtonRow>
    </Form>
  </>
);
