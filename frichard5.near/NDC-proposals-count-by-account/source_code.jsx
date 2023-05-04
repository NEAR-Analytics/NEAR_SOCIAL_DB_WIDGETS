const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/top-proposers/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const resPerPage = 10;

const columns = [
  {
    id: "account",
    label: "Account",
    formatter: (d) => {
      return (
        <a
          href={`https://explorer.near.org/accounts/${d.transaction_view.sender}`}
          target="_blank"
        >
          {d.transaction_view.sender}
        </a>
      );
    },
  },
  {
    id: "total",
    label: "Total",
  },
];

State.init({
  displayedProposers: [],
  proposers: [],
  offset: 0,
});

const nextPage = () => {
  const currentOffset = state.offset + resPerPage;
  State.update({
    offset: currentOffset,
    displayedProposers: state.proposers.slice(
      currentOffset,
      resPerPage + currentOffset
    ),
  });
};

const previousPage = () => {
  const currentOffset = state.offset - resPerPage;
  State.update({
    offset: currentOffset,
    displayedProposers: state.proposers.slice(
      currentOffset,
      resPerPage + currentOffset
    ),
  });
};

const GenericTable = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      title: "Proposers",
      columns,
      data: state.displayedProposers,
      nextPage,
      previousPage,
      offset: state.offset,
      resPerPage,
    }}
  />
);

const fetchTopProposers = () => {
  const proposers = fetch(apiUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  proposers.body &&
    State.update({
      proposers: proposers.body.slice(0, resPerPage),
    });
};

fetchTopProposers();

console.log(state);

return <div>{GenericTable}</div>;
