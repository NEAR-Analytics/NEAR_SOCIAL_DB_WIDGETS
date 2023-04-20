const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/votes/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

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
    id: "isCouncil",
    label: "Council member",
    formatter: (d) => (d.isCouncil ? "yes" : "no"),
  },
  {
    id: "approve",
    label: "Approved",
    formatter: (d) => <span className="approved">{d.approve}</span>,
  },
  {
    id: "rejected",
    label: "Rejected",
    formatter: (d) => <span className="rejected">{d.approve}</span>,
  },
];

const fetchVotersByProposal = () => {
  const voters = fetch(apiUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  voters.body &&
    State.update({
      voters: voters.body,
    });
};
!state.voters && fetchVotersByProposal();

return (
  <div>
    {state.voters &&
      state.voters.map((v) => {
        return (
          <Widget
            src={`${widgetProvider}/widget/generic_table`}
            props={{
              title: `${v.type}`,
              columns,
              data: v.voters,
            }}
          />
        );
      })}
  </div>
);
