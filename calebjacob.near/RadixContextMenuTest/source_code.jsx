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

const Wrapper = styled.div`
    .ContextMenuTrigger {
  display: block;
  border: 2px black dashed;
  color: black;
  border-radius: 4px;
  font-size: 15px;
  user-select: none;
  padding: 45px 0;
  width: 300px;
  text-align: center;
}

.ContextMenuContent,
.ContextMenuSubContent {
  min-width: 220px;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
}

.ContextMenuItem,
.ContextMenuCheckboxItem,
.ContextMenuRadioItem,
.ContextMenuSubTrigger {
  font-size: 13px;
  line-height: 1;
  color: var(--violet11);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  user-select: none;
  outline: none;
}
.ContextMenuSubTrigger[data-state='open'] {
  background-color: var(--violet4);
  color: var(--violet11);
}
.ContextMenuItem[data-disabled],
.ContextMenuCheckboxItem[data-disabled],
.ContextMenuRadioItem[data-disabled],
.ContextMenuSubTrigger[data-disabled] {
  color: var(--mauve8);
  pointer-events: 'none';
}
.ContextMenuItem[data-highlighted],
.ContextMenuCheckboxItem[data-highlighted],
.ContextMenuRadioItem[data-highlighted],
.ContextMenuSubTrigger[data-highlighted] {
  background-color: var(--violet9);
  color: var(--violet1);
}

.ContextMenuLabel {
  padding-left: 25px;
  font-size: 12px;
  line-height: 25px;
  color: var(--mauve11);
}

.ContextMenuSeparator {
  height: 1px;
  background-color: var(--violet6);
  margin: 5px;
}

.ContextMenuItemIndicator {
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.RightSlot {
  margin-left: auto;
  padding-left: 20px;
  color: var(--mauve11);
}
[data-highlighted] > .RightSlot {
  color: white;
}
[data-disabled] .RightSlot {
  color: var(--mauve8);
}
`;

return (
  <Wrapper>
    <ContextMenu.Root>
      <ContextMenu.Trigger className="ContextMenuTrigger">
        Right click here.
      </ContextMenu.Trigger>
      <ContextMenu.Content
        className="ContextMenuContent"
        sideOffset={5}
        align="end"
      >
        <ContextMenu.Item className="ContextMenuItem">
          Back <div className="RightSlot">⌘+[</div>
        </ContextMenu.Item>
        <ContextMenu.Item className="ContextMenuItem" disabled>
          Foward <div className="RightSlot">⌘+]</div>
        </ContextMenu.Item>
        <ContextMenu.Item className="ContextMenuItem">
          Reload <div className="RightSlot">⌘+R</div>
        </ContextMenu.Item>
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger className="ContextMenuSubTrigger">
            More Tools
          </ContextMenu.SubTrigger>
          <ContextMenu.SubContent
            className="ContextMenuSubContent"
            sideOffset={2}
            alignOffset={-5}
          >
            <ContextMenu.Item className="ContextMenuItem">
              Save Page As… <div className="RightSlot">⌘+S</div>
            </ContextMenu.Item>
            <ContextMenu.Item className="ContextMenuItem">
              Create Shortcut…
            </ContextMenu.Item>
            <ContextMenu.Item className="ContextMenuItem">
              Name Window…
            </ContextMenu.Item>
            <ContextMenu.Separator className="ContextMenuSeparator" />
            <ContextMenu.Item className="ContextMenuItem">
              Developer Tools
            </ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Separator className="ContextMenuSeparator" />

        <ContextMenu.CheckboxItem
          className="ContextMenuCheckboxItem"
          checked={state.bookmarksChecked}
          onCheckedChange={setBookmarksChecked}
        >
          <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
            X
          </ContextMenu.ItemIndicator>
          Show Bookmarks <div className="RightSlot">⌘+B</div>
        </ContextMenu.CheckboxItem>
        <ContextMenu.CheckboxItem
          className="ContextMenuCheckboxItem"
          checked={state.urlsChecked}
          onCheckedChange={setUrlsChecked}
        >
          <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
            X
          </ContextMenu.ItemIndicator>
          Show Full URLs
        </ContextMenu.CheckboxItem>

        <ContextMenu.Separator className="ContextMenuSeparator" />

        <ContextMenu.Label className="ContextMenuLabel">
          People
        </ContextMenu.Label>
        <ContextMenu.RadioGroup value={state.person} onValueChange={setPerson}>
          <ContextMenu.RadioItem className="ContextMenuRadioItem" value="pedro">
            <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
              X
            </ContextMenu.ItemIndicator>
            Pedro Duarte
          </ContextMenu.RadioItem>
          <ContextMenu.RadioItem className="ContextMenuRadioItem" value="colm">
            <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
              X
            </ContextMenu.ItemIndicator>
            Colm Tuite
          </ContextMenu.RadioItem>
        </ContextMenu.RadioGroup>
      </ContextMenu.Content>
    </ContextMenu.Root>
  </Wrapper>
);
