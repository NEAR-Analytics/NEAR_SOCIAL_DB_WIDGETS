if (!props.docId) {
  return <div className="">No document ID provided.</div>;
}

const url = `https://docs.google.com/document/d/e/${props.docId}/pub?embedded=true"`;
return (
  <>
    <div className="container min-vw-100">
      <iframe
        src={url}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      />
    </div>
  </>
);
