const Wrapper = styled.div`/* reset */
button {
  all: unset;
}

.ToggleGroup {
  display: inline-flex;
  background-color: var(--mauve6);
  border-radius: 4px;
  box-shadow: 0 2px 10px var(--blackA7);
}

.ToggleGroupItem {
  background-color: white;
  color: var(--mauve11);
  height: 35px;
  width: 35px;
  display: flex;
  font-size: 15px;
  line-height: 1;
  align-items: center;
  justify-content: center;
  margin-left: 1px;
}
.ToggleGroupItem:first-child {
  margin-left: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.ToggleGroupItem:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.ToggleGroupItem:hover {
  background-color: var(--violet3);
}
.ToggleGroupItem[data-state='on'] {
  background-color: var(--violet5);
  color: var(--violet11);
}
.ToggleGroupItem:focus {
  position: relative;
  box-shadow: 0 0 0 2px black;
}
`;

return (
  <Wrapper>
    <ToggleGroup.Root
      className="ToggleGroup"
      type="single"
      defaultValue="center"
      aria-label="Text alignment"
    >
      <ToggleGroup.Item
        className="ToggleGroupItem"
        value="left"
        aria-label="Left aligned"
      >
        A
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="ToggleGroupItem"
        value="center"
        aria-label="Center aligned"
      >
        B
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="ToggleGroupItem"
        value="right"
        aria-label="Right aligned"
      >
        C
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  </Wrapper>
);
