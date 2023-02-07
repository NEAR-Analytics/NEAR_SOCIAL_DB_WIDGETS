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
  animation: ${fadeInOut} 2s ease-in-out infinite;
  animation-delay: ${(props) => props.delay};
  margin: 0 5px;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

return (
  <>
    <AlertContent>
      <div>
        <DotContainer>
          {new Array(20).fill(0).map((_, i) => (
            <Dot delay={`${i * 0.1}s`} />
          ))}
        </DotContainer>
        {props.__engine.renderComponent(
          props.component.name,
          props.component.props
        )}
      </div>
    </AlertContent>
  </>
);
