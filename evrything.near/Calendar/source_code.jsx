// CALENDAR FROM https://github.com/fullcalendar/fullcalendar/tree/main/bundle

const accountId = context.accountId;

// Get Event data from thing

const index = {
  action: "everything", // this could work as a sort of "domain"... ev02
  key: "main",
  options: {
    order: "desc",
    limit: 100,
  },
};

const type = "evrything.near/type/Event";

const initialItems = Social.index(index.action, index.key, index.options);
if (initialItems === null) {
  return <p>no events found</p>;
}
const items = initialItems.filter((item) => item.value.type === type);

const events = items.map((it) => {
  const accountId = it.accountId;
  const blockHeight = parseInt(it.blockHeight);
  const data = JSON.parse(
    Social.get(`${accountId}/thing/main`, blockHeight) ?? "null"
  );
  if (data) {
    return {
      id: blockHeight,
      source: accountId,
      ...data.payload,
      start: new Date(data.payload["startStr"]),
      end: new Date(data.payload["endStr"]),
    };
  }
});

console.log(events);
// events = [
//   {
//     id: "89914147",
//     source: "evrything.near",

//     allDay: true,
//     startStr: "2022-06-26T03:45:00.000Z",
//     endStr: "2022-06-26T04:00:00.000Z",
//     title: "first event :)",
//     url: "https://everything.dev",
//   },
// ];

const srcData = `
<!DOCTYPE html>
<html>
  <head>
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar/index.global.min.js'></script>
    <script>

      document.addEventListener('DOMContentLoaded', function() {
        const calendarEl = document.getElementById('calendar')
        const calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          editable: true,
          customButtons: {
            getEvents: {
              text: 'load events',
              click: () => window.top.postMessage({ score: "hello" }, "*")
            }
          },
          headerToolbar: {
            start: 'prev,next today', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: 'dayGridMonth dayGridWeek dayGridDay list' // will normally be on the right. if RTL, will be on the left
          },
          navLinks: true,
          events: ${JSON.stringify(events)}
        })
        calendar.render()
      })
    </script>
  </head>
  <body>
    <div id='calendar'></div>
  </body>
</html>
`;

return (
  <>
    <iframe
      srcDoc={srcData}
      onMessage={(data) => {
        console.log(data);
      }}
      style={{
        height: "80vh",
        width: "100%",
      }}
    />
  </>
);
