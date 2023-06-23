const { Button } = props;

const StyledButton = styled.button`
  padding: ${(props) => (props.size === "sm" ? "4px 12px" : "8px 20px")};
  font-size: ${(props) => (props.size === "sm" ? "12px" : "14px")};
  border-radius: 10px;
  font-weight: 500;
  line-height: 24px;
  border: 0;

  &.primary {
    background: #FFD50D;

    &.dark {
      color: #fff;
      background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
    }
  }

  &.secondary {
    background: transparent;
    border: 1px solid #FFD50D;
  }

  i {
    margin: 0 0 0 5px;
    &:before { vertical-align: -0.2rem; }
  }
`;

if (Button)
  return (
    <StyledButton
      size={Button.size}
      className={`align-items-center d-flex ${Button.type ?? "primary"}`}
      onClick={Button.onClick}
      disabled={Button.disabled}
    >
      <div>{Button.text}</div>
      {Button.icon && (
        <div className={`${Button.size === "sm" ? "fs-7" : "fs-5"}`}>
          {Button.icon}
        </div>
      )}
    </StyledButton>
  );

return "";
