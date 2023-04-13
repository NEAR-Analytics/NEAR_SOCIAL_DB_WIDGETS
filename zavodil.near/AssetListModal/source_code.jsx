const title = props.title ?? "Select a token";
const body = props.body;
const assets = props.assets;
const debug = props.debug;

const css = `
* {
    font-family: 'Inter custom',sans-serif;
}
.asset-list-container{
    background-color: rgb(255, 255, 255);
    width: 100%;
    overflow: hidden;
    flex: 1 1 0%;
    position: relative;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
}
.asset-list-header {
    padding-left: 20px;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 500;
    font-size: 16px;
}
`;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}`,
  });
}

const Theme = state.theme;

State.init({
  hidden: props.hidden ?? false,
});

const ShowModal = () => State.update({ hidden: false });

const defaultClose = () => {
  State.update({ hidden: true });
};

const onClose = props.onClose ?? defaultClose;

let hidden = state.hidden ?? false;

const Modal = styled.div`
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  position: fixed;
  inset: 0;
  justify-content: center;
  align-items: center;
  opacity: 1;
  z-index: 1;
`;

const ModalBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.4;
`;

const ModalDialog = styled.div`
  padding: 20px;
  z-index: 3;
  background-color: white;
  border-radius: 20px;
  width: 40%;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const CloseButton = styled.button`
  background-color: white;
  border: 0;
  color: #344054;
`;

const assetList = assets.map((tokenId) => {
  return (
    <Widget
      src="zavodil.near/widget/AssetListItem"
      props={{
        tokenId: tokenId,
        debug: false,
        onClick: () => {
          console.log(`${tokenId} selected`);
          State.update({ hidden: true });
          if (props.onClick) {
            props.onClick(tokenId);
          }
        },
      }}
    />
  );
});

return (
  <>
    <Theme>
      <Modal hidden={hidden}>
        <ModalBackdrop />
        <ModalDialog>
          <ModalHeader>
            <div class="asset-list-header">{title}</div>
            <CloseButton onClick={onClose}>
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
          <div>
            {body}
            <div class="asset-list-container">{assetList}</div>
          </div>
        </ModalDialog>
      </Modal>
      {debug && <button onClick={ShowModal}>Show Modal</button>}
    </Theme>
  </>
);
