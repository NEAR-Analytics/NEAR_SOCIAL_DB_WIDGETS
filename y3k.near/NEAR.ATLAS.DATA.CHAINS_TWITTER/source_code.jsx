let static_file_param = "NEAR-ATLAS-DATA-TWITTER.csv";
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

const METRIC_NAME = "NEAR TWITTER FOLLOWERS";

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

rawData.body.forEach((datum) => {
  if (!datum["Daily_Date"]) {
    return;
  }
});

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

function parseCounts(countsString) {
  if (typeof countsString === "number") {
    return parseInt(countsString);
  } else if (typeof countsString === "string") {
    const dailyString = countsString.replace(",", "").replace(",", "") || "0"; // default to "0" if
    return parseInt(dailyString);
  } else {
    console.log(` ${countsString} is neither a string nor a number`);
  }
  // return countsString.split(",").map((str) => parseInt(str, 10));
}

const formatData = (rawData) => {
  let result = [];

  rawData.forEach((item) => {
    let year = item.Date ? item.Date.split("-")[0] : "";
    let month = item.Date ? item.Date.split("-")[1] : "";

    if (!year || !month) return;

    if (!result.find((x) => x.label === year)) {
      result.push({
        label: year,
        data: {},
        backgroundColor: getBackgroundColor(),
      });
    }

    let yearData = result.find((x) => x.label === year);
    yearData.data[monthNames[month - 1]] = parseCounts(item["# of Followers"]);
  });

  result.forEach((year) => {
    const yearData = year.data;
    monthNames.forEach((month) => {
      if (!yearData[month]) {
        yearData[month] = 0;
      }
    });
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

const formattedDataMonth = [];

let project_labels = [];

try {
  rawData.body.forEach((entry) => {
    if (entry.Date === null) return;

    entry.keys().forEach((key) => {
      if (key === "Date") return;
      if (!project_labels.includes(key)) {
        project_labels.push(key);
      }
    });
  });
} catch (err) {
  console.log(err);
}

rawData.body.forEach((entry) => {
  if (entry.Date === null) return;
  const year = new Date(entry.Date).getFullYear();
  const month = new Date(entry.Date).getMonth();
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
  monthData.data[year] = parseCounts(entry["# of Followers"]);
});

// const sortedArray = formattedDataMonth
//   .sort((a, b) => {
//     const yearsA = Object.keys(a.data);
//     const yearsB = Object.keys(b.data);
//     return parseInt(yearsB[0]) - parseInt(yearsA[0]);
//   })
//   .sort((a, b) => {
//     const monthAIndex = monthNames.indexOf(a.label);
//     const monthBIndex = monthNames.indexOf(b.label);
//     return monthAIndex - monthBIndex;
//   });

const sortedArray = formattedDataMonth.sort((a, b) => {
  const yearsA = Object.keys(a.data);
  const yearsB = Object.keys(b.data);
  return parseInt(yearsB[0]) - parseInt(yearsA[0]);
});

const allYears = [...new Set(sortedArray.map((x) => Object.keys(x.data)[0]))];

sortedArray.forEach((item) => {
  allYears.forEach((y) => {
    if (!item.data[y]) {
      item.data[y] = 0;
    }
  });
});

sortedArray.sort((a, b) => {
  const monthAIndex = monthNames.indexOf(a.label);
  const monthBIndex = monthNames.indexOf(b.label);
  return monthAIndex - monthBIndex;
});

console.log(sortedArray);

const v_bar_data = {
  project_labels,
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
      text: "NEAR TWITTER FOLLOWERS",
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
