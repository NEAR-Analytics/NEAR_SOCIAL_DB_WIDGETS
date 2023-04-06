const fileAccept = props.fileAccept || "*";
const fileIcon = props.fileIcon || "bi-file";
const buttonText = props.buttonText || "Upload a file";
props.fileType ||
  initState({
    file: null,
  });

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

const filesOnChange = (file) => {
  if (file?.length > 0) {
    State.update({
      file: {
        uploading: true,
        cid: null,
      },
    });
    const body = file[0];
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    }).then((res) => {
      const cid = res.body.cid;
      console.log("CID", cid);
      State.update({
        file: {
          cid,
        },
      });
    });
  } else {
    State.update({
      file: null,
    });
  }
};

return (
  <div className="d-inline-block">
    {state.file?.cid && (
      <div
        className="d-inline-block me-2 overflow-hidden align-middle"
        style={{ width: "2.5em", height: "2.5em" }}
      >
        <i class={`bi fs-3 ${fileIcon}`} />
      </div>
    )}
    <Files
      multiple={false}
      accepts={[fileAccept]}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary"
      onChange={filesOnChange}
    >
      {state.file?.uploading
        ? "Uploading"
        : state.file && state.file.cid
        ? "Replace"
        : buttonText}
    </Files>
  </div>
);
