State.init({
  httpMethod: "GET",
  httpUrl: undefined,
  httpBody: undefined,
  output: {},
  status: undefined,
  ok: undefined,
});

const handleHttpCall = () => {
  const httpMethod = state.httpMethod;
  const httpUrl = state.httpUrl;
  const httpBody = state.httpBody;

  if (!httpUrl) {
    return;
  }

  asyncFetch(httpUrl, {
    method: httpMethod,
    body: httpBody,
  }).then((res) => {
    const { body, status, ok } = res;

    State.update({
      output: body,
      status,
      ok,
    });
    console.log(res);
  });
};

return (
  <div className="container">
    <div className="row" style={{ marginTop: 30 }}>
      <div className="input-group">
        <select
          className="custom-select"
          value={state.httpMethod}
          onChange={(e) => State.update({ httpMethod: e.target.value })}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          className="form-control"
          placeholder="http://example.com/api"
          value={state.httpUrl}
          onChange={(e) => State.update({ httpUrl: e.target.value })}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleHttpCall}
          >
            Send
          </button>
        </div>
      </div>
    </div>
    <div className="row mt-3">
      <div class="form-outline mb-4">
        <label class="form-label h4" for="bodyTextArea">
          Body
        </label>
        <textarea
          class="form-control"
          id="bodyTextArea"
          rows="10"
          value={state.httpBody}
          onChange={(e) => State.update({ httpBody: e.target.httpBody })}
        ></textarea>
      </div>

      <div class="form-outline mb-4">
        <label class="form-label h4" for="outputTextArea">
          Output
          <span className="badge" style={{ color: state.ok ? "green" : "red" }}>
            {state.status}
            {state.status ? (state.ok ? "OK" : "ERROR") : ""}
          </span>
        </label>

        <textarea
          class="form-control"
          id="outputTextArea"
          rows="10"
          style={{ height: "80vh" }}
          value={JSON.stringify(state.output, undefined, 4)}
          readOnly={true}
        ></textarea>
      </div>
    </div>
  </div>
);
