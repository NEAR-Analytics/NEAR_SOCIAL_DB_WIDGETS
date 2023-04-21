// CALENDAR FROM https://github.com/fullcalendar/fullcalendar/tree/main/bundle
const events = props.events || [];

const srcData = `
<!DOCTYPE html>
<html>
  <head>
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar/index.global.min.js'></script>
    <script>

      document.addEventListener('DOMContentLoaded', function() {
        const calendarEl = document.getElementById('calendar')
        const calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridWeek',
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
