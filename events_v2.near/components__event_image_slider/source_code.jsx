let event = props.event || null;

if (!state) {
  State.init({ index: 0 });
}

if (!event) {
  // TODO: return default image
  return <img src="" alt="Event!" />;
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
    }}
  >
    {displayImages.map((image) => {
      let src = null;
      const img = new Image();
      img.src = `https://ipfs.near.social/ipfs/${image.url.cid}`;
      img.onload = () => {
        src = img.src;
      };

      return (
        <img
          src={src}
          key={image.cid}
          alt={image.url.cid}
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            objectFit: 'cover',
            transform: `translateX(-${
              (state.index * 100) / displayImages.length
            }%)`,
            transition: 'transform 0.5s',
          }}
        />
      );
    })}
  </div>
);
