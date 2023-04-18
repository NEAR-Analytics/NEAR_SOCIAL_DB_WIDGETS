// CALENDAR FROM https://github.com/fullcalendar/fullcalendar/tree/main/bundle

const accountId = context.accountId;

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
          headerToolbar: {
            start: 'prev,next today', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: 'dayGridMonth dayGridWeek dayGridDay list' // will normally be on the right. if RTL, will be on the left
          },
          navLinks: true,
          events: [
            { title: 'Meeting', start: new Date() }
          ]
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
        State.update({ ...data });

        const newScore = Number(data.score);

        if (newScore > initialScore) {
          Social.set({
            flappybos: {
              ...data,
            },
          });
        }
      }}
      style={{
        height: "80vh",
        width: "100%",
      }}
    />
  </>
);
