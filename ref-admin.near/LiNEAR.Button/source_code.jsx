const PrimaryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-weight: 700;
  font-size: 20px;
  width: 100%;
  background: #00FFA3;
  border-radius: 8px;
  overflow: hidden;
  padding: 8px 0;
  position: relative;
  z-index: 0;
  color: #101011;
  cursor:pointer;
  &:disabled {
    opacity:0.3;
    cursor:not-allowed;
  }
`;

const OutlineButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00FFA3;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  padding: 8px 0;
  transition: all 0.3s ease-in-out;
  background: #1A2E33;
  border: 1px solid #00FFA3;
  border-radius: 8px;
  cursor:pointer;

  &:disabled {
   opacity:0.3;
   cursor:not-allowed;
  }
`;
const type = props.type || "primary"; // primary || outline
if (type === "outline") {
  return (
    <OutlineButton disabled={props.disabled} onClick={props.onClick}>
      {props.text}
    </OutlineButton>
  );
} else {
  return (
    <PrimaryButton disabled={props.disabled} onClick={props.onClick}>
      {props.text}
    </PrimaryButton>
  );
}
