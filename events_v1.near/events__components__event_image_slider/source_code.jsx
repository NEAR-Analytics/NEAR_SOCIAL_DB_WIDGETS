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

return (
  <>
    {event.images &&
      event.images.length > 0 &&
      event.images.map((image) => {
        return (
          <EventImage
            src={`https://ipfs.near.social/ipfs/${image.url.cid}`}
            key={image.cid}
            alt={image.url.cid}
          />
        );
      })}
  </>
);
