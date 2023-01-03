const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const registeredPublicKey = Social.get(
  `${accountId}/private_message/public_key`
);
const savedSecretKey = Storage.privateGet("secretKey");
const follows = Social.get(`${accountId}/graph/follow/**`);

const allFollowers = follows
  ? Object.keys(follows).map((f) => {
      return f;
    })
  : [];

if (savedSecretKey === null || registeredPublicKey === null) return "Loading";

State.init({
  selectedUser,
  followers: allFollowers,
});

function renderLoginPage() {
  return (
    <div>
      <h1 class="mb-3 text-center">Login</h1>
      {registeredPublicKey && (
        <div>
          <label class="mb-3">You registered using this public key:</label>
          <input
            class="form-control mb-3"
            value={registeredPublicKey}
            disabled
          />
        </div>
      )}

      <input
        class="form-control mb-3"
        placeholder="Input secret key"
        key="inputSecret"
        onChange={(e) => State.update({ inputSecretKey: e.target.value })}
      />
      <label class="mb-3">{state.errorInputSecretKey}</label>
      <div>
        <button
          onClick={() => {
            try {
              const keyPairFromSaved = nacl.box.keyPair.fromSecretKey(
                Buffer.from(state.inputSecretKey, "base64")
              );

              if (
                Buffer.from(keyPairFromSaved.publicKey).toString("base64") !=
                registeredPublicKey
              ) {
                State.update({ errorInputSecretKey: "⚠️ key does not fit" });
              } else {
                const secretKey = Buffer.from(
                  keyPairFromSaved.secretKey
                ).toString("base64");
                Storage.privateSet("secretKey", secretKey);
                State.update({
                  savedSecretKey: secretKey,
                });
              }
            } catch {
              State.update({ errorInputSecretKey: "⚠️ invalid secret key" });
            }
          }}
        >
          Sign in
        </button>

        <a
          className="btn btn-outline-primary"
          href={`#/bozon.near/widget/PrivateMessages.Register`}
        >
          Register
        </a>
      </div>
    </div>
  );
}

if (state.selectedUser) {
  return (
    <Widget
      src="bozon.near/widget/PrivateMessages.UserMessages"
      props={{
        accountId: state.selectedUser.accountId,
        secretKeyBase64: savedSecretKey,
        receiverPublicKeyBase64: state.selectedUser.publicKeyBase64,
        onClose: () => State.update({ selectedUser: null }),
      }}
    />
  );
} else if (!savedSecretKey) return renderLoginPage();
else if (savedSecretKey)
  return (
    <Widget
      src="bozon.near/widget/PrivateMessages.UserList"
      props={{
        secretKey: savedSecretKey,
        onSelectedUser: (accountId, publicKeyBase64) => {
          State.update({ selectedUser: { accountId, publicKeyBase64 } });
        },
      }}
    />
  );
