const start = props.start ?? "https://";
const id = props.id ?? "link";
const value = props.value ?? "";
const update = props.update ?? (() => { });

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  padding-left: ${start.length * 0.1}em;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const Start = styled.div`
  position: absolute;
  inset: 0 auto 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #d0d5dd;
`;

const Container = styled.div`
  position: relative;
`;

return (
  <Container>
    <Start>{icon}</Start>
    <Input
      type="text"
      value={props.search}
      placeholder="Search"
      onChange={(e) => props.update({ search: e.target.value })}
    />
  </Container>
);
