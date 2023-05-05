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
          href={`https://explorer.near.org/accounts/${d.account}`}
          target="_blank"
        >
          {d.account}
        </a>
      );
    },
  },
  {
    id: "total",
    label: "Proposal count",
  },
  {
    id: "total",
    label: "Details",
    formatter: (d) => {
      const setModal = (d) => {
        return () => {
          State.update({
            isModalOpen: true,
            currentProposerDetail: d.account,
          });
        };
      };
      return <button onClick={setModal(d)}>Show</button>;
    },
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

const ProposerDetails = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      proposer: state.currentProposerDetail,
      account,
      widgetProvider,
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
      displayedProposers: proposers.body.slice(0, resPerPage),
      proposers: proposers.body,
    });
};

fetchTopProposers();

const toggleModal = (isOpen) => {
  State.update({ isModalOpen: isOpen });
};

return (
  <>
    {state.currentProposerDetail && state.isModalOpen ? (
      <Widget
        src={`${widgetProvider}/widget/NDC-modal`}
        props={{
          isOpen: state.isModalOpen,
          toggleModal,
          component: ProposerDetails,
        }}
      />
    ) : (
      ""
    )}
    {GenericTable}
  </>
);
