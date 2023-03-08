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

const ModalBackdrop = styled.div`
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

const ModalBody = styled.div``;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

return (
  <Modal hidden={hidden}>
    <ModalBackdrop />
    <ModalDialog>
      <ModalHeader>
        <h5 className="modal-title">{title}</h5>
        <a
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={onClose}
        />
      </ModalHeader>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>
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
      </ModalFooter>
    </ModalDialog>
  </Modal>
);
