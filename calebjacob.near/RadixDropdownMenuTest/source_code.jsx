State.init({
  bookmarksChecked: true,
  urlsChecked: false,
  person: "pedro",
});

function setBookmarksChecked(value) {
  State.update({ bookmarksChecked: value });
}

function setUrlsChecked(value) {
  State.update({ urlsChecked: value });
}

function setPerson(value) {
  State.update({ person: value });
}

const Content = styled("DropdownMenu.Content")`
    border: 1px solid #000;
    border-radius: 5px;
    background: #fff;
    padding: 8px;
`;

const SubContent = styled("DropdownMenu.SubContent")`
    border: 1px solid #000;
    border-radius: 5px;
    background: #fff;
    padding: 8px;
`;

const itemStyles = `
    border-radius: 3px;
    background: #fff;
    padding: 8px;
    cursor: pointer;
    
    &:hover {
        background: #eee;
    }
`;

const Item = styled("DropdownMenu.Item")`${itemStyles}`;
const CheckboxItem = styled("DropdownMenu.CheckboxItem")`${itemStyles}`;
const RadioItem = styled("DropdownMenu.RadioItem")`${itemStyles}`;
const SubTrigger = styled("DropdownMenu.SubTrigger")`${itemStyles}`;

const Label = styled("DropdownMenu.Label")`
    padding: 8px;
    font-size: 12px;
    color: #666;
`;

const Separator = styled("DropdownMenu.Separator")`
    height: 1px;
    background: #eee;
    margin: 8px;
`;

return (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>My Menu</DropdownMenu.Trigger>

    <Content sideOffset={5}>
      <Item onSelect={() => {}}>New Tab</Item>
      <Item>New Window</Item>
      <Item disabled>New Private Window</Item>

      <DropdownMenu.Sub>
        <SubTrigger>More Tools</SubTrigger>

        <SubContent sideOffset={16} alignOffset={-8}>
          <Item>Save Page As…</Item>
          <Item>Create Shortcut…</Item>
          <Item>Name Window…</Item>
          <Separator />
          <Item>Developer Tools</Item>
        </SubContent>
      </DropdownMenu.Sub>

      <Separator />

      <Label>Checkbox</Label>

      <CheckboxItem
        checked={state.bookmarksChecked}
        onCheckedChange={setBookmarksChecked}
      >
        <DropdownMenu.ItemIndicator>
          <i className="bi bi-check-circle-fill"></i>
        </DropdownMenu.ItemIndicator>
        Show Bookmarks
      </CheckboxItem>
      <CheckboxItem
        checked={state.urlsChecked}
        onCheckedChange={setUrlsChecked}
      >
        <DropdownMenu.ItemIndicator>
          <i className="bi bi-check-circle-fill"></i>
        </DropdownMenu.ItemIndicator>
        Show Full URLs
      </CheckboxItem>

      <Separator />

      <Label>Radio</Label>

      <DropdownMenu.RadioGroup value={state.person} onValueChange={setPerson}>
        <RadioItem value="pedro">
          <DropdownMenu.ItemIndicator>
            <i className="bi bi-check-circle-fill"></i>
          </DropdownMenu.ItemIndicator>
          Pedro Duarte
        </RadioItem>
        <RadioItem value="colm">
          <DropdownMenu.ItemIndicator>
            <i className="bi bi-check-circle-fill"></i>
          </DropdownMenu.ItemIndicator>
          Colm Tuite
        </RadioItem>
      </DropdownMenu.RadioGroup>

      <DropdownMenu.Arrow />
    </Content>
  </DropdownMenu.Root>
);
