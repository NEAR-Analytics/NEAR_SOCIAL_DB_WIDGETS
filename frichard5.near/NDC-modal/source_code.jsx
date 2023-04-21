State.init({
  isOpen: true,
});

const Modal = styled.div`
    width: 100%;
    height: 100%;
    background: grey;
`;

const ComponentWrapper = styled.div`
    width: 300px;
    height: 150px;
    background: red;
`;

const clickModal = (e) => {
  console.log("event", e);
};

return (
  <Modal onClick={clickModal}>
    <ComponentWrapper className="component-wrapper">hey</ComponentWrapper>
  </Modal>
);
