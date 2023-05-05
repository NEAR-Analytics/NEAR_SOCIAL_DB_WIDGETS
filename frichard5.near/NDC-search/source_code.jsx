const { account, widgetProvider, proposal_id } = props.account;

State.init({
  input: "",
});

const Input = (
  <Widget
    src={`${widgetProvider}/widget/NDC-input`}
    props={{
      buttonLabel: "Search",
      placeholder: "Enter an account address or a proposal id",
      sendInput: (i) => {
        console.log("input", i);
      },
    }}
  />
);

const ProposalCard = (
  <Widget
    src={`${widgetProvider}/widget/NDC-proposal-card`}
    props={{
      proposal,
      widgetProvider,
      ftList,
      council:
        state.policy &&
        state.policy
          .filter((pol) => pol.dao_id === proposal.dao_id)
          .map((pol) => {
            return pol.state.policy.roles.find(
              (r) => r.name === "Council" || r.name === "council"
            ).kind;
          })[0],
      voteExpired:
        state.policy &&
        state.policy.filter((pol) => pol.dao_id === proposal.dao_id)[0].state
          .policy.proposal_period,
    }}
  />
);

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

fetchProposal(state.proposal_id);

return (
  <div>
    {Input}
    {!state.fetchingProposal && state.proposal && ProposalCard}
  </div>
);
