const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/votes-history/${account}`;
const apiProposalUrl = `https://api.pikespeak.ai/daos/proposal/${account}`;
const apiPolicyUrl = `https://api.pikespeak.ai/daos/policy`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const thumbUpSvg = (
  <svg
    class="approved-icon"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="ThumbUpIcon"
  >
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"></path>
  </svg>
);
const thumbDownSvg = (
  <svg
    class="rejected-icon"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="ThumbDownIcon"
  >
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path>
  </svg>
);

const getVoteSvg = (vote) => {
  switch (vote) {
    case "VoteReject":
      return thumbDownSvg;
    case "VoteApprove":
      return thumbUpSvg;
  }
};

const columns = [
  {
    id: "timestamp",
    label: "Date",
    formatter: (d) => {
      return new Date(d.timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
  },
  {
    id: "sender",
    label: "Voter",
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
    id: "id",
    label: "Proposal id",
    formatter: (d) => {
      const proposalId = d.transaction_view.actProposal.id;
      const setModal = (proposalId) => {
        return () => {
          State.update({
            isModalOpen: true,
            proposalId: proposalId,
            fetchingProposal: true,
          });
        };
      };
      return <button onClick={setModal(proposalId)}>{proposalId}</button>;
    },
  },
  {
    id: "action",
    label: "Vote",
    formatter: (d) => {
      return getVoteSvg(d.transaction_view.actProposal.action);
    },
  },
  {
    id: "transaction_id",
    label: "Tx id",
    formatter: (d) => {
      return (
        <a
          href={`https://explorer.near.org/transactions/${d.transaction_id}`}
          target="_blank"
        >
          {d.transaction_id}
        </a>
      );
    },
  },
];

const resPerPage = 10;

State.init({
  votes: [],
  offset: 0,
  isModalOpen: false,
  proposal: false,
  account,
  fetchingProposal: false,
});

const nextPage = () => {
  State.update({ offset: state.offset + resPerPage });
};

const previousPage = () => {
  State.update({ offset: state.offset - resPerPage });
};

const GenericTable = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      title: "Votes history",
      columns,
      data: state.votes,
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
      proposal: state.proposal,
      council: state.council,
    }}
  />
);

const fetchVoteHistory = (offset) => {
  const voteHistory = fetch(apiUrl + `?offset=${offset}&limit=${resPerPage}`, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  voteHistory.body &&
    State.update({
      votes: voteHistory.body,
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

if (state.proposalId || !state.votes.length || state.account != account) {
  fetchProposal(state.proposalId);
  fetchVoteHistory(state.offset);
}

const fetchPolicy = (daos) => {
  const policy = asyncFetch(apiPolicyUrl + `?daos=${daos}`, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  }).then(({ err, body, ok }) => {
    if (ok) {
      State.update({
        council: body.state.policy.roles.find((r) => r.name === "Council").kind,
      });
    }
  });
};

!state.council && fetchPolicy([account]);

const toggleModal = (isOpen) => {
  State.update({ isModalOpen: isOpen });
};

return (
  <>
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
  </>
);
