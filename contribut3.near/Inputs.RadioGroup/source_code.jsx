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

  button {
    border: none;
    background: none;
    border-radius: 100%;
    width: 1.125em;
    height: 1.125em;
  }

  span {
    display: inline-block;
    width: 1.125em;
    height: 1.125em;
    border-radius: 100%;
    transition: border 200ms ease-out;
    
    &[data-state="checked"] {
      border: 6px solid #202024;
    }
  }
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
      {items.map(({ value, name }) => (
        <RadioButton>
          <RadioGroup.Item id={value} value={value}>
            <RadioGroup.Indicator />
          </RadioGroup.Item>
          <Label htmlFor={value}>{name}</Label>
        </RadioButton>
      ))}
    </Radio>
  </RadioGroup.Root>
)
