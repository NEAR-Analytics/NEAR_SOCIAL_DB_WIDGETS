// Monthly Active Accounts Example
let rawData = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/2122b458-2138-4d4b-b030-efa784fc04d3/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

// data.body = data.body.sort((a, b) => new Date(a.MONTH) - new Date(b.MONTH));

let Style = styled.div`

          `;

let nodes = rawData.body || [];

const data = {
  nodes: nodes,
};
const COLUMNS = [
  {
    label: "Contract Address",
    renderCell: (item) => item["Contract Address"],
    sort: { sortKey: "ContractAddress" },
  },
  {
    label: "Past 30 Days",
    renderCell: (item) => item["Past 30 Days"],
    sort: { sortKey: "Past30" },
  },
  {
    label: "Percent New",
    renderCell: (item) => item["Percent New"],
    sort: { sortKey: "PercentNew" },
  },
  {
    label: "30-60 Days Ago",
    renderCell: (item) => item["30-60 Days Ago"],
    sort: { sortKey: "PercentNew" },
  },
  { label: "M/M", renderCell: (item) => item["M/M"], sort: { sortKey: "MM" } },
  {
    label: "60-90 Days Ago",
    renderCell: (item) => item["60-90 Days Ago"],
    sort: { sortKey: "Past60" },
  },
  {
    label: "M/2M",
    renderCell: (item) => item["M/2M"],
    sort: { sortKey: "M2M" },
  },
];

const sortFns = {
  ContractAddress: (array) =>
    array.sort((a, b) =>
      a["Contract Address"].localeCompare(b["Contract Address"])
    ),
  Past30: (array) =>
    array.sort((a, b) => a["Contract Address"] - b["Contract Address"]),
  PercentNew: (array) =>
    array.sort((a, b) => a["Past 30 Days"] - b["Past 30 Days"]),
  MM: (array) => array.sort((a, b) => a["M/M"] - b["M/M"]),
  Past60: (array) =>
    array.sort((a, b) => a["60-90 Days Ago"] - b["60-90 Days Ago"]),
  M2M: (array) => array.sort((a, b) => a["M/2M"] - b["M/2M"]),
};

return (
  <div className="text-bg-dark rounded-4 p-3 mb-4">
    {data !== null ? (
      <div class="bg-dark">
        <BasicTable columns={COLUMNS} data={data} sortFns={sortFns} />
      </div>
    ) : (
      <div>Loading ...</div>
    )}
  </div>
);
