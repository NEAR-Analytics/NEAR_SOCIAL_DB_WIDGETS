const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

if (
  !props.receiverAccountId ||
  !props.secretKeyBase64 ||
  !props.receiverPublicKeyBase64 ||
  !props.onClose
) {
  return "Send receiverAccountId, secretKeyBase64, receiverPublicKeyBase64 and onClose() in props";
}

State.init({ message: "" });

const messages = Social.index("private_message", accountId, {
  subscribe: true,
  order: "desc",
});

console.log(messages);

return (
  <div>
    <div class="d-flex flex-row align-items-center mb-3">
      <div class="col">
        <button class="btn btn-primary" onClick={props.onClose}>
          {"<"}
        </button>
      </div>
      <h1 class="col">Private Messages</h1>
      <div class="col"></div>
    </div>

    <div class="input-group mb-3">
      <input
        class="form-control"
        placeholder="Input message"
        onChange={(e) => {
          State.update({
            message: e.target.value,
          });
        }}
      ></input>
      <CommitButton
        data={() => {
          const encryptedMessage = nacl.box(
            new Uint8Array(Buffer.from(state.message)),
            nacl.randomBytes(24),
            new Uint8Array(
              Buffer.from(props.receiverPublicKeyBase64, "base64")
            ),
            nacl.box.keyPair.fromSecretKey(
              Buffer.from(props.secretKeyBase64, "base64")
            ).secretKey
          );

          return {
            private_message: {
              last_message: {
                message_text_base64:
                  Buffer.from(encryptedMessage).toString("base64"),
                receiver_public_key_base64: receiverPublicKeyBase64,
                receiver_account_id: receiverAccountId,
              },
            },
            index: {
              private_message: JSON.stringify({
                key: receiverAccountId,
                value: "",
              }),
            },
          };
        }}
      >
        Send
      </CommitButton>
    </div>
  </div>
);
