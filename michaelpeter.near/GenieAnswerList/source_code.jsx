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
      style={{ width: "43rem", marginLeft: "2rem", marginRight: "2rem" }}
    >
      {answers?.length ? (
        <div className="d-flex flex-column gap-3">
          <h3>
            {answers.length} Answer{answers.length > 1 ? "s" : ""}
          </h3>
          {answers.map((a) => (
            <AnswerBox>
              <Widget
                src="michaelpeter.near/widget/GenieAnswerView"
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
