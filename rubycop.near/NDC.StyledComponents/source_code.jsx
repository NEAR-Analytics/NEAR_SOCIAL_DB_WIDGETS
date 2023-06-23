const { PrimaryButton } = props;

const StyledPrimaryButton = styled.button`
  padding: 8px 20px;
  background: #FFD50D;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  border: 0;
`;

if (PrimaryButton)
  return (
    <StyledPrimaryButton onClick={PrimaryButton.onClick}>
      {PrimaryButton.text}
    </StyledPrimaryButton>
  );

return "";
