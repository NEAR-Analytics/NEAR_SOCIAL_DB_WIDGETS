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

const sub_widget_map = {
  "Play Ember": "https://nearatlas.com/#/y3k.near/widget/WAU_PlayEmber",
};

function formatPercentNew(text) {
  let number = parseFloat(text);
  return <span className="text-white">{number}%</span>;
}

function formatNumber(num) {
  return (
    <span className="text-white">
      {num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
    </span>
  );
}
function formatCell(text) {
  return (
    <a
      href={
        "https://nearatlas.com/#/y3k.near/widget/NEART.ATLAS.DETAILED_PROJECT_DASHBOARD?project_name=" +
        text
      }
      className="text-warning text-wrap "
    >
      {text}
    </a>
  );
}

function formatText(text) {
  let number = parseFloat(text);
  if (number < 0) {
    return <span className="text-danger">{number}%</span>;
  } else if (number > 0) {
    return <span className="text-success">{number}%</span>;
  } else {
    return <span className="text-warning">{number}%</span>;
  }
}

const data = {
  nodes: nodes,
};

const COLUMNS = [
  {
    label: <p className="text-center text-white text-wrap">Project</p>,
    renderCell: (item) => formatCell(item["Contract Address"]),
    sort: { sortKey: "ContractAddress" },
  },
  {
    label: <p className="text-center text-white text-wrap ">Past 30 Days</p>,
    renderCell: (item) => formatNumber(item["Past 30 Days"]),
    sort: { sortKey: "Past30" },
  },
  {
    label: <p className="text-center text-white text-wrap ">Last Month</p>,
    renderCell: (item) => formatNumber(item["30-60 Days Ago"]),
    sort: { sortKey: "PercentNew" },
  },
  {
    label: <p className="text-center text-white text-wrap ">M/M</p>,
    renderCell: (item) => formatText(item["M/M"]),
    sort: { sortKey: "MM" },
  },
  {
    label: <p className="text-center text-white text-wrap ">New MAAs</p>,
    renderCell: (item) => formatNumber(item["New MAAs"]),
    sort: { sortKey: "MM" },
  },
  {
    label: <p className="text-center text-white text-wrap ">M2 Retention</p>,
    renderCell: (item) => formatPercentNew(item["M2 Retention"]),
    sort: { sortKey: "MM" },
  },

  {
    label: <p className="text-center text-white text-wrap ">Average DAU</p>,
    renderCell: (item) => formatNumber(item["Daily Average"]),
    sort: { sortKey: "PercentNew" },
  },

  {
    label: <p className="text-center text-white text-wrap ">Stickiness</p>,
    renderCell: (item) => formatPercentNew(item["DAU / MAU"]),
    sort: { sortKey: "PercentNew" },
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
  <div className="text-bg-dark rounded-4 mb-12">
    {data !== null ? (
      <div Style={{ "min-width": "780px" }} className="bg-dark">
        <BasicTable columns={COLUMNS} data={data} sortFns={sortFns} />
      </div>
    ) : (
      <div>Loading ...</div>
    )}
  </div>
);
