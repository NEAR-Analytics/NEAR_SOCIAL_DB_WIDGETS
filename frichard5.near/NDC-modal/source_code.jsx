const { component, isOpen } = props;
console.log("ISOPEN", isOpen);
State.init({
  isOpen,
});

const Modal = styled.div`
    width: 100%;
    height: 100%;
    background: grey;
    display: ${state.isOpen ? "block" : "none"}
`;

const ComponentWrapper = styled.div`
    width: 300px;
    height: 150px;
    background: red;
`;

const clickModal = (e) => {
  console.log("event", e);
  if (e.target.id === "modal") {
    State.update({ isOpen: !isOpen });
  }
};

return (
  <Modal id="modal" onClick={clickModal}>
    <ComponentWrapper id="modal-comp" className="component-wrapper">
      hey
    </ComponentWrapper>
  </Modal>
);
