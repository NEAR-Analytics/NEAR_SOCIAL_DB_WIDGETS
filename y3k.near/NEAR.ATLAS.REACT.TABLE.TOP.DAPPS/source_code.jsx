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

function formatNumber(num) {
  return (
    <span className="text-white">
      {num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
    </span>
  );
}

const sub_widget_map = {
  "Play Ember": "https://nearatlas.com/#/y3k.near/widget/WAU_PlayEmber",
};

function formatCell(text) {
  if (text in sub_widget_map) {
    return (
      <a
        href={sub_widget_map[text]}
        target="_blank"
        className="text-warning text-wrap "
      >
        {text}
      </a>
    );
  } else {
    return <span className="text-white text-wrap ">{text}</span>;
  }
}

function formatText(text) {
  let number = parseFloat(text);
  if (number < 0) {
    return <span className="text-danger">{number}</span>;
  } else if (number > 0) {
    return <span className="text-success">{number}</span>;
  } else {
    return <span className="text-warning">{number}</span>;
  }
}

const data = {
  nodes: nodes,
};

const COLUMNS = [
  {
    label: <p className="text-white text-wrap ">Contract Address</p>,
    renderCell: (item) => formatCell(item["Contract Address"]),
    sort: { sortKey: "ContractAddress" },
  },
  {
    label: <p className="text-white text-wrap ">Past 30 Days</p>,
    renderCell: (item) => formatNumber(item["Past 30 Days"]),
    sort: { sortKey: "Past30" },
  },
  {
    label: <p className="text-white text-wrap ">Percent New</p>,
    renderCell: (item) => formatText(item["Percent New"]),
    sort: { sortKey: "PercentNew" },
  },
  {
    label: <p className="text-white text-wrap ">30-60 Days Ago</p>,
    renderCell: (item) => formatNumber(item["30-60 Days Ago"]),
    sort: { sortKey: "PercentNew" },
  },
  {
    label: <p className="text-white text-wrap ">M/M</p>,
    renderCell: (item) => formatText(item["M/M"]),
    sort: { sortKey: "MM" },
  },
  {
    label: <p className="text-white text-wrap ">60-90 Days Ago</p>,
    renderCell: (item) => formatNumber(item["60-90 Days Ago"]),
    sort: { sortKey: "Past60" },
  },
  {
    label: <p className="text-white text-wrap ">M/2M</p>,
    renderCell: (item) => formatText(item["M/2M"]),
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
