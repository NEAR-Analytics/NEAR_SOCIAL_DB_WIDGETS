const PADDING_WITH_TITLE = 64;
const BORDER_RADIUS = 16;

const title = props.title || null;

const FadeInSpecial = styled.keyframes`
  0% {
    opacity: 0;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    top: 20%;
  }
  70% {
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    top: 20%;
  }
  100% {
    opacity: 1;
    box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.5);
    top: 50%;
  }
`;

const ModalContent = styled.div`
  position: absolute;
  transform-origin: center center;
  background-color: white;
  width: 80%;
  height: 80%;
  max-width: 600px;
  max-height: 600px;
  border-radius: ${BORDER_RADIUS}px;
  left: 50%;

  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.5);
  animation: ${FadeInSpecial} 0.4s ease-out;
`;

return (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(200,200,200,0.66)',
      overflow: 'hidden',

      backdropFilter: 'blur(20px) saturate(180%)',
    }}
  >
    <ModalContent>
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'stretch',
          borderRadius: BORDER_RADIUS,
        }}
      >
        {/* title */}
        {title ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 0,
              fontSize: 24,
              fontWeight: 'bold',
              borderBottom: '1px solid #ccc',
              width: '100%',
              minHeight: 48,
              padding: '12px 16px',
              boxShadow: '0 0 10px -3px rgba(0,0,0,0.2)',
              zIndex: 10,
              borderRadius: `${BORDER_RADIUS}px ${BORDER_RADIUS}px 0 0`,
              backgroundColor: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(10px) saturate(180%)',
            }}
          >
            {title}
          </div>
        ) : null}

        {/* close button */}
        <button
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            top: 0,
            right: 0,
            width: 48,
            padding: 10,
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            color: 'black',
            fontSize: 32,
            borderRadius: `0 ${BORDER_RADIUS}px 0 0`,
            textShadow: '0.5px -0.5px 0.5px #ccc, -0.5px 0.5px 0.5px #ccc',
            lineHeight: '40px',
            zIndex: 1000,
          }}
          onClick={() => {
            props.__engine.pop();
          }}
        >
          &times;
        </button>

        {/* container */}
        <div
          style={{
            height: 'auto',
            width: '100%',
            maxWidth: '100%',
            overflow: 'auto',
            position: 'absolute',
            // offset by border-radius, so that scrollbars don't show up top-right
            top: BORDER_RADIUS,
            left: 0,
            right: 0,
            bottom: 0,
            paddingTop: title ? PADDING_WITH_TITLE : 0,
          }}
        >
          {props.__engine.renderComponent(
            props.component.name,
            props.component.props
          )}
        </div>
      </div>
    </ModalContent>
  </div>
);
