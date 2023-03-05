const TGAS = Math.pow(10, 12);
const CONTRACT = "nsbot.near";
const TRIGGERS = ["source", "user", "widget", "action"];
const MODAL_DEPLOY = "deployModal";
const MODAL_UPDATE = "updateModal";
const NEW_SCRIPT = {
  sid: "new",
  name: "New script",
  conditions: "[]",
  balance: "0",
};

const Header = styled.div`
    width: 100%;
    padding: 16px;
    border-bottom: 1px solid #333;
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
`;

const Page = styled.div`
    width: 100%;
    height: 100%;
    max-width: 800px;
    margin: auto;
    min-height: 600px;
    background-color: #1e1e1e;
`;

const ROUNDING_OFFSETS = [];
const BN10 = new BN(10);
let offset = new BN(5);
for (let i = 0; i < 30; i++) {
  ROUNDING_OFFSETS[i] = offset;
  offset = offset.mul(BN10);
}

const formatAmount = (balance) => {
  try {
    const nominal = 24;
    const fracDigits = 4;
    const balanceBN = new BN(balance, 10);
    if (fracDigits !== nominal) {
      const roundingExp = nominal - fracDigits - 1;
      if (roundingExp > 0) {
        balanceBN.iadd(ROUNDING_OFFSETS[roundingExp]);
      }
    }

    balance = balanceBN.toString();
    const wholeStr = balance.substring(0, balance.length - nominal) || "0";
    const fractionStr = balance
      .substring(balance.length - nominal)
      .padStart(nominal, "0")
      .substring(0, fracDigits);

    return `${wholeStr}.${fractionStr}`;
  } catch {
    return 0;
  }
};

function parseAmount(amt) {
  function trimLeadingZeroes(value) {
    value = value.replace(/^0+/, "");
    if (value === "") return "0";
    return value;
  }

  try {
    amt = amt.toString().replace(/,/g, "").trim();
    const split = amt.split(".");
    const wholePart = split[0];
    const fracPart = split[1] ? split[1].substring(0, 24) : "";
    return trimLeadingZeroes(wholePart + fracPart.padEnd(24, "0"));
  } catch (E) {
    return "0";
  }
}

State.init({
  modal: null,
  script: null,
  scripts: [],

  newAutocomplete: "",
  autocompletes: {
    source: JSON.parse(Storage.get("autocomplete:source") ?? '["data"]'),
    user: JSON.parse(Storage.get("autocomplete:user") ?? '["any"]'),
    widget: JSON.parse(Storage.get("autocomplete:widget") ?? '["index"]'),
    action: JSON.parse(
      Storage.get("autocomplete:action") ?? '["like", "subscribe", "comment"]'
    ),
  },
});

const loadScripts = () => {
  const keys = Near.view(CONTRACT, "get_keys") ?? [];
  const mykeys = keys.filter((key) => key.split(":")[0] === context.accountId);
  const scripts = Near.view(CONTRACT, "get_scripts", { keys: mykeys }) ?? [];
  State.update({
    scripts: scripts.map((script, i) => ({ ...script, sid: mykeys[i] })),
  });
};

const openScript = (script) => {
  State.update({
    script: {
      ...script,
      conditions: JSON.parse(script.conditions),
      code:
        Storage.get(`${script.sid}:code`, e.data) ??
        script.code ??
        exampleScript,
    },
  });
};

const deployScript = (script) => {
  const isNew = script.sid === "new";
  const newSid = context.accountId + ":" + Math.floor(Date.now() / 1000);

  State.update({ modal: null });
  Near.call(
    CONTRACT,
    isNew ? "add_script" : "edit_script",
    {
      sid: isNew ? newSid : script.sid,
      code: Storage.get(`${script.sid}:code`, e.data) ?? script.code ?? "",
      conditions: JSON.stringify(script.conditions),
      name: isNew ? script.name : undefined,
    },
    50 * TGAS,
    parseAmount(script.balance)
  );

  loadScripts();
};

const addDeposit = (script) => {
  Near.call(
    CONTRACT,
    "deposit",
    { sid: script.sid },
    20 * TGAS,
    parseAmount(script.balance)
  );
};

const removeScript = (script) => {
  Near.call(CONTRACT, "remove", { sid: script.sid }, 20 * TGAS, "1");
};

loadScripts();

if (state.script == null) {
  return (
    <Page style={{ padding: 16 }}>
      <button
        class="btn btn-outline-light font-monospace"
        onClick={() => openScript(NEW_SCRIPT)}
        style={{ width: "100%", height: 48, marginBottom: 16 }}
      >
        <i class="bi bi-plus-lg" /> Create new
      </button>

      <div class="list-group">
        {state.scripts.map((bot) => (
          <div
            style={{ cursor: "pointer", padding: 16 }}
            class="list-group-item list-group-item-action"
            onClick={() => openScript(bot)}
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="font-monospace mb-2">
                {bot.name ?? "Script"}
                <span class="badge text-bg-success">
                  {bot.calls_count} Calls
                </span>
              </h5>
            </div>
            <p class="font-monospace mb-1">
              Remaining balance: {formatAmount(bot.balance)} NEAR
            </p>
          </div>
        ))}
      </div>
    </Page>
  );
}

const setConditionPath = (value, index) => {
  const newArr = [...state.script.conditions];
  newArr[index] = value;
  State.update({
    script: {
      ...state.script,
      conditions: newArr,
    },
  });
};

const addAutocomplete = (value, index) => {
  const type = TRIGGERS[index];
  if (value === "" || state.autocompletes[type].includes(value)) return;
  const newSet = [...state.autocompletes[type], value];

  setConditionPath(state.newAutocomplete, index);
  Storage.set(`autocomplete:${type}`, JSON.stringify(newSet));
  State.update({
    newAutocomplete: "",
    autocompletes: {
      ...state.autocompletes,
      [type]: newSet,
    },
  });
};

const removeConditionPath = (index) => {
  State.update({
    script: {
      ...state.script,
      conditions: state.script.conditions.slice(0, index),
    },
  });
};

const ModalDeploy = (
  <div
    class={`modal fade ${state.modal !== MODAL_DEPLOY ? "" : "show d-block"}`}
    style={{ background: "rgba(0, 0, 0, 0.3)" }}
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title font-monospace">Deploy script</h5>
          <button
            onClick={() => State.update({ modal: null })}
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <div class="input-group flex-nowrap mb-2">
            <span
              style={{ width: 150 }}
              class="input-group-text font-monospace"
            >
              Script name
            </span>
            <input
              type="text"
              class="form-control font-monospace"
              placeholder="Like Callback"
              aria-describedby="addon-wrapping"
              value={state.script.name}
              onChange={(e) =>
                State.update({
                  script: {
                    ...state.script,
                    name: e.target.value,
                  },
                })
              }
            />
          </div>

          <div class="input-group flex-nowrap mb-2">
            <span
              style={{ width: 150 }}
              class="input-group-text font-monospace"
            >
              Deposit
            </span>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              class="form-control font-monospace"
              aria-describedby="addon-wrapping"
              value={state.script.balance}
              onChange={(e) =>
                State.update({
                  script: {
                    ...state.script,
                    balance: e.target.value,
                  },
                })
              }
            />
            <span class="input-group-text font-monospace">NEAR</span>
          </div>

          <div class="alert alert-primary" style={{ marginBottom: -4 }}>
            Your deposit on this script. After the deployment, you will be able
            to track the balance and replenish it for new calls. Used only for
            payable calls.
          </div>
        </div>

        <div class="modal-footer">
          <button
            class="btn btn-success font-monospace"
            onClick={() => deployScript(state.script)}
          >
            Deploy
          </button>
        </div>
      </div>
    </div>
  </div>
);

const UpdateModal = (
  <div
    class={`modal fade ${state.modal !== MODAL_UPDATE ? "" : "show d-block"}`}
    style={{ background: "rgba(0, 0, 0, 0.3)" }}
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title font-monospace">Are you sure?</h5>
          <button
            onClick={() => State.update({ modal: null })}
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <div class="alert alert-warning" style={{ marginBottom: -4 }}>
            This action cannot be undone
          </div>
        </div>

        <div class="modal-footer">
          <button
            class="btn btn-success font-monospace"
            onClick={() => deployScript(state.script)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
);

const render = () => (
  <Page>
    <Header>
      <button
        class="btn btn-light font-monospace"
        onClick={() => State.update({ script: null })}
      >
        <i class="bi bi-arrow-left" /> Back
      </button>

      <p class="font-monospace" style={{ color: "#fff", margin: 0 }}>
        {bot?.name ?? "New script"}
      </p>

      {state.script.sid === "new" && (
        <button
          class="btn btn-light font-monospace"
          onClick={() => State.update({ modal: MODAL_DEPLOY })}
        >
          <i class="bi bi-play-fill" /> Deploy
        </button>
      )}

      {state.script.sid !== "new" && (
        <button
          class="btn btn-light font-monospace"
          onClick={() => State.update({ modal: MODAL_UPDATE })}
        >
          <i class="bi bi-box-fill" /> Update
        </button>
      )}
    </Header>

    {ModalDeploy}
    {UpdateModal}

    <iframe
      srcDoc={code}
      style={{ width: "100%", height: "calc(100% - 260px)" }}
      message={state.script.code ?? ""}
      onMessage={(e) => {
        Storage.set(`${state.script.sid}:code`, e);
      }}
    />

    <div
      style={{
        padding: 16,
        background: "rgba(255, 255, 255, 0.1)",
        borderTop: "1px solid #fff",
        width: "100%",
        height: 200,
      }}
    >
      <p
        class="font-monospace"
        style={{ color: "#fff", margin: 0, marginBottom: 16 }}
      >
        Setup trigger:
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        {TRIGGERS.slice(0, state.script.conditions.length + 1).map(
          (trigger, index) => (
            <div>
              <div class="btn-group">
                {index !== state.script.conditions.length && (
                  <button
                    class="btn btn-danger"
                    onClick={() => removeConditionPath(index)}
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                )}

                <button
                  style={{
                    textAlign: "left",
                    maxWidth: 200,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  class="btn btn-light dropdown-toggle"
                  data-bs-toggle="dropdown"
                  type="button"
                >
                  {state.script.conditions[index] || `Select ${trigger}`}
                </button>
                <ul
                  class="dropdown-menu"
                  style={{
                    borderRadius: 12,
                    paddingTop: 0,
                    width: 200,
                    overflow: "hidden",
                  }}
                >
                  <div class="input-group mb-2">
                    <input
                      class="form-control"
                      value={state.newAutocomplete}
                      onKeyUp={(e) => {
                        if (e.key === "Enter")
                          addAutocomplete(state.newAutocomplete, index);
                      }}
                      onChange={(e) => {
                        State.update({ newAutocomplete: e.target.value });
                      }}
                      placeholder="Add custom"
                      style={{
                        boxShadow: "none",
                        border: "none",
                        borderBottom: "1px solid #000",
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                    />
                    <button
                      onClick={() =>
                        addAutocomplete(state.newAutocomplete, index)
                      }
                      type="submit"
                      class="btn btn-primary"
                      style={{
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                    >
                      <i class="bi bi-plus-lg" />
                    </button>
                  </div>

                  {state.autocompletes[trigger].map((option) => (
                    <li
                      class="btn dropdown-item"
                      onClick={() => setConditionPath(option, index)}
                      style={{
                        overflow: "hidden",
                        width: 200,
                        paddingRight: 16,
                        textOverflow: "ellipsis",
                        fontWeight: option === conditions[index] ? 800 : 400,
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  </Page>
);

const exampleScript = `const data = get_Input();

function_Call({ 
    receiver: data.user,
    deposit: 10, 
    methodName: "test", 
    args: "" 
})`;

const code = `
<style>
html, body, #container {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	overflow: hidden;
}
</style>
<div id="container"></div>
<script src="https://unpkg.com/monaco-editor@latest/min/vs/loader.js"></script>
<script>
require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' }});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };
let proxy = URL.createObjectURL(new Blob(['self.MonacoEnvironment = {baseUrl: "https://unpkg.com/monaco-editor@latest/min/" };importScripts("https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js")'], { type: 'text/javascript' }));

require(["vs/editor/editor.main"], function () {
	let editor = monaco.editor.create(document.getElementById('container'), {
		value: '',
		language: 'javascript',
    width: '100%',
    fontSize: 16,
		theme: 'vs-dark'
	});

    editor.getModel().onDidChangeContent(e => {
      parent.postMessage(editor.getModel().getValue(), "*")
    })

    window.addEventListener("message", (e) => {
      editor.getModel().setValue(e.data)
    }, { once: true })
});
</script>
`;

return render();
