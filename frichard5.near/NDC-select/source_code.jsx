const { options, selectedOption, onChange } = props;

const Select = styled.select`
  position: relative;
  border: none;
  padding: 10px;
  font-size: 20px; 
  cursor: pointer;
  background: rgba(68, 152, 224, 0.7);
  border-radius: 4px;
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
