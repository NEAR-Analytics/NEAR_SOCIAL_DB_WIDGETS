const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/votes/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const councilSvg = (
  <svg
    class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="DoneIcon"
    height="20"
    fill="#13a36e"
  >
    <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
  </svg>
);

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
    formatter: (d) => (d.isCouncil ? councilSvg : ""),
  },
  {
    id: "approve",
    label: "Approved",
    formatter: (d) => <span className="approved">{d.approve}</span>,
  },
  {
    id: "rejected",
    label: "Rejected",
    formatter: (d) => <span className="rejected">{d.rejected}</span>,
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
