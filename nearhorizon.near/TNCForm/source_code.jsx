return (
  <>
    <Dialog.Description>
      <Widget
        src={`${ownerId}/widget/Inputs.Checkbox`}
        props={{
          label: (
            <>
              By checking this box you acknowledge that you understand and agree
              with{" "}
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
  </>
);
