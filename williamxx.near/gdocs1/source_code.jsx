if (!props.docId) {
  props.docId = "1LQ0sp8XrgeH7cOOo3fkipXDMQgWjTw0uxwkbywR7HzM";
  //   return <div className="">No document ID provided.</div>;
}

const url = `https://docs.google.com/document/d/1LQ0sp8XrgeH7cOOo3fkipXDMQgWjTw0uxwkbywR7HzM/edit?embedded=true`;
return (
  <>
    <iframe
      className="container-fluid vh-100 border border-primary rounded"
      src={url}
    />
  </>
);
