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

const typeStr = "evrything.near/type/Test";

State.init({ title: "", description: "" });

function createThing() {
  const resp = Evrything.create(state, typeStr);
  console.log(resp);
  State.update({
    publish: resp,
  });
}

return (
  <>
    <Header>
      <Title>{typeStr.split("/")[2]}</Title>
    </Header>
    <Form>
      <Input
        placeholder="title"
        onChange={({ target }) => State.update({ title: target.value })}
      />
      <TextArea
        placeholder="description"
        onInput={({ target }) => State.update({ description: target.value })}
      />
      <ButtonRow>
        <Button onClick={createThing}>create</Button>
        <CommitButton force data={state.publish ?? null} onCommit={resetThing}>
          publish
        </CommitButton>
      </ButtonRow>
    </Form>
    {JSON.stringify(state.publish)}
  </>
);
