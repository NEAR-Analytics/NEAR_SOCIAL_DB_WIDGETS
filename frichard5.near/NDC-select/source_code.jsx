const { options, selectedOption, onChange } = props;

const Select = styled.select`
  border: none;
  padding: 10px;
  font-size: 16px; 
  cursor: pointer;
  background: #4498E0;
`;

const Option = styled.option`
`;

const Options = [];

options.forEach((o) => {
  Options.push(
    <Option value={o.value} selected={o.value === selectedOption}>
      {o.label}
    </Option>
  );
});

return <Select onChange={onChange}>{Options}</Select>;
