if (!props.docId) {
  props.docId =
    "2PACX-1vTuHmtefG_zha1FOUhYVP3IorhGkuqNYNG50HMTSMQrQnP6h0yap0JrQCArxIEw4ONnyTAD_bCOXhuq";
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
