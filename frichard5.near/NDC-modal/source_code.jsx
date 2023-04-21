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
      style={{ position: "absolute", right: "100px", top: "29%" }}
      onClick={closeModal}
    >
      <svg
        height="20px"
        class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="CloseIcon"
      >
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
      </svg>
    </button>
    <ComponentWrapper id="modal-comp" className="component-wrapper">
      {component}
    </ComponentWrapper>
  </Modal>
);
