State.init({ pdf: null });

const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const cid = res.body.cid;
    State.update({ pdf: { cid } });
  });
};

const filesOnChange = (files) => {
  if (files) {
    State.update({ pdf: { uploading: true, cid: null } });
    uploadFileUpdateState(files[0]);
  }
};

return (
  <div className="d-inline-block">
    {state.pdf ? (
      <a
        href={`https://ipfs.near.social/ipfs/${state.pdf.cid}`}
        alt="pdf document"
      >
        {props.docname}
      </a>
    ) : (
      ""
    )}
    <Files
      multiple={false}
      accepts={["pdf/*"]}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary"
      onChange={filesOnChange}
    >
      {state.pdf?.uploading ? <> Uploading </> : "Upload an pdf"}
    </Files>
  </div>
);
