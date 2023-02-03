const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

const filesOnChange = (files) => {
  if (files?.length > 0) {
    State.update({
      img: {
        uploading: true,
        cid: null,
      },
    });
    const body = files[0];
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    }).then((res) => {
      const cid = res.body.cid;
      State.update({
        img: {
          cid,
        },
      });
    });
  } else {
    State.update({
      img: null,
    });
  }
};

return (
  <div className="d-inline-block">
    {state.img?.cid && (
      <div
        className="d-inline-block me-2 overflow-hidden align-middle"
        style={{ width: "2.5em", height: "2.5em" }}
      >
        <img
          className="rounded w-100 h-100"
          style={{ objectFit: "cover" }}
          src={ipfsUrl(state.img?.cid)}
          alt="upload preview"
        />
      </div>
    )}
    <Files
      multiple={false}
      accepts={["image/*"]}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary"
      onChange={filesOnChange}
      capture="environment"
    >
      {state.img?.uploading ? (
        <>{Loading} Uploading</>
      ) : state.img?.cid ? (
        "Replace"
      ) : (
        "Upload an Image"
      )}
    </Files>
  </div>
);
