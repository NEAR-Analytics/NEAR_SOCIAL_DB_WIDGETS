const ownerId = "nearhorizon.near";

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CloseButton = styled.a`
  padding: 0.75em 1em;
  gap: 0.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #101828;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 200ms ease-out;
  z-index: 10;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: fixed;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  border: none;
  padding: 1.5em 2em 2em;
  gap: 0.625em;
  isolation: isolate;
  animation: ${slideIn} 200ms ease-out;
  overflow-y: auto;
  background: #fff;
  z-index: 10;
  min-width: ${minWidth};
  max-width: 800px;

  &.focus-visible {
    outline: none;
  }
`;

State.init({
  agree: false,
});

console.log(props.open);

return (
  <Dialog.Root open={props.open}>
    <Dialog.Trigger asChild>
      <div style={{ display: "none" }} />
    </Dialog.Trigger>
    <Dialog.Overlay asChild>
      <Overlay />
    </Dialog.Overlay>
    <Dialog.Content asChild>
      <Content>
        <Dialog.Title>Terms and Conditions</Dialog.Title>
        <Dialog.Description>
          <Widget
            src={`${ownerId}/widget/Inputs.Checkbox`}
            props={{
              label: (
                <>
                  By checking this box you acknowledge that you understand and
                  agree with{" "}
                  <a href={`${ownerId}/widget/TNCPage`}>
                    NEAR Horizon Terms and Conditions
                  </a>
                </>
              ),
              value: state.agree,
              id: "agree",
              onChange: (agree) => {
                console.log(agree);
                State.update({ agree: !state.agree });
              },
            }}
          />
        </Dialog.Description>
        <Footer>
          <Dialog.Close asChild>
            <CloseButton href="/">Close</CloseButton>
          </Dialog.Close>
          <Widget
            src={`${ownerId}/widget/Buttons.Green`}
            props={{
              text: <>Accept</>,
              disabled: !state.agree,
              onClick: () => {
                if (!state.agree) return;
                props.accept();
              },
            }}
          />
        </Footer>
      </Content>
    </Dialog.Content>
  </Dialog.Root>
);
