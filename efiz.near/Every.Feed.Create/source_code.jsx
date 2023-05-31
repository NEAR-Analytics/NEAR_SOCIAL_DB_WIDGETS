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

const options = ["efiz.near/type/Image", "efiz.near/type/markdown"];

return (
  <Container>
    <Typeahead
      options={options}
      multiple
      onChange={(value) => {
        onChange({ typeWhitelist: value });
      }}
      placeholder="available types..."
    />
  </Container>
);
