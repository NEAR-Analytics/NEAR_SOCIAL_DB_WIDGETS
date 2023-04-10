const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: .45em;
  width: 100%;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: .95em;
  line-height: 1.25em;
  color: #344054;
`;

const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: .5em .75em;
  gap: .5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
  color: #101828;
  width: 100%;
`;

return (
  <Container>
    <Label>{props.label}</Label>
    <Input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={({ target: { value } }) => props.onChange(value)}
    />
  </Container>
);
