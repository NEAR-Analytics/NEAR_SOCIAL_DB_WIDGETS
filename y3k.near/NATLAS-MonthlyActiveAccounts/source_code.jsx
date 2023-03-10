// Monthly Active Accounts Example
let rawData = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/da1fb143-e325-43ea-a07d-8fcf750eea16/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

// data.body = data.body.sort((a, b) => new Date(a.MONTH) - new Date(b.MONTH));
const METRIC_NAME = "Monthly Active Accounts";

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

const v_bar_labels = monthNames;

const colorGenerator = () => {
  const colors = [
    "rgb(255, 99, 132)",
    "rgb(75, 192, 192)",
    "rgb(153, 102, 255)",
    "rgb(255, 159, 64)",
    "rgb(54, 162, 235)",
    "rgb(201, 203, 207)",
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

const formatData = (rawData) => {
  let result = [];
  let backgroundColor = "rgb(255, 99, 132)";

  rawData.forEach((item) => {
    let year = item.MONTH ? item.MONTH.split("-")[0] : "";
    let month = item.MONTH ? item.MONTH.split("-")[1] : "";

    if (!year) return;

    if (!result.find((x) => x.label === year)) {
      result.push({
        label: year,
        data: {},
        backgroundColor: getBackgroundColor(),
      });
    }

    let yearData = result.find((x) => x.label === year);
    yearData.data[monthNames[month - 1]] = item.ACTIVE_WALLETS;
  });

  result.sort((a, b) => {
    if (a.label === b.label) {
      return (
        monthNames.indexOf(Object.keys(a.data)[0]) -
        monthNames.indexOf(Object.keys(b.data)[0])
      );
    }
    return a.label - b.label;
  });

  return result;
};

// const formattedDataYears = formatData(rawData.body);

// function convertData(formattedDataYears) {
//   let formattedDataMonth = [];
//   let months = Object.keys(formattedDataYears[0].data);

//   // sort the months in the desired order
//   months.sort((a, b) => {
//     const allMonths = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     return allMonths.indexOf(a) - allMonths.indexOf(b);
//   });

//   for (let i = 0; i < months.length; i++) {
//     let monthData = {
//       label: months[i],
//       data: {},
//       backgroundColor: formattedDataYears[i % 2].backgroundColor,
//     };

//     for (let j = 0; j < formattedDataYears.length; j++) {
//       monthData.data[formattedDataYears[j].label] =
//         formattedDataYears[j].data[months[i]];
//     }

//     formattedDataMonth.push(monthData);
//   }

//   return formattedDataMonth;
// }

// const formattedDataMonth = convertData(formattedDataYears);

const formattedDataMonth = [];

rawData.body.forEach((entry) => {
  if (entry.MONTH === null) return;
  const year = new Date(entry.MONTH).getFullYear();
  const month = new Date(entry.MONTH).getMonth();
  const monthName = monthNames[month];
  let monthData = formattedDataMonth.find((data) => data.label === monthName);
  if (!monthData) {
    monthData = {
      label: monthName,
      data: {},
      backgroundColor: getBackgroundColor(),
    };
    formattedDataMonth.push(monthData);
  }
  monthData.data[year] = entry.ACTIVE_WALLETS;
});

formattedDataMonth.forEach((monthData) => {
  monthData.data = Object.entries(monthData.data).sort((a, b) => a[0] - b[0]);
});

const v_bar_data = {
  v_bar_labels,
  datasets: formattedDataMonth,
};

const v_bar_options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
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
