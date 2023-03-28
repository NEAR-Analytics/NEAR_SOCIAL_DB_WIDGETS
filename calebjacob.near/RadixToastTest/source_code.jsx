State.init({
  open: false,
});

function setOpen(value) {
  State.update({
    open: value,
  });
}

const Wrapper = styled.div`
/* reset */
button {
  all: unset;
}

.ToastViewport {
  --viewport-padding: 25px;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
}

.ToastRoot {
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: 'title action' 'description action';
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;
}
.ToastRoot[data-state='open'] {
  animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
.ToastRoot[data-state='closed'] {
  animation: hide 100ms ease-in;
}
.ToastRoot[data-swipe='move'] {
  transform: translateX(var(--radix-toast-swipe-move-x));
}
.ToastRoot[data-swipe='cancel'] {
  transform: translateX(0);
  transition: transform 200ms ease-out;
}
.ToastRoot[data-swipe='end'] {
  animation: swipeOut 100ms ease-out;
}

@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
  to {
    transform: translateX(0);
  }
}

@keyframes swipeOut {
  from {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }
  to {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
}

.ToastTitle {
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  color: var(--slate12);
  font-size: 15px;
}

.ToastDescription {
  grid-area: description;
  margin: 0;
  color: var(--slate11);
  font-size: 13px;
  line-height: 1.3;
}

.ToastAction {
  grid-area: action;
}

.Button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
}
.Button.small {
  font-size: 12px;
  padding: 0 10px;
  line-height: 25px;
  height: 25px;
}
.Button.large {
  font-size: 15px;
  padding: 0 15px;
  line-height: 35px;
  height: 35px;
}
.Button.violet {
  background-color: white;
  color: var(--violet11);
  box-shadow: 0 2px 10px var(--blackA7);
}
.Button.violet:hover {
  background-color: var(--mauve3);
}
.Button.violet:focus {
  box-shadow: 0 0 0 2px black;
}
.Button.green {
  background-color: var(--green2);
  color: var(--green11);
  box-shadow: inset 0 0 0 1px var(--green7);
}
.Button.green:hover {
  box-shadow: inset 0 0 0 1px var(--green8);
}
.Button.green:focus {
  box-shadow: 0 0 0 2px var(--green8);
}`;

return (
  <Wrapper>
    <Toast.Provider swipeDirection="right">
      <button
        className="Button large violet"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add to calendar
      </button>

      <Toast.Root
        className="ToastRoot"
        open={state.open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="ToastTitle">Scheduled: Catch up</Toast.Title>
        <Toast.Description asChild>Some description here.</Toast.Description>
        <Toast.Action
          className="ToastAction"
          asChild
          altText="Goto schedule to undo"
        >
          <button className="Button small green">Undo</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  </Wrapper>
);
