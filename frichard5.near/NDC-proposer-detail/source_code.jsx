const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const proposer = props.proposer;
const apiUrl = `https://api.pikespeak.ai/daos/account-proposal-history/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const resPerPage = 10;

const DetailWrapper = styled.div`
  position: relative;
  height: 370px;
  width: 80%;
  margin: 50px auto;
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
  overflow: auto;
  border-radius: 4px;
  padding: 20px;
  background: white;
  svg {
    height: 20px;
    &.approved-icon {
      fill:#13a36e;
    }
    &.rejected-icon {
      fill: #ff5e03;
    }
    &.not-voted-yet-icon {
      fill:  rgb(140, 140, 140)
    }
  }`;

const columns = [
  {
    id: "submission_time",
    label: "Date",
  },
  {
    id: "proposal_type",
    label: "Type",
  },
  {
    id: "proposal_id",
    label: "Proposal id",
    formatter: (d) => {
      return (
        <a
          href={`https://near.social/edit#/frichard5.near/widget/NDC-Page?tab=proposal&proposal_id=${d.proposal_id}`}
          target="_blank"
        >
          {d.proposal_id}
        </a>
      );
    },
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
  displayedHistory: [],
  history: [],
  offset: 0,
});

const nextPage = () => {
  const currentOffset = state.offset + resPerPage;
  State.update({
    offset: currentOffset,
    displayedHistory: state.history.slice(
      currentOffset,
      resPerPage + currentOffset
    ),
  });
};

const previousPage = () => {
  const currentOffset = state.offset - resPerPage;
  State.update({
    offset: currentOffset,
    displayedHistory: state.history.slice(
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
      data: state.displayedHistory,
      nextPage,
      previousPage,
      offset: state.offset,
      resPerPage,
    }}
  />
);

const fetchProposerHistory = () => {
  const history = fetch(apiUrl + `?proposer=${proposer}`, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  history.body &&
    State.update({
      displayedHistory: history.body.slice(0, resPerPage),
      history: history.body,
    });
};

fetchProposerHistory();

return (
  <DetailWrapper>
    <h2>
      <a
        href={`https://explorer.near.org/accounts/${proposer}`}
        target="_blank"
      >
        {proposer} proposal history
      </a>
    </h2>
    {state.displayedHistory && GenericTable}
  </DetailWrapper>
);
