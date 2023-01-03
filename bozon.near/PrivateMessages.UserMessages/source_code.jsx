if (
  !props.accountId ||
  !props.secretKeyBase64 ||
  !props.receiverPublicKeyBase64 ||
  !props.onClose
) {
  return "Send accountId, secretKeyBase64, receiverPublicKeyBase64 and onClose() in props";
}

State.init({ message: "" });

const messages = Social.index("private_messages", "message", {
  subscribe: true,
  limit: 50,
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
            new Uint8Array(state.message),
            nacl.randomBytes(24),
            [
              Buffer.from(receiverPublicKeyBase64, "base64"),
              nacl.box.keyPair.fromSecretKey(
                Buffer.from(receiverPublicKeyBase64, "base64")
              ).publicKey,
            ]
          );

          return {
            // private_messages: {
            //   message: encryptedMessage,
            // },
            index: {
              private_messages: JSON.stringify({
                key: "message",
                value: {
                  message: encryptedMessage,
                },
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
