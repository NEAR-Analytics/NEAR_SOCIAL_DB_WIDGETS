const { ownerId, value } = props;

return (
  <Widget
    src="gov.near/widget/JoinButton.LR"
    props={{
      L: <Widget src="gov.near/widget/Membership" props={{ ownerId }} />,
      R: <Widget src="gov.near/widget/JoinButton" props={{ ownerId }} />,
      ...props,
    }}
  />
);
