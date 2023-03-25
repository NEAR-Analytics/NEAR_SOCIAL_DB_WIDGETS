const Button = styled.button`
  background: var(--amber10);
`;

const Overlay = styled("AlertDialog.Overlay")`
  background-color: var(--blackA9);
  position: fixed;
  inset: 0;
`;

const Content = styled("AlertDialog.Content")`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
`;

return (
  <AlertDialog.Root>
    <AlertDialog.Trigger>Do Action</AlertDialog.Trigger>

    <Overlay />

    <Content>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>

      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialog.Description>

      <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>

        <AlertDialog.Action asChild>
          <Button>Okay</Button>
        </AlertDialog.Action>
      </div>
    </Content>
  </AlertDialog.Root>
);
