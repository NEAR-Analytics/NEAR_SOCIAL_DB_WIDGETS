const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const resPerPage = 10;
const apiUrl = `https://api.pikespeak.ai/daos/transfers-beneficiaries/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const columns = [
  {
    id: "account",
    label: "Beneficiary",
    formatter: (d) => {
      return (
        <a
          href={`https://explorer.near.org/accounts/${d.account}`}
          target="_blank"
        >
          {d.account}
        </a>
      );
    },
  },
  {
    id: "totalEstimatedValue",
    label: "Estimated Value",
    formatter: (d) => {
      return <span>$ {d.totalEstimatedValue.toFixed(2)}</span>;
    },
  },
];

State.init({
  ranking: [],
  offset: 0,
  account,
  displayedRank: [],
});

const nextPage = () => {
  const currentOffset = state.offset + resPerPage;
  console.log(
    state.offset,
    state.ranking.slice(currentOffset, resPerPage + currentOffset)
  );
  State.update({
    offset: currentOffset,
    displayedRank: [
      ...state.ranking.slice(currentOffset, resPerPage + currentOffset),
    ],
  });
};

const previousPage = () => {
  console.log("previous", state);
  const currentOffset = state.offset - resPerPage;
  State.update({
    offset: currentOffset,
    displayedRank: state.ranking.slice(
      currentOffset,
      resPerPage + currentOffset
    ),
  });
};

const fetchTransfersBeneficiaries = () => {
  const beneficiaries = fetch(apiUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  beneficiaries.body &&
    State.update({
      ranking: beneficiaries.body,
      displayedRank: beneficiaries.body.slice(0, resPerPage),
    });
};

fetchTransfersBeneficiaries(state.offset);

console.log("ranking", state.displayedRank);

const GenericTable = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      title: "Transfers beneficiaries ranking",
      columns,
      data: state.displayedRank,
      nextPage,
      previousPage,
      offset: state.offset,
      resPerPage,
    }}
  />
);

return <div>{GenericTable}</div>;
