if (!context.accountId) {
  return "";
}

return (
  <div className="text-bg-light rounded-4">
    <div className="p-2">
      <textarea
        className="form-control border-0 text-bg-light w-100"
        placeholder="What's happening?"
      />
    </div>
    <div className="d-flex flex-row p-2 border-top">
      <div className="flex-grow-1">
        <button className="btn btn-outline-secondary border-0 rounded-3">
          <i className="bi bi-image" />
          Add Image
        </button>
      </div>
      <div>
        <button className="btn btn-dark rounded-3">Post</button>
      </div>
    </div>
  </div>
);
