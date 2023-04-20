const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;

  button {
    border: none;
    background: none;
    padding: 0;
    width: 1.5em;
    height: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1.5px solid #a8acb3;
    transition: background 200ms ease-out;

    &[data-state="checked"] {
      background: #202024;
    }
  }

  svg {
    color: #fff;
  }
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1em;
  color: #202024;
  font-style: normal;
`;

return (
  <Box>
    <Switch.Root
      checked={props.value}
      onCheckedChange={props.onChange}
      id={props.id}
    >
      <Switch.Thumb />
    </Switch.Root>
    <Label htmlFor={props.id}>{props.value ? props.labelActive : props.labelInactive}</Label>
  </Box>
);
