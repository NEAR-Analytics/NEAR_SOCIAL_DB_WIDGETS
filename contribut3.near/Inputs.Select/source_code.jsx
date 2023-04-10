return (
  <Select.Root>
    <Select.Trigger>
      <Select.Value />
      <Select.Icon>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="white"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Select.Icon>
    </Select.Trigger>

    <Select.Content>
      <Select.Viewport>
        {props.options.map(({ }) => <Select.Item>
          <Select.ItemText></Select.ItemText>
          <Select.ItemIndicator>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </Select.ItemIndicator>
        </Select.Item>)}
      </Select.Viewport>
    </Select.Content>
  </Select.Root>
);
