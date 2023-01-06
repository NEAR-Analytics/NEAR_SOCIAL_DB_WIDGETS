const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const registeredPublicKey = Social.get(
  `${accountId}/private_message/public_key`
);
const savedSecretKeyBase64 = Storage.privateGet("secretKey");

if (savedSecretKeyBase64 === null || registeredPublicKey === null)
  return "Loading";

State.init({
  selectedUser,

  registerPage: false,
  loginPage: !savedSecretKeyBase64 ? true : false,
  userListPage: savedSecretKeyBase64 ? true : false,
});

function renderLoginPage() {
  return (
    <div>
      <div class="d-flex flex-row align-items-center mb-3">
        <div class="col"></div>
        <h1 class="col">MailBox Login</h1>
        <div class="col"></div>
      </div>
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
                  savedSecretKeyBase64: secretKey,
                });
              }
            } catch {
              State.update({ errorInputSecretKey: "⚠️ invalid secret key" });
            }
          }}
        >
          Sign in
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={() => State.update({ registerPage: true })}
        >
          Register
        </button>
      </div>
    </div>
  );
}

if (state.registerPage) {
  return (
    <div>
      <div class="d-flex flex-row align-items-center mb-3">
        <div class="col">
          <button
            class="btn btn-secondary
            float-right"
            onClick={() => {
              State.update({ registerPage: false });
            }}
          >
            {"<"}
          </button>
        </div>
        <h1 class="col">MailBox Register</h1>
        <div class="col"></div>
      </div>
      <Widget
        src="bozon.near/widget/PrivateMailBox.Register"
        props={{
          onRegisterComplete: () => {
            State.update({ registerPage: false });
          },
        }}
      />
    </div>
  );
}

if (state.selectedUser) {
  console.log({
    receiverAccountId: state.selectedUser.accountId,
    secretKeyBase64: savedSecretKeyBase64,
    receiverPublicKeyBase64: state.selectedUser.publicKeyBase64,
  });
  return (
    <div>
      <div class="d-flex flex-row align-items-center mb-3">
        <div class="col">
          <button
            class="btn btn-secondary
            float-right"
            onClick={() => {
              State.update({ selectedUser: null });
            }}
          >
            {"<"}
          </button>
        </div>
        <div class="col">
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{
              accountId: state.selectedUser.accountId,
            }}
          />
        </div>
        <div class="col"></div>
      </div>
      <Widget
        src="bozon.near/widget/PrivateMailBox.UserMessages"
        props={{
          receiverAccountId: state.selectedUser.accountId,
          secretKeyBase64: savedSecretKeyBase64,
          receiverPublicKeyBase64: state.selectedUser.publicKeyBase64,
        }}
      />
    </div>
  );
}

if (!savedSecretKeyBase64) return renderLoginPage();
else if (savedSecretKeyBase64)
  return (
    <div>
      <div class="d-flex flex-row align-items-center mb-3">
        <div class="col"></div>
        <h1 class="col">Private MailBox</h1>
        <div class="col d-flex justify-content-end">
          <button
            class="btn btn-danger 
            float-right"
            onClick={() => {
              Storage.privateSet("secretKey", undefined);
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <Widget
        src="bozon.near/widget/PrivateMailBox.UserList"
        props={{
          secretKeyBase64: savedSecretKeyBase64,
          onSelectedUser: (accountId, publicKeyBase64) => {
            State.update({ selectedUser: { accountId, publicKeyBase64 } });
          },
        }}
      />
    </div>
  );
