//props:
//receiverAccountId
//secretKeyBase64
//receiverPublicKeyBase64

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

Social.keys(`${accountId}/post/meme`, "final", {
  return_type: "History",
});

const incomingMessages = Social.index(
  "private_message",
  accountId.toLowerCase(),
  {
    subscribe: true,
    order: "desc",
    accountId: props.receiverAccountId.toLowerCase(),
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

const messages = outgoingMessages.concat(incomingMessages);

function renderMessage(senderAccountId, blockHeight) {
  const messageObject = Social.get(
    `${senderAccountId}/private_message/last_message/**`,
    blockHeight
  );

  const messageWithNonceAsUint8Array = new Uint8Array(
    new Buffer(messageObject.message_text_base64, "base64")
  );
  const nonce = messageWithNonceAsUint8Array.slice(0, nacl.box.nonceLength);
  const encryptedMessage = messageWithNonceAsUint8Array.slice(
    nacl.box.nonceLength,
    messageWithNonce.length
  );

  const messageTextUint8Array = nacl.box.open(
    encryptedMessage,
    nonce,
    new Uint8Array(
      new Buffer(messageObject.receiver_public_key_base64, "base64")
    ),
    new Uint8Array(new Buffer(props.secretKeyBase64, "base64"))
  );

  const messageText = messageTextUint8Array
    ? Buffer.from(messageTextUint8Array).toString()
    : null;

  return (
    <div className="card my-2 border-primary">
      <div className="card-header">
        <small class="text-muted">
          <div class="row justify-content-between">
            <div class="col-4">
              <Widget
                src={`mob.near/widget/ProfileLine`}
                props={{ accountId: senderAccountId }}
              />
            </div>
            <div class="col-4">
              <div class="d-flex justify-content-end">
                <Widget
                  src={`mob.near/widget/TimeAgo`}
                  props={{ blockHeight: blockHeight }}
                />
              </div>
            </div>
          </div>
        </small>
      </div>
      <div className="card-body">
        {messageText || "⚠️ error reading message with your private key"}
      </div>
    </div>
  );
}

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

    {messages.map((messageObject) =>
      renderMessage(messageObject.accountId, messageObject.blockHeight)
    )}
  </div>
);
