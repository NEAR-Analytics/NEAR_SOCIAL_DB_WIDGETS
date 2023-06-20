const code = `
<script>
// ...your code...

// define message handler
const handleMessage = (m) => {
  console.log('received message', m)
  document.getElementById("messageText").innerHTML = m;
};

// finally, configure iframe resizer options before importing the script
window.iFrameResizer = {
    onMessage: handleMessage
  }
</script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"></script>
<p id="messageText">loading...</p>
<button>Clic<button/>
`;

return (
  <div>
    <iframe
      iframeResizer={{
        onResized: ({ width, height }) => {
          console.log("iframe resized", width, height);
        },
      }}
      className="w-100 border border-primary"
      srcDoc={code}
      message="my message"
    />
  </div>
);
