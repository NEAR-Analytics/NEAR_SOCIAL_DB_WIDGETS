State.init({ message: "" });
const storedMessage = Storage.privateGet("message");
return (
  <div className="d-flex flex-column gap-2">
    <span>
      Message: <span>{storedMessage}</span>
    </span>
    <input type="text" placeholder="message" value={state.message} />
    <button
      className="btn btn-outline-secondary"
      onClick={() => {
        Storage.privateSet("message", state.message);
      }}
    >
      Save
    </button>
  </div>
);
