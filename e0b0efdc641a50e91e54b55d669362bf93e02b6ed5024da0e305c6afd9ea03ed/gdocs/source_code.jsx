if (!props.docId) {
  return <div className="">No document ID provided.</div>;
}

const url = `https://docs.google.com/document/d/e/${props.docId}/pub?embedded=true`;
return (
  <>
    <iframe
      className="container-fluid border border-primary rounded"
      src={url}
      // width="100%"
      height="100vh"
      // style={{ position: "absolute", top: 0, left: 0 }}
      //   frameBorder="0"
      //   marginHeight="0"
      //   marginWidth="0"
    />
  </>
);
