const { PrimaryButton } = props;

const StyledPrimaryButton = styled.button`
  padding: 8px 20px;
  background: #FFD50D;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  border: 0;

  i {
    margin: 0 0 0 5px;
    &:before { vertical-align: -0.2rem; }
  }
`;

if (PrimaryButton)
  return (
    <StyledPrimaryButton
      className="align-items-center d-flex"
      onClick={PrimaryButton.onClick}
    >
      <div>{PrimaryButton.text}</div>
      {PrimaryButton.icon && <div className="fs-5">{PrimaryButton.icon}</div>}
    </StyledPrimaryButton>
  );

return "";
