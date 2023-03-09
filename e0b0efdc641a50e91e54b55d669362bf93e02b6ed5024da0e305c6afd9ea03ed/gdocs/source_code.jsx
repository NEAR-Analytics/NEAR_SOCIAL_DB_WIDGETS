const GoogleDocsEmbed = ({ docId }) => {
  if (!docId) {
    return <div>No document ID provided.</div>;
  }

  const url = `https://docs.google.com/document/d/${docId}/preview`;
  return (
    <iframe
      src={url}
      width="100%"
      height="600"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
    />
  );
};

const App = () => {
  return (
    <div>
      <GoogleDocsEmbed docId="YOUR_DOC_ID_HERE" />
    </div>
  );
};
