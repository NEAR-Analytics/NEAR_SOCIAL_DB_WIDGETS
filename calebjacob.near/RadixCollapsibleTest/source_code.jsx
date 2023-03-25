const Wrapper = styled.div`
button {
  all: unset;
}

.CollapsibleRoot {
  width: 300px;
}

.IconButton {
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--violet11);
  box-shadow: 0 2px 10px var(--blackA7);
}
.IconButton[data-state='closed'] {
  background-color: white;
}
.IconButton[data-state='open'] {
  background-color: var(--violet3);
}
.IconButton:hover {
  background-color: var(--violet3);
}
.IconButton:focus {
  box-shadow: 0 0 0 2px black;
}

.Text {
  color: var(--violet11);
  font-size: 15px;
  line-height: 25px;
}

.Repository {
  background-color: white;
  border-radius: 4px;
  margin: 10px 0;
  padding: 10px;
  box-shadow: 0 2px 10px var(--blackA7);
}
`;

State.init({
  open: false,
});

function setOpen(value) {
  State.update({ open: value });
}

return (
  <Wrapper>
    <Collapsible.Root
      className="CollapsibleRoot"
      open={state.open}
      onOpenChange={setOpen}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="Text">@peduarte starred 3 repositories</span>
        <Collapsible.Trigger asChild>
          <button className="IconButton">
            {state.open ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-arrows-collapse"></i>
            )}
          </button>
        </Collapsible.Trigger>
      </div>

      <div className="Repository">
        <span className="Text">@radix-ui/primitives</span>
      </div>

      <Collapsible.Content>
        <div className="Repository">
          <span className="Text">@radix-ui/colors</span>
        </div>
        <div className="Repository">
          <span className="Text">@stitches/react</span>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  </Wrapper>
);
