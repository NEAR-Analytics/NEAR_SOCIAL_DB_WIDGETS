State.init({
  agree: false,
});

return (
  <Dialog.Root>
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
      <Dialog.Close />
    </Dialog.Content>
  </Dialog.Root>
);
