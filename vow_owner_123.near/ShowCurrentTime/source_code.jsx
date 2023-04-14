const time_zone = props.time_zone ?? "(UTC+00:00) UTC";
State.init({
  user_time: null,
  local_time: null,
});

console.log("time_zone: ", time_zone);

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

  var zone = time_zone.split(" ")[0].split("UTC")[1].split(":");
  var offset = parseInt(zone[0]);

  var local_time = new Date(today.getTime() + offset * 3600000);
  var local_month = local_time.getMonth() + 1;
  var local_day = local_time.getDate();
  var local_year = local_time.getFullYear();
  var local_hour =
    local_time.getHours() > 12
      ? local_time.getHours() - 12
      : local_time.getHours();
  var local_minute = local_time.getMinutes();
  State.update({
    user_time: month + "/" + day + "/" + year + " - " + hour + ":" + minute,
    local_time:
      local_month +
      "/" +
      local_day +
      "/" +
      local_year +
      " - " +
      local_hour +
      ":" +
      local_minute,
  });
}

return (
  <div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      {state.local_time && (
        <div
          style={{
            fontSize: font_big,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >{`Local Time: ${state.local_time}`}</div>
      )}
      {state.user_time && (
        <div
          style={{
            fontSize: font_big,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >{`Your Time: ${state.user_time}`}</div>
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
