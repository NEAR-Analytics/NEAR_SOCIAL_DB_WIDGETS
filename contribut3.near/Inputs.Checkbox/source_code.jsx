const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;

  button {
    border: none;
    background: none;
    border-radius: 100%;
    padding: 0;
    width: 1.5em;
    height: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1.5px solid #a8acb3;
  }

  span {
    display: inline-block;
    width: 1.25em;
    height: 1.25em;
    border-radius: 100%;
    border: 6px solid transparent;
    transition: border-color 200ms ease-out;
    
    &[data-state="checked"] {
      border-color: #202024;
    }
  }
`;

return (
  <Checkbox.Root asChild value={props.value} onValueChange={props.onChange}>
    <Box>
      <Checkbox.Indicator>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
      </Checkbox.Indicator>
      <Label>{props.label}</Label>
    </Box>
  </Checkbox.Root>
)
