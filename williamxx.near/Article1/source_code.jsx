if (!props.docId) {
  props.docId =
    "2PACX-1vRCxcPe0WIPo22vZpUuYgPnls9797HSztFlRXJnTi_2qQDFB8wwH-x5_61sKCaQAt0fgdHINBqlKgVm";
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
