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
        onLoad={() => {
          State.update({ loaded: true, src: url });
        }}
        style={{ display: hidden }}
      />
    )}

    {state.loaded && (
      <img
        src={state.src}
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
