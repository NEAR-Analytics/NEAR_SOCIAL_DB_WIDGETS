// Monthly Active Accounts Example
let raw_data = fetch(
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

const stacked_options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const stacked_bar_labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

const stacked_bar_data = {
  stacked_bar_labels,
  datasets: [
    {
      label: "Dataset 1",
      data: {
        January: 634,
        February: 596,
        March: 806,
        April: 81,
        May: 25,
        June: 289,
        July: 191,
      },
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Dataset 2",
      data: {
        January: 768,
        February: -12,
        March: 897,
        April: 7,
        May: 532,
        June: 792,
        July: 96,
      },
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "Dataset 3",
      data: {
        January: 585,
        February: 716,
        March: 861,
        April: 722,
        May: 384,
        June: 454,
        July: 322,
      },
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};

// vertical bar chart

// vertical_chart

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

const v_bar_labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

const v_bar_data = {
  v_bar_labels,
  datasets: [
    {
      label: "Dataset 1",
      data: {
        January: 199,
        February: 900,
        March: 145,
        April: 490,
        May: 260,
        June: 35,
        July: 82,
      },
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: {
        January: 581,
        February: 829,
        March: 145,
        April: 490,
        May: 260,
        June: 735,
        July: 842,
      },
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

// Horizontal Bar:
// horizontal_bar

const h_bar_options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
};

const h_bar_labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

const h_bar_data = {
  h_bar_labels,
  datasets: [
    {
      label: "Dataset 1",
      data: {
        January: 121,
        February: -837,
        March: -457,
        April: 943,
        May: -81,
        June: -687,
        July: -673,
      },
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: {
        January: 121,
        February: 837,
        March: 457,
        April: -43,
        May: 21,
        June: 87,
        July: 73,
      },
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

// grouped bar chart:

// grouped_bar_chart

const g_bar_options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const g_bar_labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

const g_bar_data = {
  g_bar_labels,
  datasets: [
    {
      label: "Dataset 1",
      data: {
        January: 121,
        February: -837,
        March: -457,
        April: 943,
        May: -81,
        June: -687,
        July: -673,
      },
      backgroundColor: "rgb(255, 99, 132)",
      stack: "Stack 0",
    },
    {
      label: "Dataset 2",
      data: {
        January: 121,
        February: 837,
        March: 457,
        April: -43,
        May: 21,
        June: 87,
        July: 73,
      },
      backgroundColor: "rgb(75, 192, 192)",
      stack: "Stack 0",
    },
    {
      label: "Dataset 3",
      data: {
        January: 199,
        February: 900,
        March: 145,
        April: 490,
        May: 260,
        June: 35,
        July: 82,
      },
      backgroundColor: "rgb(53, 162, 235)",
      stack: "Stack 1",
    },
  ],
};

return (
  <Style>
    <div className="text-bg-light rounded-4 p-3 mb-4">
      {data !== null ? (
        <p>
          <div class="d-flex clearfix flex-wrap flex-column flex-sm-row">
            <div class="p-2">
              <div>
                <h2>Metric: {METRIC_NAME}</h2>
                <BarEl options={stacked_options} data={stacked_bar_data} />
              </div>
            </div>
            <hr />

            <div class="p-2">
              <div>
                <h2>Metric: {METRIC_NAME}</h2>
                <BarEl options={v_bar_options} data={v_bar_data} />
              </div>
            </div>
            <hr />

            <div class="p-2">
              <div>
                <h2>Metric: {METRIC_NAME}</h2>
                <BarEl options={g_bar_options} data={g_bar_data} />
              </div>
            </div>
            <hr />

            <div class="p-2">
              <div>
                <h2>Metric: {METRIC_NAME}</h2>
                <BarEl options={h_bar_options} data={h_bar_data} />
              </div>
            </div>
            <hr />
          </div>

          <div></div>
        </p>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  </Style>
);
