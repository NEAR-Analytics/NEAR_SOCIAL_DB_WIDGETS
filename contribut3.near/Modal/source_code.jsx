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

const CloseButton = styled.button`
  padding: 0.7em;
  border-radius: 4px;
  border: 0;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  color: #344054;
`;

return (
  <Modal hidden={hidden}>
    <ModalBackdrop />
    <ModalDialog>
      <ModalHeader>
        <h5>{title}</h5>
        <a
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={onClose}
        />
        <CloseButton>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 5L5.5 15M5.5 5L15.5 15"
              stroke="currentColor"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </CloseButton>
      </ModalHeader>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>
        <a
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={onClose}
        >
          Cancel
        </a>
        <a className="btn btn-primary" onClick={onConfirm}>
          {confirmText}
        </a>
      </ModalFooter>
    </ModalDialog>
  </Modal>
);
