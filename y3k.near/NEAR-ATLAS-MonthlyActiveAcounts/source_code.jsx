let static_file_param = "NEAR-ATLAS-DATA-MAAs.csv";
// Monthly Active Accounts Example
// Monthly Active Accounts Example
let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/c493c7b1-cfcc-4aee-ad79-869b4ed8ca90/data/latest",
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
  height: 60vh;

                `;

// logic start

const sortedData = data.sort((a, b) => {
  return new Date(a["DAY"]) - new Date(b["DAY"]);
});

const NEW_MAAS = {};
const RETURNING_MAAS = {};

data.map((entry) => {
  NEW_MAAS[entry["DAY"]] = entry["NEW_MAAS"];
  RETURNING_MAAS[entry["DAY"]] = entry["RETURNING_MAAS"];
});

// console.log(data);
// console.log(RETURNING_MAAS);

const dates = data.map((entry) => entry["DAY"]);

// console.log(processedData);

// logic part-2

const stacked_options = {
  plugins: {
    title: {
      display: true,
      text: "Monthly Active Accounts",
    },
  },
  responsive: true,
  maintainAspectRatio: true,
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
  datasets: [
    {
      label: "New MAAs",
      data: NEW_MAAS,
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "Returning MAAs",
      data: RETURNING_MAAS,
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
};

return (
  <Style>
    <div className="text-bg-dark rounded-4 p-3 mb-4">
      {data !== null ? (
        <p className="canvas-container">
          <BarEl options={stacked_options} data={stacked_bar_data} />
          <div></div>
        </p>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  </Style>
);
