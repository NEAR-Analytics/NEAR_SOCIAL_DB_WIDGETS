//rops
//props.secretKeyBase64 : string base64
//blockHeight? : number || unknown date
//senderAccountId? : string || current account id

if (!props.secretKeyBase64) return "send secretKeyBase64 in props";

const messageObject = Social.get(
  `${
    props.senderAccountId || context.accountId
  }/private_message/last_message/**`,
  blockHeight
);

const messageWithNonceUint8Array = new Uint8Array(
  new Buffer(messageObject.message_text_base64, "base64")
);
const nonce = messageWithNonceUint8Array.slice(0, nacl.box.nonceLength);
const encryptedMessage = messageWithNonceUint8Array.slice(
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
