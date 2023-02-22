const { tosName, targetComponent } = props;
const targetProps = props?.targetProps || {};
// const acceptanceKey = `${context.accountId}/${tosName}`;
const acceptanceKey = tosName; // TODO

State.init({ showTos: true });

// find all instances of the user agreeing to some version of the desired TOS
const agreementsForUser = Social.index("tosAccept", acceptanceKey, {
  accountId: context.accountId, // make sure it was written by the user in question
});

const tosVersions = Social.keys(tosName, "final", {
  return_type: "BlockHeight",
});

// TODO check that path is correct format
const tosPath = tosName.split("/");
const latestTosVersion = tosPath.reduce((acc, curr) => {
  return acc[curr];
}, tosVersions);

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
  row-gap: 1rem;
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
`;

// TODO check that 0 is correct index and not last
const showTos =
  agreementsForUser[agreementsForUser.length - 1].value < latestTosVersion;

return (
  <div>
    {/*latestTosVersion && <div>latestTosVersion: {latestTosVersion}</div>*/}
    {/*agreementsForUser.map((a) => (
      <span key={a}>{JSON.stringify(a)}</span>
    ))
    <button
      onClick={() => {
        State.update({ showTos: true });
      }}
    >
      show
    </button>
    */}
    <Backdrop
      style={{ display: showTos ? "flex" : "none" }}
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
              index: {
                tosAccept: JSON.stringify({
                  key: acceptanceKey,
                  value: latestTosVersion,
                }),
              },
            }}
          >
            I Agree
          </CommitButton>
        </ModalFooter>
      </Modal>
    </Backdrop>
    <Widget src={targetComponent} props={targetProps} />
  </div>
);
