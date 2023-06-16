let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/84e3bf99-a78b-4a0e-97af-e9af193ce868/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const data = raw_data.body || [];

let Style = styled.div`
                `;

// logic start

const sortedData = data.sort((a, b) => {
  return new Date(a["FULL_DATE"]) - new Date(b["FULL_DATE"]);
});

const COMMITS_COUNT = {};

data.map((entry) => {
  COMMITS_COUNT[entry["FULL_DATE"]] = entry["COMMITS_COUNT"];
});

const dates = data.map((entry) => entry["FULL_DATE"]);

// console.log(processedData);

// logic part-2

const stacked_options = {
  scales: {
    y: {
      stacked: true,
      grid: {
        color: "rgba(255, 0, 0, 0.2)", // This will change the gridline color
        borderColor: "rgb(240,255,240)",
      },
      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
      },
    },
    x: {
      stacked: true,
      grid: {
        color: "rgba(255, 0, 0, 0.2)", // This will change the gridline color
      },
      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
      },
    },
  },
};

const stacked_bar_data = {
  dates,
  datasets: [
    {
      label: "COMMITS_COUNT",
      data: COMMITS_COUNT,
      backgroundColor: "rgb(75, 192, 192)",
    },
  ],
};

return (
  <Style>
    <div className="text-bg-dark container">
      {data !== null ? (
        <div className="rounded-4 p-3 mb-4">
          <div className="">
            <BarEl options={stacked_options} data={stacked_bar_data} />
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  </Style>
);
