const { component, isOpen, toggleModal } = props;

State.init({
  isOpen,
});

if (state.isOpen != isOpen) State.update({ isOpen });
console.log("STAEOPEN", state.isOpen);
const Modal = styled.div`
    position: absolute;
    z-index:100;
    top: 0px;
    width: 100%;
    height: 100vh;
    display: ${state.isOpen ? "block" : "none"}
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
    <button onClick={closeModal}>Close</button>
    <ComponentWrapper id="modal-comp" className="component-wrapper">
      {component}
    </ComponentWrapper>
  </Modal>
);
