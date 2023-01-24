const ownerId = "maxhr.near";
const { answeredBy, questionRef } = props;

if (!answeredBy || !questionRef) {
  return "Missing prop in GenieAnswerView";
}

const answer = Social.get(
  `${answeredBy}/experimental/genie/answers/${questionRef}`
);

const BodyText = styled.p`
  color: #68717A
`;

return (
  <div className="d-flex flex-column gap-3">
    <Widget
      src="tiffany.near/widget/Profile"
      props={{ accountId: answeredBy }}
    />
    <div className="p-1 d-flex justify-content-between">
      <BodyText>{answer}</BodyText>
    </div>
    <div className="d-flex flex-row gap-2">
      <Widget
        src={`${ownerId}/widget/GenieAnswerVote`}
        props={{ questionRef, answeredBy }}
      />
      <Widget
        src="michaelpeter.near/widget/GenieTip"
        props={{ questionRef, answeredBy }}
      />
    </div>
  </div>
);
