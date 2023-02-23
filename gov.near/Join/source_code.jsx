const { ownerId, value } = props;

return (
  <Widget
    src="gov.near/widget/JoinButton.LR"
    props={{
      L: "",
      R: <Widget src="gov.near/widget/JoinButton" props={{ ownerId }} />,
      ...props,
    }}
  />
);
