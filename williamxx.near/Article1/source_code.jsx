if (!props.docId) {
  props.docId =
    "2PACX-1vRUtohUCuAgxayUKP1paWhhQT-jkYWRtN3UAb81ABqpu3LbTp8pFMQw1aXcOxRXune81-NLvWyPbyI_";
  //   return <div className="">No document ID provided.</div>;
}

const url = `https://docs.google.com/document/d/e/${props.docId}/pub?embedded=true`;
return (
  <>
    <iframe
      className="container-fluid vh-100 border border-primary rounded"
      src={url}
    />
  </>
);
