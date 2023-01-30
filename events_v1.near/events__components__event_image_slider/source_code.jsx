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

// HACK: this is a hack to get regular update calls
const data = `
console.log({props})
fetch('https://api.coingecko.com/api/v3/coins/near', {
  subscribe: true,
  method: 'GET',
  headers: {
    Accept: '*/*',
  },
});

props.onUpdate()

`;

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
    <Widget
      code={data}
      props={{
        onUpdate: () => {
          State.update({ index: state.index + 1 });
        },
      }}
    />
    {displayImages.map((image) => {
      return (
        <img
          src={`https://ipfs.near.social/ipfs/${image.url.cid}`}
          key={image.cid}
          alt={image.url.cid}
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            objectFit: 'cover',
          }}
        />
      );
    })}
  </div>
);
