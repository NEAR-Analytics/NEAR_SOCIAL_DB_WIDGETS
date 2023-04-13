const items = props.items ?? [];

const Radio = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.25em;
`;

const RadioButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: .95em;
  line-height: 140%;
  color: #202024;
`;

return (
  <RadioGroup.Root asChild value={props.value} onValueChange={props.onChange}>
    <Radio>
      {items.map((item) => (
        <RadioGroup.Item asChild>
          <RadioButton>
            <RadioGroup.Indicator />
            <Label>{item.name}</Label>
          </RadioButton>
        </RadioGroup.Item>
      ))}
    </Radio>
  </RadioGroup.Root>
)
