const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

State.init({
  showCreateProposal: false,
});

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  padding: 16px;

  @media (max-width: 600px) {
    padding: 0;
    & > * {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }
`;

return (
  <>
    <div className="d-flex justify-content-between flex-wrap mb-3">
      <h3>build town</h3>
      <Widget
        src="sking.near/widget/Common.Button"
        props={{
          children: (
            <>
              <i className="bi bi-16 bi-plus-lg"></i>
              Propose Task
            </>
          ),
          onClick: () => State.update({ ...state, showCreateProposal: true }),
          className: "mt-2",
          variant: "success",
        }}
      />
    </div>

    <Widget src="devs.near/widget/dev.info" />

    <Widget
      src="hack.near/widget/dev.task.claim"
      props={{ daoId: daoId, accountId: accountId }}
    />

    {state.showCreateProposal && (
      <PopupWrapper
        id="create-proposal-popup"
        onClick={(e) => {
          if (e.target.id === "create-proposal-popup") {
            State.update({ ...state, showCreateProposal: false });
          }
        }}
      >
        <Widget
          src={"hack.near/widget/dev.task.propose"}
          props={{
            daoId: daoId,
            accountId: accountId,
            onClose: () =>
              State.update({ ...state, showCreateProposal: false }),
          }}
        />
      </PopupWrapper>
    )}
  </>
);
