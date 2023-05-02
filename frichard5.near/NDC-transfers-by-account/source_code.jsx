const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const ftList = props.ftList;
const resPerPage = 10;
const apiUrl = `https://api.pikespeak.ai/daos/transfers-beneficiaries/${account}`;
const apiProposalUrl = `https://api.pikespeak.ai/daos/proposal/${account}`;
const apiPolicyUrl = `https://api.pikespeak.ai/daos/policy`;
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
    id: "proposals",
    label: "Transfers",
    formatter: (d) => {
      return d.proposals.map((p) => {
        const transferData = p.proposal.kind;
        const proposalId = p.proposal_id;
        const setModal = (proposalId) => {
          return () => {
            State.update({
              isModalOpen: true,
              proposalId: proposalId,
              fetchingProposal: true,
            });
          };
        };

        return (
          <div style={{ display: "flex", marginBottom: "5px" }}>
            {/* <Widget
              src={`${widgetProvider}/widget/table_ft_formatter`}
              props={{
                ftList,
                amount: transferData.parsedAmount,
                ft: transferData.token_id,
                isParsed: true,
              }}
            /> */}
            <button
              onClick={setModal(proposalId)}
              style={{ marginLeft: "10px" }}
            >
              {proposalId}
            </button>
          </div>
        );
      });
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
  offset: 0,
  account,
  displayedRank: [],
  isModalOpen: false,
  proposal: false,
  fetchingProposal: false,
});

const nextPage = () => {
  const currentOffset = state.offset + resPerPage;
  State.update({
    offset: currentOffset,
    displayedRank: [
      ...state.ranking.slice(currentOffset, resPerPage + currentOffset),
    ],
  });
};

const previousPage = () => {
  const currentOffset = state.offset - resPerPage;
  State.update({
    offset: currentOffset,
    displayedRank: state.ranking.slice(
      currentOffset,
      resPerPage + currentOffset
    ),
  });
};

const fetchProposal = (id) => {
  const proposal = fetch(apiProposalUrl + `?id=${id}`, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  proposal.body &&
    State.update({
      proposal: proposal.body.length ? proposal.body[0] : [],
      fetchingProposal: false,
    });
};

fetchProposal(state.proposalId);

const fetchPolicy = (daos) => {
  const policy = asyncFetch(apiPolicyUrl + `?daos=${daos}`, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  }).then(({ err, body, ok }) => {
    if (ok) {
      State.update({
        council: body.state.policy.roles.find(
          (r) => r.name === "Council" || r.name === "council"
        ).kind,
      });
    }
  });
};

!state.council && fetchPolicy([account]);

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

!state.displayedRank.length && fetchTransfersBeneficiaries();

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

const ProposalCard = (
  <Widget
    src={`${widgetProvider}/widget/NDC-proposal-card`}
    props={{
      widgetProvider,
      proposal: state.proposal,
      council: state.council,
    }}
  />
);

const toggleModal = (isOpen) => {
  State.update({ isModalOpen: isOpen });
};

return (
  <div>
    {state.proposal &&
    state.isModalOpen &&
    state.council &&
    !state.fetchingProposal ? (
      <Widget
        src={`${widgetProvider}/widget/NDC-modal`}
        props={{
          isOpen: state.isModalOpen,
          toggleModal,
          component: ProposalCard,
        }}
      />
    ) : (
      ""
    )}
    {GenericTable}
    {state.ranking && state.ranking.length === 0 && (
      <span>No Transfer Proposal Beneficiaries</span>
    )}
  </div>
);
