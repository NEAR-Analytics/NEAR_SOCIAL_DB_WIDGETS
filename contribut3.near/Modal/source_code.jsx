const title = props.title;
const body = props.body;
const confirmText = props.confirmText;
const onConfirm = props.onConfirm;
const hidden = props.hidden;
const onClose = props.onClose;

const Modal = styled.div`
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  position: relative;
  inset: 0;
  justify-content: center;
  align-items: center;
`;

const ModalBackgrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.4;
`;

const ModalDialog = styled.div`
  background-color: white;
  border-radius: 4px;
  width: 40%;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

return (
  <div
    className={`modal fade ${hidden ? "" : "show d-block"}`}
    data-bs-backdrop="static"
    tabIndex="-1"
    aria-hidden={hidden}
  >
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <a
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={onClose}
          />
        </div>
        <div className="modal-body">{body}</div>
        <div className="modal-footer justify-content-between">
          <a
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={onClose}
          >
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
