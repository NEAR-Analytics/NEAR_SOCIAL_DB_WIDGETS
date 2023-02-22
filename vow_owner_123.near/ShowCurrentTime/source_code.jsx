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

  const day_converted = day == 0 ? 6 : new Date().getDay() - 1;
  const hours = new Date().getHours();
  const now = hours + minute / 60;
  var is_on = false;
  var temp = finalData.value._data[day_converted];
  if (temp.on_off == "on") {
    for (var j = 0; j < temp.data.length; j++) {
      if (now >= temp.data[j]._from && now < temp.data[j]._to) {
        is_on = true;
      }
    }
  }
  State.update({
    is_on: is_on,
    current_time:
      month +
      "/" +
      day +
      "/" +
      year +
      " - " +
      hour +
      ":" +
      minute +
      ":" +
      seconds,
    world_time:
      utc_month +
      "/" +
      utc_day +
      "/" +
      utc_year +
      " - " +
      utc_hour +
      ":" +
      utc_minute +
      ":" +
      seconds,
  });
}

return (
  <div>
    <iframe
      style={{ height: "0px" }}
      srcDoc={code}
      message={{ timeout: 1000 }}
      onMessage={onInterval}
    />
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
  </div>
);
