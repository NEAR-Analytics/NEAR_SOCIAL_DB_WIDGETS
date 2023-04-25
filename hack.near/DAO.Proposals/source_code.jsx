const widgetProvider = "frichard5.near";
const refUrl = "https://api.stats.ref.finance/api/ft";

// Initial state
State.init({
  selectedDao: "marketing.sputnik-dao.near",
  selectedTab: "money",
});

const WidgetsContainer = styled.div`
    
`;

// Fetch
const ftList = fetch(refUrl);

// Components

const Balances = (
  <Widget
    src={`${widgetProvider}/widget/account_balance`}
    props={{
      account: state.selectedDao,
      ftList: ftList.body && ftList.body,
      widgetProvider,
    }}
  />
);

const NearTransfers = (
  <Widget
    src={`${widgetProvider}/widget/near_transfers`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const FTransfers = (
  <Widget
    src={`${widgetProvider}/widget/ft_transfers`}
    props={{
      account: state.selectedDao,
      ftList: ftList.body && ftList.body,
      widgetProvider,
    }}
  />
);

const ContractMetrics = (
  <Widget
    src={`${widgetProvider}/widget/contract_metrics`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const ProposalStatus = (
  <Widget
    src={`${widgetProvider}/widget/proposals-status`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const ProposalsByMonth = (
  <Widget
    src={`${widgetProvider}/widget/proposal-by-month`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const Proposals = (
  <Widget
    src={`${widgetProvider}/widget/proposals`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const Policy = (
  <Widget
    src={`${widgetProvider}/widget/NDC-policy`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const VotersByProposal = (
  <Widget
    src={`${widgetProvider}/widget/NDC-members-voters`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const VoteHistory = (
  <Widget
    src={`${widgetProvider}/widget/NDC-vote-history`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const Tabs = (
  <Widget
    src={`${widgetProvider}/widget/NDC-Tabs`}
    props={{
      tabs: [
        {
          value: "overview",
          label: "Overview",
          selected: true,
          //selected: state.selectedTab === "metrics",
          components: (
            <WidgetsContainer>
              {ProposalsByMonth}
              {ProposalStatus}
            </WidgetsContainer>
          ),
        },
        {
          value: "proposals",
          label: "Proposals",
          components: <WidgetsContainer>{Proposals}</WidgetsContainer>,
        },
        {
          value: "treasury",
          label: "Treasury",
          components: (
            <WidgetsContainer>
              {Balances}
              {NearTransfers}
              {FTransfers}
            </WidgetsContainer>
          ),
        },
        {
          value: "members",
          label: "Members",
          //selected: state.selectedTab === "members",
          components: (
            <WidgetsContainer>
              {VoteHistory}
              {VotersByProposal}
            </WidgetsContainer>
          ),
        },
        {
          value: "policy",
          label: "Policy",
          components: <WidgetsContainer>{Policy}</WidgetsContainer>,
        },
      ],
      widgetProvider,
    }}
  />
);

const selectDao = ({ target: { value } }) => {
  State.update({ selectedDao: value });
};

const Select = (
  <Widget
    src={`${widgetProvider}/widget/NDC-select`}
    props={{
      options: [
        { value: "marketing.sputnik-dao.near", label: "Marketing" },

        { value: "rc-dao.sputnik-dao.near", label: "Global" },
        { value: "near-china-community.sputnik-dao.near", label: "China" },
        { value: "nearafrica.sputnik-dao.near", label: "Africa" },
        { value: "near-german.sputnik-dao.near", label: "Germany" },
        { value: "near-indonesia.sputnik-dao.near", label: "Indonesia" },
        { value: "near-italia.sputnik-dao.near", label: "Italy" },
        { value: "nearprotocolkoreadao.sputnik-dao.near", label: "Korea" },
        {
          value: "open-web-academy.sputnik-dao.near",
          label: "OWA",
        },
        { value: "near-native.sputnik-dao.near", label: "Russia" },
        { value: "sankore-2.sputnik-dao.near", label: "Sankore" },
        {
          value: "nearprotocol-turkiye.sputnik-dao.near",
          label: "Turkey",
        },
        { value: "nearuaguild.sputnik-dao.near", label: "Ukraine" },
        { value: "near-venezuela.sputnik-dao.near", label: "Venezuela" },
      ],
      selectedOption: state.selectedDao,
      onChange: selectDao,
      top: 29,
    }}
  />
);

return (
  <>
    {Select}
    {Tabs}
  </>
);
