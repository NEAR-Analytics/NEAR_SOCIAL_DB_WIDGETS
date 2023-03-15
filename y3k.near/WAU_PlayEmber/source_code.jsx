// Monthly Active Accounts Example
let rawData = fetch(
  "https://github-near-data-api.vercel.app/api/wau_playember",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

// data.body = data.body.sort((a, b) => new Date(a.MONTH) - new Date(b.MONTH));
const METRIC_NAME = "Weekly Active Accounts";

let Style = styled.div`


      .bar {
        transition: fill 0.2s;
      }

      .bar:hover {
        fill: #ffa726;
      }

      .bar-chart {
        display: flex;
        align-items: center;
        justify-content: center;
      }

        svg {
          width: 80%;
        }

        rect {
          shape-rendering: crispEdges;
          fill: #61dafb;
          stroke: #333;
          stroke-width: 1;
        }


        `;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const colorGenerator = () => {
  const colors = [
    "rgb(255, 99, 132)",
    "rgb(75, 192, 192)",
    "rgb(153, 102, 255)",
    "rgb(255, 159, 64)",
    "rgb(54, 162, 235)",
    "rgb(201, 203, 207)",
    "rgb(255, 205, 86)",
    "rgb(255, 99, 71)",
    "rgb(147, 112, 219)",
    "rgb(0, 128, 128)",
    "rgb(100, 149, 237)",
    "rgb(127, 255, 0)",
  ];

  let index = 0;

  return () => {
    if (index >= colors.length) {
      index = 0;
    }

    return colors[index++];
  };
};

const getBackgroundColor = colorGenerator();

const formattedDataWeek = [];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getMonth = (date) => {
  const monthIndex = new Date(date).getMonth();
  return months[monthIndex];
};

const processedData = [];

rawData.body.forEach((datum) => {
  const month = getMonth(datum.activity_date);
  const day = new Date(datum.activity_date).getDate();
  const dayLabel = `${day}st`;

  let monthData = processedData.find((data) => data.label === month);
  if (!monthData) {
    monthData = {
      label: month,
      data: {},
      backgroundColor: getBackgroundColor(),
    };
    processedData.push(monthData);
  }

  monthData.data[dayLabel] = datum.wau;
});

processedData.forEach((monthData) => {
  const sortedData = {};
  Object.keys(monthData.data)
    .sort(
      (a, b) => parseInt(a.replace("st", "")) - parseInt(b.replace("st", ""))
    )
    .forEach((day) => {
      sortedData[day] = monthData.data[day];
    });
  monthData.data = sortedData;
});

const v_bar_labels = monthNames;

const v_bar_data = {
  v_bar_labels,
  datasets: processedData,
};

const v_bar_options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Weekly Active Accounts",
    },
  },
};

return (
  <Style>
    <div className="text-bg-light rounded-4 p-3 mb-4">
      {data !== null ? (
        <p>
          <div class="">
            <div class="">
              <div>
                <h2>Metric: {METRIC_NAME}</h2>
                <BarEl options={v_bar_options} data={v_bar_data} />
              </div>
            </div>
          </div>

          <div></div>
        </p>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  </Style>
);
