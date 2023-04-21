const { component, isOpen, toggleModal } = props;

State.init({
  isOpen,
});

if (state.isOpen != isOpen) State.update({ isOpen });
console.log("STAEOPEN", state.isOpen);
const Modal = styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100vh;
    display: ${state.isOpen ? "block" : "none"}
`;

const ComponentWrapper = styled.div`
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 300px;
    height: 150px;
    background: red;

`;

const clickModal = () => {
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
