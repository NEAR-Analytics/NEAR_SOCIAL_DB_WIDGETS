const { component, isOpen, toggleModal } = props;

State.init({
  isOpen,
});

if (state.isOpen != isOpen) State.update({ isOpen });

const Modal = styled.div`
    position: absolute;
    z-index:100;
    top: 0px;
    width: 100%;
    height: 100vh;
    display: ${state.isOpen ? "block" : "none"};
    background: rgba(128,128,128,0.65);
`;

const ComponentWrapper = styled.div`
    position:absolute;
    width: 100%;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;

const closeModal = () => {
  toggleModal(false);
};

return (
  <Modal id="modal">
    <button
      style={{ position: "absolute", right: "30px" }}
      onClick={closeModal}
    >
      Close
    </button>
    <ComponentWrapper id="modal-comp" className="component-wrapper">
      {component}
    </ComponentWrapper>
  </Modal>
);
