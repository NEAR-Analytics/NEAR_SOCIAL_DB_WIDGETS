let static_file_param = "NEAR-ATLAS-DATA-New MAAs.csv";
// Monthly Active Accounts Example
let rawData = fetch(
  "https://github-near-data-api.vercel.app/api/static_file_param?filename=" +
    static_file_param,
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const METRIC_NAME = "NEAR Monthly New Active Accounts";

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

// logic start

function parseUTCDate(dateString) {
  const [month, day, year] = dateString
    .split("/")
    .map((str) => parseInt(str, 10));
  // Subtract 1 from the month, as JavaScript months are zero-based
  const utcTimestamp = Date.UTC(year, month - 1, day);
  return new Date(utcTimestamp);
}

const getBackgroundColor = colorGenerator();

let processedData = [];
let labels_of_weeks = [];
let weeklyData = [];

try {
  rawData.body.forEach((datum) => {
    if (!datum["Weekly_Date"]) {
      return;
    }

    const activity_date = parseUTCDate(datum["Weekly_Date"]);

    const weeklyString = datum.Weekly.replace(",", "").replace(",", "") || "0"; // default to "0" if Weekly is empty or not defined
    const weeklyValue = parseFloat(weeklyString);

    // append to labels_of_weeks
    if (!labels_of_weeks.includes(datum["Weekly_Date"])) {
      labels_of_weeks.push(datum["Weekly_Date"]);
      weeklyData.push(weeklyValue);
    }
  });
} catch (err) {
  console.log(err);
}

// console.log(processedData);

// logic part-2

const data = {
  labels: labels_of_weeks,
  datasets: [
    {
      label: "New MAAs",
      data: weeklyData,
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

// config
const config = {
  type: "bar",
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

return (
  <Style>
    <div className="text-bg-dark rounded-4 p-3 mb-4">
      {data !== null ? (
        <p>
          <div class="">
            <div class="">
              <div>
                <h3>{METRIC_NAME}</h3>
                <BarEl options={config} data={data} />
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
