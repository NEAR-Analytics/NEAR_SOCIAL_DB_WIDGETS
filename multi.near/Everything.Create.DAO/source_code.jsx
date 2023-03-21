const Header = styled.div` width: 100%; display: flex; flex-direction: row; justify-content: space-between; align-items: center; `;
const Title = styled.div` font-size: 24px; line-height: 33.6px; `;
const Form = styled.div` display: flex; flex-direction: column; gap: 4px; `;
const Input = styled.input` width: 100%; `;
const TextArea = styled.textarea` width: 100%; `;
const ButtonRow = styled.div` display: flex; flex-direction: row; gap: 4px; `;
const typeStr = "multi.near/type/DAO";
const type = Type.get(typeStr);
State.init({ daoId: "" });
function composeData() {
  const data = {
    thing: { main: JSON.stringify(state) },
    index: {
      tempeverything: JSON.stringify({ key: "main", value: { type: typeStr } }),
    },
  };
  return data;
}
return (
  <>
    {" "}
    <Header>
      {" "}
      <Title>{typeStr.split("/")[2]}</Title>{" "}
    </Header>{" "}
    <Form>
      <Input
        placeholder="daoId"
        onChange={({ target }) => State.update({ daoId: target.value })}
      />
      <ButtonRow>
        {" "}
        <CommitButton force data={composeData} onCommit={resetThing}>
          {" "}
          create{" "}
        </CommitButton>{" "}
      </ButtonRow>{" "}
    </Form>{" "}
  </>
);
