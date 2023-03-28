const RADIO_ITEMS = ["Andy", "Benoît", "Luis"];
const CHECK_ITEMS = ["Always Show Bookmarks Bar", "Always Show Full URLs"];

State.init({
  checkedSelection: [CHECK_ITEMS[1]],
  radioSelection: RADIO_ITEMS[2],
});

function setCheckedSelection(value) {
  State.update({ checkedSelection: value });
}

function setRadioSelection(value) {
  State.update({ radioSelection: value });
}

const Wrapper = styled.div`
    /* reset */
button {
  all: unset;
}

.MenubarRoot {
  display: flex;
  background-color: white;
  padding: 3px;
  border-radius: 6px;
  box-shadow: 0 2px 10px var(--blackA7);
}

.MenubarTrigger {
  padding: 8px 12px;
  outline: none;
  user-select: none;
  font-weight: 500;
  line-height: 1;
  border-radius: 4px;
  color: var(--violet11);
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
}

.MenubarTrigger[data-highlighted],
.MenubarTrigger[data-state='open'] {
  background-color: var(--violet4);
}

.MenubarContent,
.MenubarSubContent {
  min-width: 220px;
  background-color: white;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.MenubarItem,
.MenubarSubTrigger,
.MenubarCheckboxItem,
.MenubarRadioItem {
  all: unset;
  font-size: 13px;
  line-height: 1;
  color: var(--violet11);
  border-radius: 4px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 10px;
  position: relative;
  user-select: none;
}

.MenubarItem.inset,
.MenubarSubTrigger.inset,
.MenubarCheckboxItem.inset,
.MenubarRadioItem.inset {
  padding-left: 20px;
}

.MenubarItem[data-state='open'],
.MenubarSubTrigger[data-state='open'] {
  background-color: var(--violet4);
  color: var(--violet11);
}

.MenubarItem[data-highlighted],
.MenubarSubTrigger[data-highlighted],
.MenubarCheckboxItem[data-highlighted],
.MenubarRadioItem[data-highlighted] {
  background-image: linear-gradient(135deg, var(--violet9) 0%, var(--violet10) 100%);
  color: var(--violet1);
}

.MenubarItem[data-disabled],
.MenubarSubTrigger[data-disabled],
.MenubarCheckboxItem[data-disabled],
.MenubarRadioItem[data-disabled] {
  color: var(--mauve8);
  pointer-events: none;
}

.MenubarItemIndicator {
  position: absolute;
  left: 0;
  width: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.MenubarSeparator {
  height: 1px;
  background-color: var(--violet6);
  margin: 5px;
}

.RightSlot {
  margin-left: auto;
  padding-left: 20px;
  color: var(--mauve9);
}

[data-highlighted] > .RightSlot {
  color: white;
}

[data-disabled] > .RightSlot {
  color: var(--mauve8);
}
`;

return (
  <Wrapper>
    <Menubar.Root className="MenubarRoot">
      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">File</Menubar.Trigger>
        <Menubar.Content
          className="MenubarContent"
          align="start"
          sideOffset={5}
          alignOffset={-3}
        >
          <Menubar.Item className="MenubarItem">
            New Tab <div className="RightSlot">⌘ T</div>
          </Menubar.Item>
          <Menubar.Item className="MenubarItem">
            New Window <div className="RightSlot">⌘ N</div>
          </Menubar.Item>
          <Menubar.Item className="MenubarItem" disabled>
            New Incognito Window
          </Menubar.Item>
          <Menubar.Separator className="MenubarSeparator" />
          <Menubar.Sub>
            <Menubar.SubTrigger className="MenubarSubTrigger">
              Share
            </Menubar.SubTrigger>

            <Menubar.SubContent className="MenubarSubContent" alignOffset={-5}>
              <Menubar.Item className="MenubarItem">Email Link</Menubar.Item>
              <Menubar.Item className="MenubarItem">Messages</Menubar.Item>
              <Menubar.Item className="MenubarItem">Notes</Menubar.Item>
            </Menubar.SubContent>
          </Menubar.Sub>
          <Menubar.Separator className="MenubarSeparator" />
          <Menubar.Item className="MenubarItem">
            Print… <div className="RightSlot">⌘ P</div>
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">Edit</Menubar.Trigger>
        <Menubar.Content
          className="MenubarContent"
          align="start"
          sideOffset={5}
          alignOffset={-3}
        >
          <Menubar.Item className="MenubarItem">
            Undo <div className="RightSlot">⌘ Z</div>
          </Menubar.Item>
          <Menubar.Item className="MenubarItem">
            Redo <div className="RightSlot">⇧ ⌘ Z</div>
          </Menubar.Item>
          <Menubar.Separator className="MenubarSeparator" />
          <Menubar.Sub>
            <Menubar.SubTrigger className="MenubarSubTrigger">
              Find
            </Menubar.SubTrigger>

            <Menubar.SubContent className="MenubarSubContent" alignOffset={-5}>
              <Menubar.Item className="MenubarItem">
                Search the web…
              </Menubar.Item>
              <Menubar.Separator className="MenubarSeparator" />
              <Menubar.Item className="MenubarItem">Find…</Menubar.Item>
              <Menubar.Item className="MenubarItem">Find Next</Menubar.Item>
              <Menubar.Item className="MenubarItem">Find Previous</Menubar.Item>
            </Menubar.SubContent>
          </Menubar.Sub>
          <Menubar.Separator className="MenubarSeparator" />
          <Menubar.Item className="MenubarItem">Cut</Menubar.Item>
          <Menubar.Item className="MenubarItem">Copy</Menubar.Item>
          <Menubar.Item className="MenubarItem">Paste</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">View</Menubar.Trigger>
        <Menubar.Content
          className="MenubarContent"
          align="start"
          sideOffset={5}
          alignOffset={-14}
        >
          <Menubar.Item className="MenubarItem inset">
            Reload <div className="RightSlot">⌘ R</div>
          </Menubar.Item>
          <Menubar.Item className="MenubarItem inset" disabled>
            Force Reload <div className="RightSlot">⇧ ⌘ R</div>
          </Menubar.Item>
          <Menubar.Separator className="MenubarSeparator" />
          <Menubar.Item className="MenubarItem inset">
            Toggle Fullscreen
          </Menubar.Item>
          <Menubar.Separator className="MenubarSeparator" />
          <Menubar.Item className="MenubarItem inset">
            Hide Sidebar
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">Profiles</Menubar.Trigger>
        <Menubar.Content
          className="MenubarContent"
          align="start"
          sideOffset={5}
          alignOffset={-14}
        >
          <Menubar.RadioGroup
            value={state.radioSelection}
            onValueChange={setRadioSelection}
          >
            {RADIO_ITEMS.map((item) => (
              <Menubar.RadioItem
                className="MenubarRadioItem inset"
                key={item}
                value={item}
              >
                <Menubar.ItemIndicator className="MenubarItemIndicator">
                  X
                </Menubar.ItemIndicator>
                {item}
              </Menubar.RadioItem>
            ))}
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item className="MenubarItem inset">Edit…</Menubar.Item>
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item className="MenubarItem inset">
              Add Profile…
            </Menubar.Item>
          </Menubar.RadioGroup>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  </Wrapper>
);
