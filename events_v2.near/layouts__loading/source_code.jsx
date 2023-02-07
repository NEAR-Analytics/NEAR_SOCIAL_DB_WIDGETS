const AlertContent = styled.div`
  top: 50%;
  left: 50%;
  position: absolute;
  transform-origin: bottom left;
  background-color: white;
  width: 50%;
  height: auto;
  max-width: 300px;
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

const fadeInOut = styled.keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #f00;
  animation: ${fadeInOut} 1s infinite;
  animation-delay: ${(props) => props.delay};
`;

return (
  <>
    <AlertContent>
      <div>
        <div>
          <Dot delay={'0s'}></Dot>
          <Dot delay={'0.2s'}></Dot>
          <Dot delay={'0.4s'}></Dot>
        </div>
        {props.__engine.renderComponent(
          props.component.name,
          props.component.props
        )}
      </div>
    </AlertContent>
  </>
);
