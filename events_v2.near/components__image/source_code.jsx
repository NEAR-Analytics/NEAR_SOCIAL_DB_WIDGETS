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
    filter: blur(10px);
  }

  to {
    opacity: 1;
    filter: blur(0px);
  }
`;

const LoadedImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${(props) => props.style || ''}

  animation: ${AnimationFadeBlurIn} 1s ease-in-out;
`;

return (
  <>
    {!state.loaded && (
      <LoadedImage
        src={url}
        alt={props.alt || 'Image'}
        onLoad={() => {
          State.update({ loaded: true, src: url });
        }}
        style={{
          display: 'none',
          opacity: 0,
          width: 0,
          height: 0,
          position: 'absolute',
          top: '-1000px',
          left: '-1000px',
        }}
      />
    )}

    {state.loaded && (
      <LoadedImage
        src={state.src}
        alt={props.alt || 'Image'}
        style={props.style || {}}
      />
    )}
  </>
);
