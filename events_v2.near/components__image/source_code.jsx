let event = props.event || null;
const url = props.url

if(!url){
  return props.__engine.helpers.propIsRequiredMessage('url');
}

if (!state) {
  State.init({ loaded: false, src: null });
  return
}




      const img = new Image();
      img.src = `https://ipfs.near.social/ipfs/${image.url.cid}`;
      img.onload = () => {
        src = img.src;
      };
        <
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

return (
  <>
    {!state.loaded && (
      <img src={url} onLoad={()=>{
        State.update({loaded: true, src: url})
      }} style={{display: hidden}} />
    )}

    {state.loaded && (
      <img 
        src={state.src}
        style={{display: 'block', width: '100%', height: '100%', objectFit: 'cover'}}
      />
    )}
  </>
);