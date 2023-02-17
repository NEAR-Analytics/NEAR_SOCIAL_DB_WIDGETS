const ownerId = "contribut3.near";

State.init({
  content: props.content ?? "projects",
  search: props.search ?? "",
});

const header = (
  <div>
    <h1 className="fs-2">Inbox</h1>
    <p className="fw-semibold fs-5 text-muted">
      Manage invitations and proposals
    </p>
  </div>
);

return (
  <div>
    <div className="mb-3 px-3">
      <div className="d-flex flex-row justify-content-between mb-3">
        {header}
      </div>
    </div>
    <div className="px-3 pt-3"></div>
  </div>
);
