let event = props.event || null;
const url = props.url;

if (!url) {
  return props.__engine.helpers.propIsRequiredMessage('url');
}

if (!state) {
  State.init({ loaded: false, src: null });
  return;
}

return (
  <>
    {!state.loaded && (
      <img
        src={url}
        alt={props.alt || 'Image'}
        onLoad={() => {
          State.update({ loaded: true, src: url });
        }}
        style={{
          display: 'none',
          visibility: 'hidden',
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
      <img
        src={state.src}
        alt={props.alt || 'Image'}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    )}
  </>
);
