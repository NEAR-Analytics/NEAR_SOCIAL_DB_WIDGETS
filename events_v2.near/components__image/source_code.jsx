const url = props.url;

if (!url) {
  return props.__engine.helpers.propIsRequiredMessage('url');
}

if (!state) {
  State.init({ loaded: false, src: null });
  return <></>;
}

const AnimationFadeBlurIn = styled.keyframes`
  from {
    opacity: 0;
    filter: blur(100px);
    transform: rotate(-36deg);
  }

  to {
    opacity: 1;
    filter: blur(0px);
    transform: rotate(0deg);
  }
`;

const LoadedImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${state.loaded ? 1 : 0};

  animation: ${AnimationFadeBlurIn} 1s ease-in-out;
  animation-delay: ${(props) => props.delay || '0s'};
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-duration: ${(props) => props.duration || '0s'};
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

    {state.loaded && (
      <LoadedImage
        src={state.src}
        alt={props.alt || 'Image'}
        style={props.style || {}}
        delay={state.loaded ? 0 : props.delay || '2s'}
        duration={state.loaded ? 0 : props.duration || '2s'}
      />
    )}
  </>
);
