const ownerId = "maxdev.near";
const { questionRef, searchString } = props;

const asker = questionRef.split("--")[0];

const question = Social.getr(
  `${asker}/neardevs_beta1/questions/${questionRef}`
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
            {new Date(
              parseInt(questionRef.split("--")[1])
            ).toLocaleDateString()}
          </div>
        </div>
      </div>
      <h3>{question.title}</h3>
      <BodyText>{question.content}</BodyText>
    </div>
    <Widget src={`${ownerId}/widget/GenieAnswerList`} props={{ questionRef }} />
  </div>
);
