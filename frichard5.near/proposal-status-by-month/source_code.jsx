const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/proposals/status-by-day/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

State.init({
  proposalsByMonth: [],
});

const fetchTransfers = () => {
  const proposalsByMonth = fetch(apiUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  if (proposalsByMonth.body) {
    const groupedProposals = {};
    proposalsByMonth.body.forEach((proposal) => {
      const { proposal_type, status, count, day } = proposal;
      const year = new Date(proposal.day).getFullYear();
      const month = new Date(proposal.day).getMonth() + 1;

      const key = `${year}-${month}`;

      if (groupedProposals.hasOwnProperty(key)) {
        const entry = groupedProposals[key].find(
          (e) => e.proposal_type === proposal_type && e.status === status
        );
        if (entry) {
          entry.count = parseInt(entry.count) + parseInt(count);
        } else {
          groupedProposals[key].push({
            proposal_type,
            status,
            count,
            day,
          });
        }
      } else {
        groupedProposals[key] = [
          {
            proposal_type,
            status,
            count,
            day,
          },
        ];
      }
    });

    const byMonth = Object.keys(groupedProposals)
      .map((key) => {
        const [year, month] = key.split("-");
        return {
          year,
          month,
          proposals: groupedProposals[key],
        };
      })
      .sort((a, b) => {
        if (a.year !== b.year) {
          return a.year - b.year;
        } else {
          return a.month - b.month;
        }
      });
    State.update({ proposalsByMonth: byMonth });
  }
};
fetchTransfers();

console.log(state.proposalsByMonth);

return <div>Hello World</div>;
