const label = props.label ?? "Label";
const placeholder = props.placeholder ?? "Placeholder";
const value = props.value ?? "";
const options = props.options ?? [];
const onChange = props.onChange ?? (() => { });
const validate = props.validate ?? (() => { });
const error = props.error ?? "";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.45em;
  width: 100%;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1.25em;
  color: #344054;
`;

const Error = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1.25em;
  color: #ff4d4f;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  &.show {
    height: 1.25em;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
  color: #101828;
  width: 100%;
`;

const Item = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  padding: 0.25em 0.5em;
  background: #f2f4f7;
  border: 1px solid #d0d5dd;
  border-radius: 3px;
  font-style: normal;
  font-weight: 500;
  font-size: .95em;
  line-height: 1.25em;
  text-align: center;
  color: #344054;
`;

return (
  <Container>
    <Label>{label}</Label>
    <Typeahead
      id
      labelKey="name"
      onChange={onChange}
      options={[{ name: "test" }, { name: "test2" }]}
      selected={value}
      // renderToken={(option, props, index) => {
      //   console.log({ option, props });
      //   return (
      //     <Item key={index}>{option.name}</Item>
      //   );
      // }}
      positionFixed
      multiple
      allowNew
    />
    <Error className={error ? "show" : ""}>{error}</Error>
  </Container>
);
