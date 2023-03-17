let static_file_param = "NEAR-ATLAS-DATA-MAAs.csv";
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

const METRIC_NAME = "NEAR Weekly Active Accounts";

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

try {
  rawData.body.forEach((datum) => {
    if (!datum["Daily_Date"]) {
      return;
    }
    // console.log(datum["Daily-Date"]);

    const activity_date = parseUTCDate(datum["Daily_Date"]);

    const month =
      months[
        parseInt(activity_date.toISOString().slice(0, 10).split("-")[1]) - 1
      ];
    let monthData = processedData.find((data) => data.label === month);

    if (!monthData) {
      monthData = {
        label: month,
        data: {},
        backgroundColor: getBackgroundColor(),
      };
      processedData.push(monthData);
    }

    monthData.data[activity_date.toISOString().slice(0, 10)] = parseInt(
      datum["Daily"]
    );
  });
} catch (err) {
  console.log(err);
}
// console.log("processedData");
console.log(processedData);

function getMinYear(data) {
  const years = Object.keys(data).map((dateString) =>
    parseInt(dateString.split("-")[0])
  );
  return Math.min(...years);
}

processedData.sort((a, b) => getMinYear(a.data) - getMinYear(b.data));

// logic end

const v_bar_labels = months;

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
