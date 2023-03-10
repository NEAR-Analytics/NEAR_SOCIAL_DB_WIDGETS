if (!props.docId) {
  return <div className="">No document ID provided.</div>;
}

const url = `https://docs.google.com/document/d/${props.docId}/preview`;
return (
  <div className="container">
    <iframe
      src={url}
      width="98.5vw"
      height="98.5vh"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
    />
  </div>
);
