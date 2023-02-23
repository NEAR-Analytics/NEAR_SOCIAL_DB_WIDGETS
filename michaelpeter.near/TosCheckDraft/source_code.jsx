const { tosName, targetComponent } = props;
const targetProps = props?.targetProps || {};
// const acceptanceKey = `${context.accountId}/${tosName}`;
const acceptanceKey = tosName; // TODO

State.init({
  hasCommittedAcceptance: false,
  agreeIsChecked: false,
  expand: false,
});

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
  width: 30rem;
  max-width: 95vw;
  max-height: 80vh;
  background-color: white;
  border-radius: 10px;
  margin: auto;
  padding: 1.5rem;
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
`;

const ModalContent = styled.div`
display: flex;
flex-direction: column;
flex-grow:1
min-height 0;
overflow-y: auto;
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const AcceptSection = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
`;

const CheckWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
color: ${state.agreeIsChecked ? "var(--bs-green)" : "inherit"}
`;

const CheckButton = styled.button`
  border: none;
  --bs-btn-hover-bg: transparent;
  --bs-btn-active-bg: transparent;
  --bs-btn-color: ${state.agreeIsChecked ? "var(--bs-green)" : "black"};
  --bs-btn-hover-color: var(--bs-blue);
`;

const expand = (e) => {
  State.update({ expand: e });
};

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
          <Widget src={tosName} props={expand} />
        </ModalContent>
        <ModalFooter>
          <CheckWrapper>
            <CheckButton
              onClick={() => {
                State.update({ agreeIsChecked: !state.agreeIsChecked });
              }}
              className="btn btn-outline-dark"
            >
              <i
                className={`bi bi-${
                  state.agreeIsChecked ? "check-square" : "square"
                }`}
                style={{ fontSize: "1.5rem" }}
              />
            </CheckButton>
            <span>
              I agree to the Terms of Service, Privacy Policy, and Community
              Guidelines
            </span>
          </CheckWrapper>
          <AcceptSection>
            <button
              className="btn btn-outline-secondary"
              style={{
                flexGrow: 1,
                flexBasis: "10rem",
                borderRadius: "1.25rem",
              }}
            >
              Sign Out (WIP)
            </button>
            <CommitButton
              style={{
                flexGrow: 1,
                flexBasis: "10rem",
                borderRadius: "1.25rem",
              }}
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
