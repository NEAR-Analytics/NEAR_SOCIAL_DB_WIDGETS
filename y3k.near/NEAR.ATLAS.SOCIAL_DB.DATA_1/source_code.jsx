let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/d0794b08-2c4f-495a-b9f1-76ac0fdcdeef/data/latest",
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
  return new Date(a["MONTH"]) - new Date(b["MONTH"]);
});

const COMMITS_COUNT = {};

data.map((entry) => {
  COMMITS_COUNT[entry["MONTH"]] = entry["COMMITS_COUNT"];
});

const dates = data.map((entry) => entry["MONTH"]);

//

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

// console.log(processedData);

function convertData(data) {
  const result = {};

  data.forEach(({ YEAR, MONTH, COMMITS_COUNT }, index) => {
    if (!result[YEAR.toString()]) {
      result[YEAR.toString()] = {
        label: YEAR.toString(),
        backgroundColor: getBackgroundColor(),
        data: {},
      };
    }

    result[YEAR.toString()].data[MONTH] = COMMITS_COUNT;
  });

  return result;
}

const convertedData = convertData(data);

const valuesOnly = Object.values(convertedData);
// console.log(valuesOnly);

// logic part-2

const stacked_options = {
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const stacked_bar_data = {
  dates,
  datasets: valuesOnly,
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
