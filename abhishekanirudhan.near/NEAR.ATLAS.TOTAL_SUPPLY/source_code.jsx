let static_file_param = "near_supply_staking.csv";
// Monthly Active Accounts Example
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

const data = rawData.body || [];

let Style = styled.div`
                `;

//console.log(rawData);
// data available

const total_supply = {};
const circ_supply = {};

data.map((entry) => {
  total_supply[entry["activity_date"]] = entry["total_supply"];
  circ_supply[entry["activity_date"]] =
    entry["total_supply"] - entry["total_locked"];
});

console.log(data);

const dates = data.map((entry) => entry["activity_date"]);

const area_chart_data = {
  labels,
  datasets: [
    {
      type: "line",
      fill: true,
      label: "Circulating Supply",
      borderWidth: 1,
      borderColor: "rgb(220, 20, 60)",
      backgroundColor: "rgba(220, 20, 60, 0.5)",
      data: circ_supply,
    },
    {
      type: "line",
      fill: true,
      label: "Total Supply",
      borderWidth: 1,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      data: total_supply,
    },
  ],
};

return (
  <Style>
    <div className="text-bg-dark rounded-4 p-3 mb-4">
      {data !== null ? (
        <p>
          <ChartEl type="type" data={area_chart_data} />
        </p>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  </Style>
);
