let event = props.event || null;

if (!state) {
  State.init({ index: 0 });
  return <></>;
}

const mode = props.mode || 'banner';

const imagesWithCid = (event.images || [])
  .filter((image) => {
    return image.url && image.url.cid;
  })
  .filter((image) => {
    return image.url.cid.length > 0;
  });

const displayImages = imagesWithCid.filter((image) => {
  return image.type === mode;
});

return (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '100%',
      overflow: 'hidden',
      userSelect: 'none',
      position: 'relative',
    }}
  >
    {displayImages.map((image) => {
      const url = `https://ipfs.near.social/ipfs/${image.url.cid}`;
      return (
        <>
          {props.__engine.renderComponent('components:image', {
            url,
            key: url,
            delay: props.delay,
            duration: props.duration,
          })}
        </>
      );
    })}
  </div>
);
