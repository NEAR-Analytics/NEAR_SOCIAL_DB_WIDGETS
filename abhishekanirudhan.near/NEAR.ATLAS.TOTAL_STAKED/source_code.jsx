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

const total_staked = {};

data.map((entry) => {
  total_staked[entry["activity_date"]] = entry["total_staked"];
});

const dates = data.map((entry) => entry["activity_date"]);

const area_chart_data = {
  labels,
  datasets: [
    {
      type: "line",
      fill: true,
      label: "Total Staked",
      borderWidth: 2,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      data: total_staked,
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
