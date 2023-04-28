const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CloseButton = styled.button`
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

State.init({
  agree: false,
});

return (
  <Dialog.Root open={props.open} onOpenChange={(open) => props.update(open)}>
    <Dialog.Overlay />
    <Dialog.Content>
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
            onChange: (agree) => State.update({ agree }),
          }}
        />
      </Dialog.Description>
      <Footer>
        <Dialog.Close asChild>
          <CloseButton>Close</CloseButton>
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
    </Dialog.Content>
  </Dialog.Root>
);
