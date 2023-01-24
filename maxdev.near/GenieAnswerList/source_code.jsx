const ownerId = "maxdev.near";
State.init({ showAnswerForm: false });

const { questionRef } = props;

if (!questionRef) {
  return "No question ref provided";
}

const answers = Social.index("genie", `answered/${questionRef}`);

const AnswerBox = styled.div`
  border-top: 0.5px solid #D3D3D3;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

return (
  <div className="d-flex flex-row justify-content-center">
    <div
      className="d-flex flex-column gap-3"
      style={{
        width: "100%",
        maxWidth: "43rem",
        marginLeft: "2rem",
        marginRight: "2rem",
      }}
    >
      <div className="d-flex flex-row justify-content-between">
        <h3>
          {answers.length} Answer{answers.length > 1 ? "s" : ""}
        </h3>
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            State.update({ showAnswerForm: !state.showAnswerForm });
          }}
        >
          {!state.showAnswerForm && <i class="bi bi-pencil" />}
          {!state.showAnswerForm ? "Answer" : "Cancel"}
        </button>
      </div>
      {state.showAnswerForm && (
        <Widget
          src={`${ownerId}/widget/GenieAnswerSubmit`}
          props={{ questionRef }}
        />
      )}
      {answers?.length ? (
        <div className="d-flex flex-column gap-3">
          {answers.map((a) => (
            <AnswerBox>
              <Widget
                src={`${ownerId}/widget/GenieAnswerView`}
                props={{ questionRef, answeredBy: a.accountId }}
              />
            </AnswerBox>
          ))}
        </div>
      ) : (
        <div className="alert alert-light">No answers, be the first!</div>
      )}
    </div>
  </div>
);
