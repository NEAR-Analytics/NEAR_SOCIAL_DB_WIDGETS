const widgetProvider = props.widgetProvider;

State.init({
  input: "",
});

const Input = (
  <Widget
    src={`${widgetProvider}/widget/NDC-input`}
    props={{
      buttonLabel: "Search",
      placeholder: "Enter an account address or a proposal id",
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

fetchProposal(state.proposalId);

return <div>Hello World</div>;
