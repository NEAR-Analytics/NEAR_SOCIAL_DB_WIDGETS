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
  padding-left: ${start.length - 1}ch;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const Start = styled.div`
  position: absolute;
  inset: 0 auto 0 0;
  padding: 0 1ch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #d0d5dd;
  border-top-left: 4px;
  border-bottom-left: 4px;
`;

const Container = styled.div`
  position: relative;
`;

return (
  <Container>
    <Start>{start}</Start>
    <Input
      type="text"
      value={value}
      placeholder="Search"
      onChange={(e) => update(e.target.value)}
    />
  </Container>
);
