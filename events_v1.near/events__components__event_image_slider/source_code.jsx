let event = props.event || null;

// return data;
if (!event) {
  // TODO: return default image
  return <img src="" alt="Event!" />;
}

const EventImage = styled.img`
  width: 100%;
  height: auto;
`;

const imagesWithCid = (event.images || [])
  .filter((image) => {
    return image.url && image.url.cid;
  })
  .filter((image) => {
    return image.url.cid.length > 0;
  });

const bannerImages = imagesWithCid.filter((image) => {
  return image.type === 'banner';
});

return (
  <div
    style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40vh',
      maxHeight: '400px',
      minHeight: '200px',
      maxWidth: '100%',
      overflow: 'hidden',
    }}
  >
    {bannerImages.map((image) => {
      return (
        <EventImage
          src={`https://ipfs.near.social/ipfs/${image.url.cid}`}
          key={image.cid}
          alt={image.url.cid}
          style={{
            width: 'auto',
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
