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
  return JSON.parse(
    Social.get(`${accountId}/thing/main`, blockHeight) ?? "null"
  );
});

console.log(events);

// const events = [{ title: "Meeting", start: new Date() }];

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
            start: 'prev,next today getEvents', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: 'dayGridMonth dayGridWeek dayGridDay list' // will normally be on the right. if RTL, will be on the left
          },
          navLinks: true,
          events: []
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
