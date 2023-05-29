const onChange = props.onChange;

const Input = styled.input`
  width: 300px;
  padding: 8px;
`;

const Button = styled.button`
  text-transform: lowercase !important;
  padding: 8px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

return (
  <Container>
    <Input
      onChange={(e) => {
        State.update({ value: e.target.value });
        if (onChange) {
          onChange(e.target.value);
        }
      }}
      value={state.value}
      placeholder="domain"
    />
  </Container>
);
