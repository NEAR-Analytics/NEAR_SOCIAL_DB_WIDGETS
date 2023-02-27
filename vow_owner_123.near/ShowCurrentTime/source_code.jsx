State.init({
  current_time: null,
  world_time: null,
});

const code = `
<script>
    window.addEventListener("message", (event) => {
        setInterval(() => event.source.postMessage("ping", "*"), event.data.timeout);
    });
</script>
`;

function onInterval() {
  var today = new Date();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  var year = today.getFullYear();
  var hour = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
  var minute = today.getMinutes();
  var seconds = today.getSeconds();

  var utc_year = today.getUTCFullYear();
  var utc_day = today.getUTCDate();
  var utc_month = today.getUTCMonth() + 1;
  var utc_hour = today.getUTCHours();
  var utc_minute = today.getUTCMinutes();

  State.update({
    current_time: month + "/" + day + "/" + year + " - " + hour + ":" + minute,
    world_time:
      utc_month +
      "/" +
      utc_day +
      "/" +
      utc_year +
      " - " +
      utc_hour +
      ":" +
      utc_minute,
  });
}

return (
  <div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      {state.current_time && (
        <div
          style={{
            fontSize: font_big,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >{`UTC Time: ${state.world_time}`}</div>
      )}
      {state.world_time && (
        <div
          style={{
            fontSize: font_big,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >{`Locale Time: ${state.current_time}`}</div>
      )}
    </div>
    <iframe
      style={{ height: "0px" }}
      srcDoc={code}
      message={{ timeout: 1000 }}
      onMessage={onInterval}
    />
  </div>
);
