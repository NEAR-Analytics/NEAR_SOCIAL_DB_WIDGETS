State.init({ isModal: false, editor: null });

const script = `
functionCall({ ... })
`;

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
		value: 'functionCall({ })',
		language: 'javascript',
        fontSize: 16,
		theme: 'vs-dark'
	});

    window.addEventListener("message", (e) => {
        console.log(e)
    })
});
</script>
`;

const Header = styled.div`
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
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
    min-height: 600px;
    background-color: #1e1e1e;
`;

const Modal = (
  <div
    className={`modal fade ${!state.isModal ? "" : "show d-block"}`}
    style={{ background: "rgba(0, 0, 0, 0.3)" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Deploy script</h5>
          <button
            onClick={() => State.update({ isModal: false })}
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body"></div>
        <div className="modal-footer">
          <button className="btn btn-success" onClick={onConfirm}>
            Deploy
          </button>
        </div>
      </div>
    </div>
  </div>
);

const scripts = [
  {
    id: "0",
    deposit: 3,
    name: "My awesome trigger",
    created: Date.now(),
    count: 103,
  },
];

if (state.editor == null) {
  return (
    <Page style={{ padding: 16 }}>
      <button
        class="btn btn-outline-light"
        style={{
          width: "100%",
          height: 48,
          marginBottom: 16,
          fontWeight: "bolder",
        }}
        onClick={() => State.update({ editor: "new" })}
      >
        <i class="bi bi-plus-lg" /> Create new
      </button>

      <div class="list-group">
        {scripts.map((bot) => (
          <div
            style={{ cursor: "pointer", padding: 16 }}
            class="list-group-item list-group-item-action"
            onClick={() => State.update({ editor: bot.id })}
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="font-monospace mb-2">{bot.name}</h5>
            </div>
            <p class="font-monospace mb-1">Deposit: 2 NEAR</p>
            <small class="font-monospace">
              Created: {new Date(bot.created).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </Page>
  );
}

const bot = scripts.find((t) => t.id === state.editor);
const d = Near.view("nearsocialexamples.near", "get_greeting");

return (
  <Page>
    <Header>
      <button
        class="btn btn-light"
        onClick={() => State.update({ editor: null })}
      >
        <i class="bi bi-arrow-left" /> Back
      </button>

      <p class="font-monospace" style={{ color: "#fff", margin: 0 }}>
        {bot?.name ?? "New script"}
      </p>

      <button
        class="btn btn-light"
        onClick={() => State.update({ isModal: true })}
      >
        <i class="bi bi-play-fill" /> Deploy
      </button>
    </Header>

    {Modal}

    <iframe
      ref={iframeRef}
      style={{ width: "100%", height: "calc(100% - 60px)" }}
      srcDoc={code}
      onMessage={props.onChange}
    />
  </Page>
);
