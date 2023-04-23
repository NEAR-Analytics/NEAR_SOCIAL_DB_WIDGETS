const srcData = `
<script src="https://climateclock.world/widget-v2.js" async></script>
<climate-clock />
`;

return (
  <>
    <iframe
      srcDoc={srcData}
      style={{
        height: "100vh",
        width: "100%",
      }}
    />
  </>
);
