//props:
//secretKeyBase64 : string base64
//receiverAccountId : string base64
//receiverPublicKeyBase64 : string base64

const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

if (
  !props.receiverAccountId ||
  !props.secretKeyBase64 ||
  !props.receiverPublicKeyBase64
) {
  return "Send receiverAccountId, secretKeyBase64, receiverPublicKeyBase64  in props";
}

function uniteAccountId(accountId0, accountId1) {
  accountId0 = accountId0.toLowerCase();
  accountId1 = accountId1.toLowerCase();
  return accountId0 > accountId0
    ? accountId0 + accountId1
    : accountId1 + accountId0;
}

State.init({ message: "" });

const incomingMessages = Social.index(
  "private_message",
  accountId.toLowerCase(),
  {
    subscribe: true,
    order: "desc",
    accountId: props.receiverAccountId,
  }
);

const outgoingMessages = Social.index(
  "private_message",
  props.receiverAccountId.toLowerCase(),
  {
    subscribe: true,
    order: "desc",
    accountId: accountId.toLowerCase(),
  }
);

if (incomingMessages === null || outgoingMessages === null) return "Loading...";

const messages = outgoingMessages.concat(incomingMessages);

return (
  <div>
    <div class="input-group mb-3">
      <textarea
        class="form-control"
        placeholder="Input message"
        onChange={(e) => {
          State.update({
            message: e.target.value,
          });
        }}
      ></textarea>
      <CommitButton
        force
        data={() => {
          const nonce = nacl.randomBytes(nacl.box.nonceLength);

          const encryptedMessage = nacl.box(
            new Uint8Array(Buffer.from(state.message)),
            nonce,
            new Uint8Array(
              Buffer.from(props.receiverPublicKeyBase64, "base64")
            ),
            nacl.box.keyPair.fromSecretKey(
              Buffer.from(props.secretKeyBase64, "base64")
            ).secretKey
          );

          const fullMessage = new Uint8Array(
            nonce.length + encryptedMessage.length
          );
          fullMessage.set(nonce);
          fullMessage.set(encryptedMessage, nonce.length);

          return {
            private_message: {
              last_message: {
                message_text_base64:
                  Buffer.from(fullMessage).toString("base64"),
                receiver_public_key_base64: props.receiverPublicKeyBase64,
                receiver_account_id: props.receiverAccountId,
              },
            },
            index: {
              private_message: JSON.stringify([
                {
                  key: props.receiverAccountId.toLowerCase(),
                  value: {
                    version: "0",
                  },
                },
              ]),
            },
          };
        }}
      >
        Send
      </CommitButton>
    </div>

    {messages.map((messageObject) => (
      <Widget
        src="bozon.near/widget/PrivateMessage.Message"
        props={{
          secretKeyBase64: props.secretKeyBase64,
          blockHeight: messageObject.blockHeight,
          senderAccountId: messageObject.accountId,
        }}
      />
    ))}
  </div>
);
