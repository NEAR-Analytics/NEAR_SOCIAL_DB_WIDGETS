const { tosName, targetComponent } = props;
const targetProps = props?.targetProps || {};
// const acceptanceKey = `${context.accountId}/${tosName}`;
const acceptanceKey = tosName; // TODO

State.init({ hasCommittedAcceptance: false, agreeIsChecked: false });

// find all instances of the user agreeing to some version of the desired TOS
const agreementsForUser = Social.index("tosAccept", acceptanceKey, {
  accountId: context.accountId, // make sure it was written by the user in question
});

const tosVersions = Social.keys(tosName, "final", {
  return_type: "BlockHeight",
  // subscribe: true,
});

// TODO do path validation before this
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
  justify-content: space-between;
  align-items: center;
`;

const AcceptSection = styled.div`
display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 2rem;
`;

const showTos =
  !state.hasCommittedAcceptance &&
  context.accountId &&
  latestTosVersion &&
  (!agreementsForUser.length ||
    agreementsForUser[agreementsForUser.length - 1].value < latestTosVersion);

return (
  <div>
    <Backdrop style={{ display: showTos ? "flex" : "none" }} className="flex">
      <Modal>
        <ModalContent>
          <Widget src="michaelpeter.near/widget/TosContentDraft" />
        </ModalContent>
        <ModalFooter>
          <button className="btn btn-danger">Sign Out (WIP)</button>
          <AcceptSection>
            <div
              id="checkWrapper"
              className="d-flex flex-row align-items-center"
            >
              <button
                onClick={() => {
                  State.update({ agreeIsChecked: !state.agreeIsChecked });
                }}
                className="btn btn-outline-dark"
                style={{
                  border: "none",
                  "--bs-btn-hover-bg": "transparent",
                  "--bs-btn-active-bg": "transparent",
                  "--bs-btn-hover-color": "var(--bs-blue)",
                }}
              >
                <i
                  className={`bi bi-${
                    state.agreeIsChecked ? "check-square" : "square"
                  }`}
                  style={{ fontSize: "1.5rem" }}
                />
              </button>
              <span>I agree to the Terms of Service</span>
            </div>
            <CommitButton
              disabled={!state.agreeIsChecked}
              data={{
                index: {
                  tosAccept: JSON.stringify({
                    key: acceptanceKey,
                    value: latestTosVersion,
                  }),
                },
              }}
              onCommit={() => {
                State.update({ hasCommittedAcceptance: true });
              }}
            >
              Continue
            </CommitButton>
          </AcceptSection>
        </ModalFooter>
      </Modal>
    </Backdrop>
    <Widget src={targetComponent} props={targetProps} />
  </div>
);
