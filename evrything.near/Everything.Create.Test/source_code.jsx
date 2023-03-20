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

const typeStr = "evrything.near/type/Test";x

const properties = { title: "", description: "" };

State.init({ values: properties, data: {} });

function createThing() {
  Evrything.create(state, typeStr, true).then((res) => {
    State.update({ data: res });
  });
}

function resetThing() {
  State.update({ values: properties });
}

return (
  <>
    <Header>
      <Title>{typeStr.split("/")[2]}</Title>
    </Header>
    <Form>
      <Input
        placeholder="title"
        onChange={({ target }) =>
          State.update({ values: { ...state.values, title: target.value } })
        }
      />
      <TextArea
        placeholder="description"
        onInput={({ target }) =>
          State.update({
            values: { ...state.values, description: target.value },
          })
        }
      />
      <ButtonRow>
        <Button onClick={createThing}>create</Button>
        <CommitButton
          force
          data={state.data}
          onCommit={resetThing}
        >
          publish
        </CommitButton>
        <Button onClick={resetThing}>reset</Button>
      </ButtonRow>
    </Form>
    {JSON.stringify(state.data)}
  </>
);
