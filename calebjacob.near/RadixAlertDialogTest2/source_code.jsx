const Button = styled.button`
  background: var(--amber10);
`;

return (
  <AlertDialog.Root>
    <AlertDialog.Trigger>Do Action</AlertDialog.Trigger>

    <AlertDialog.Overlay />

    <AlertDialog.Content>
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
    </AlertDialog.Content>
  </AlertDialog.Root>
);
