const { options, selectedOption, onChange } = props;

const Select = styled.select`
  border: none;
  padding: 10px;
  font-size: 16px; 
  cursor: pointer; 
  option:hover {
    background:red;
  }
`;

const Options = [];

options.forEach((o) => {
  Options.push(
    <option value={o.value} selected={o.value === selectedOption}>
      {o.label}
    </option>
  );
});

return <Select onChange={onChange}>{Options}</Select>;
