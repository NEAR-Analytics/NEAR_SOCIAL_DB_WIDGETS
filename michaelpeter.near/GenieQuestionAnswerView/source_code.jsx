const { questionRef, searchString } = props;

const asker = questionRef.split("--")[0];

const question = Social.getr(
  `${asker}/experimental/genie/questions/${questionRef}`
);

const BodyText = styled.p`
  color: #68717A
`;

return (
  <div className="d-flex flex-column gap-1">
    <div className="d-flex flex-column gap-1">
      <div className="d-flex align-items-center">
        <div
          style={{ width: "100%" }}
          className="d-flex align-items-center justify-content-between"
        >
          <Widget
            src="tiffany.near/widget/Profile"
            props={{ accountId: asker }}
          />
          <div>
            {new Date(parseInt(questionRef.split("--")[1])).toISOString()}
          </div>
        </div>
      </div>
      <h3>{question.title}</h3>
      <BodyText>{question.content}</BodyText>
    </div>
    <Widget
      src={"michaelpeter.near/widget/GenieAnswerList"}
      props={{ questionRef }}
    />
    <Widget
      src={"michaelpeter.near/widget/GenieAnswerSubmit"}
      props={{ questionRef }}
    />
  </div>
);
