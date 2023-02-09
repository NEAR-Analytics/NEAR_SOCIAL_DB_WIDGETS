const url = props.url;

if (!url) {
  return props.__engine.helpers.propIsRequiredMessage('url');
}

if (!state) {
  State.init({ loaded: false, src: null, animated: false });
  return <></>;
}

const AnimationFadeBlurIn = styled.keyframes`
  from {
    opacity: 0;
    filter: blur(20px);
  }

  to {
    opacity: 1;
    filter: blur(0px);
  }
`;

const AnimationRotate = styled.keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadedImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${state.animated ? 1 : 0};

  animation: ${AnimationFadeBlurIn} 1s ease-in-out;
  animation-delay: ${(props) => props.delay || '0s'};
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-duration: ${(props) => props.duration || '1s'};
`;

const BlurredImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${state.animated ? 0 : 1};

  position: absolute;
  top: 0;
  left: 0;

  filter: blur(100px);
  animation: ${AnimationRotate} 10s linear infinite;
  animation-fill-mode: both;
`;

return (
  <>
    {!state.loaded && (
      <img
        src={url}
        alt={props.alt || 'Image'}
        onLoad={() => {
          console.log('Image loaded');
          State.update({ loaded: true, src: url });
        }}
        style={{
          display: 'none',
          width: 0,
          height: 0,
        }}
      />
    )}

    {state.loaded && !state.animated && (
      <BlurredImage src={state.src} alt={props.alt || 'Image'} />
    )}

    {state.loaded && (
      <LoadedImage
        src={state.src}
        alt={props.alt || 'Image'}
        style={props.style || {}}
        delay={state.animated ? 0 : props.delay || '1s'}
        duration={state.animated ? 0 : props.duration || '10s'}
        onAnimationEnd={() => {
          if (!state.animated) {
            State.update({ animated: true });
          }
        }}
      />
    )}
  </>
);
