const AlertContent = styled.div`
  top: 50%;
  left: 50%;
  position: absolute;
  transform-origin: bottom left;
  background-color: white;
  width: 50%;
  height: auto;
  max-width: 200px;
  max-height: 200px;
  border-radius: 12px;
  box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: scroll;
`;

return (
  <>
    <AlertContent>
      {props.__engine.renderComponent(
        props.component.name,
        props.component.props
      )}
    </AlertContent>
  </>
);
