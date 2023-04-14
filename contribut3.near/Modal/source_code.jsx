const title = props.title;
const body = props.body;
const confirmText = props.confirmText;
const onConfirm = props.onConfirm;
const hidden = props.hidden;

return (
  <div
    className={`modal fade ${hidden ? "" : "show d-block"}`}
    aria-hidden={hidden}
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <a className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">{body}</div>
        <div className="modal-footer justify-content-between">
          <a className="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </a>
          <a className="btn btn-primary" onClick={onConfirm}>
            {confirmText}
          </a>
        </div>
      </div>
    </div>
  </div>
);
