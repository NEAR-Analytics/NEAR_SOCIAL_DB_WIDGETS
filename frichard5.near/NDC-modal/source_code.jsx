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
    height: 100%;
    background: rgba(128,128,128,0.65);
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

const clickModal = (e) => {
  console.log("event", e);
  if (e.target.id === "modal") {
    toggleModal(!isOpen);
  }
};

return (
  <Modal id="modal" onClick={clickModal}>
    <ComponentWrapper id="modal-comp" className="component-wrapper">
      hey
    </ComponentWrapper>
  </Modal>
);
