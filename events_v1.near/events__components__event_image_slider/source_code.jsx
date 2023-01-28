let event = props.event || null;

// // return data;
// if (!event) {
//   // TODO: return default image
//   return (<img src="" />);
// }



return <>
    {event.images &&
      event.images.length > 0 &&
      event.images.map((image) => {
        return (
          <EventImage
            src={`https://ipfs.near.social/ipfs/${image.url.cid}`}
            key={image.cid}
          />
        );
  </>

