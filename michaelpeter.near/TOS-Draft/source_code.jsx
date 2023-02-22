const { tosName, targetComponent, targetProps } = props;
const acceptanceKey = `${context.accountId}/${tosName}`;

State.init({ showTos: true });

// find all instances of the user agreeing to some version of the desired TOS
const agreementsForUser = Social.index("tosAccept", acceptanceKey);

const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1001;
`;

const Modal = styled.div`
  height: 80vh;
  width: 80vw;
  background-color: white;
  border-radius: 10px;
  margin: auto;
  padding: 3rem;
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.div`
display: flex;
flex-direction: column;
flex-grow:1
min-height 0;
overflow-y: scroll;
`;

const ModalFooter = styled.div`
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: aliceblue
`;

return (
  <div>
    {agreementsForUser.map((a) => (
      <span key={a}>{JSON.stringify(a)}</span>
    ))}
    <p>hi</p>

    <button
      onClick={() => {
        State.update({ showTos: true });
      }}
    >
      show
    </button>

    <Backdrop
      style={{ display: state.showTos ? "flex" : "none" }}
      onClick={() => {
        State.update({ showTos: false });
      }}
      className="flex"
    >
      <Modal>
        <ModalContent>
          <Widget src="michaelpeter.near/widget/TosContentDraft" />
        </ModalContent>
        <ModalFooter>
          <CommitButton
            data={{
              tosAccept: {
                genie: JSON.stringify({
                  key: acceptanceKey,
                  value: 1, // TODO blockheight of tos version
                }),
              },
            }}
          >
            I Agree
          </CommitButton>
        </ModalFooter>
      </Modal>
    </Backdrop>
  </div>
);
