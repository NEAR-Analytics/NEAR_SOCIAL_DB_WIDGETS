const Wrapper = styled.div`/* reset */
a,
button {
  all: unset;
}

.ToolbarRoot {
  display: flex;
  padding: 10px;
  width: 100%;
  min-width: max-content;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 2px 10px var(--blackA7);
}

.ToolbarToggleItem,
.ToolbarLink,
.ToolbarButton {
  flex: 0 0 auto;
  color: var(--mauve11);
  height: 25px;
  padding: 0 5px;
  border-radius: 4px;
  display: inline-flex;
  font-size: 13px;
  line-height: 1;
  align-items: center;
  justify-content: center;
}
.ToolbarToggleItem:hover,
.ToolbarLink:hover,
.ToolbarButton:hover {
  background-color: var(--violet3);
  color: var(--violet11);
}
.ToolbarToggleItem:focus,
.ToolbarLink:focus,
.ToolbarButton:focus {
  position: relative;
  box-shadow: 0 0 0 2px var(--violet7);
}

.ToolbarToggleItem {
  background-color: white;
  margin-left: 2px;
}
.ToolbarToggleItem:first-child {
  margin-left: 0;
}
.ToolbarToggleItem[data-state='on'] {
  background-color: var(--violet5);
  color: var(--violet11);
}

.ToolbarSeparator {
  width: 1px;
  background-color: var(--mauve6);
  margin: 0 10px;
}

.ToolbarLink {
  background-color: transparent;
  color: var(--mauve11);
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.ToolbarLink:hover {
  background-color: transparent;
  cursor: pointer;
}

.ToolbarButton {
  padding-left: 10px;
  padding-right: 10px;
  color: white;
  background-color: var(--violet9);
}
.ToolbarButton:hover {
  background-color: var(--violet10);
  color: white;
}`;

return (
  <Wrapper>
    <Toolbar.Root className="ToolbarRoot" aria-label="Formatting options">
      <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
        <Toolbar.ToggleItem
          className="ToolbarToggleItem"
          value="bold"
          aria-label="Bold"
        >
          B
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ToolbarToggleItem"
          value="italic"
          aria-label="Italic"
        >
          I
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ToolbarToggleItem"
          value="strikethrough"
          aria-label="Strike through"
        >
          S
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="ToolbarSeparator" />
      <Toolbar.ToggleGroup
        type="single"
        defaultValue="center"
        aria-label="Text alignment"
      >
        <Toolbar.ToggleItem
          className="ToolbarToggleItem"
          value="left"
          aria-label="Left aligned"
        >
          L
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ToolbarToggleItem"
          value="center"
          aria-label="Center aligned"
        >
          C
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ToolbarToggleItem"
          value="right"
          aria-label="Right aligned"
        >
          R
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="ToolbarSeparator" />
      <Toolbar.Link
        className="ToolbarLink"
        href="#"
        target="_blank"
        style={{ marginRight: 10 }}
      >
        Edited 2 hours ago
      </Toolbar.Link>
      <Toolbar.Button className="ToolbarButton" style={{ marginLeft: "auto" }}>
        Share
      </Toolbar.Button>
    </Toolbar.Root>
  </Wrapper>
);
