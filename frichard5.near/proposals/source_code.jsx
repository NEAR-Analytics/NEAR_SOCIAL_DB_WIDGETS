const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/proposals/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const forgeUrl = (apiUrl, params) =>
  apiUrl +
  Object.keys(params).reduce(
    (paramString, p) => paramString + `${p}=${params[p]}&`,
    "?"
  );

const ProposalContainer = styled.div`

  overflow: auto;
`;

const resPerPage = 50;

State.init({
  offset: 0,
  lastProposalFetch: [],
  proposals: [],
  isLoading: false,
});

const columns = [
  {
    id: "submission_time",
    label: "Submission time",
  },
  {
    id: "proposal_id",
    label: "Proposal Id",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "proposal_type",
    label: "type",
  },
];

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
      title: `${account} proposals`,
      columns,
      data: state.proposals,
      nextPage,
      previousPage,
      offset: state.offset,
      resPerPage,
    }}
  />
);

const fetchProposal = (params) => {
  const proposals = asyncFetch(forgeUrl(apiUrl, params), {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  }).then(({ err, body, ok }) => {
    if (ok) {
      const allProposals = [...state.proposals, ...body];
      State.update({
        lastProposalFetch: body,
        proposals: allProposals,
        isLoading: false,
      });
    }
  });
};

if (!state.proposals.length) {
  fetchProposal({ limit: resPerPage, offset: state.offset });
}

const fetchMore = () => {
  if (!state.isLoading) {
    State.update({ offset: state.offset + resPerPage, isLoading: true });
    fetchProposal({ limit: resPerPage, offset: state.offset });
  }
};

const ProposalCards = [];

state.proposals.forEach((proposal) => {
  ProposalCards.push(
    <Widget
      src={`${widgetProvider}/widget/NDC-proposal-card`}
      props={{
        proposal,
      }}
    />
  );
});

const ProposalInfiniteScroll = (
  <Widget
    src={`${widgetProvider}/widget/proposals_scroll`}
    props={{
      cards: ProposalCards,
      fetchMore: fetchMore,
      hasMore: state.lastProposalFetch.length === resPerPage,
    }}
  />
);

return <ProposalContainer>{ProposalInfiniteScroll}</ProposalContainer>;
