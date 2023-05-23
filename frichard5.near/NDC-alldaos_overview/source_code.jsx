const widgetProvider = 'frichard5.near';
const refUrl = "https://api.stats.ref.finance/api/ft";
const widgetProposalCountUrl = `https://api.pikespeak.ai/widgets/daos/ndcoverview`;
const ftList = fetch(refUrl);

const daosList = [
    "ndctrust.sputnik-dao.near",
    "marketing.sputnik-dao.near",
    "creativesdao.sputnik-dao.near",
    "neardevgov.sputnik-dao.near",
    "gwg.sputnik-dao.near",
];

const avenirFontFamily = fetch(
    "https://fonts.cdnfonts.com/css/avenir-lt-std"
).body;

const Balances = (
    <Widget
        src={`${widgetProvider}/widget/NDC-alldaos.aggregated-balances`}
        props={{
            widgetProvider,
            ftList: ftList.body
        }}
    />
);
const Banner = (
    <Widget
        src={`${widgetProvider}/widget/NDC-Banner`}
        props={{
            widgetProvider,
            ftList: ftList.body
        }}
    />
);

const Proposals = (
    <Widget
        src={`${widgetProvider}/widget/proposals`}
        props={{
            account: state.selectedDao,
            ftList: ftList.body && ftList.body,
            widgetProvider,
            initialSelectedDaos: daosList
        }}
    />
);

const DashboardContainer = styled.div`
  * {
    font-family: 'avenir lt std';    
  }
  h2 {
    font-weight: 600;
    margin-left: 0px;
    font-size: 26px;
  }
  padding: 28px;
  background-size: contain;
  background-repeat: no-repeat;
  ${avenirFontFamily}
  button {
    margin-left: 10px;
    color: black;
    background:rgba(255, 213, 13, 0.5);
    border: none;
    &:hover {
      background:rgba(255, 213, 13, 1);
      color: black;
    }
    &:active {
        background-color:rgba(255, 213, 13, 0.8);
        color: black !important;
    }
  }
  *.rejected {
      color:#ff5e03;
  }
  *.approved {
      color:#13a36e;
  }
  svg {
    &.approved-icon {
      height: 20px;
      fill:#13a36e;
    }
    &.rejected-icon {
      height: 20px;
      fill: #ff5e03;
    }
  }
 
  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: rgba(81, 81, 81, 0.3);
    border-radius: 3px;
  }

  
  *::-webkit-scrollbar-thumb:hover {
    background: rgba(81, 81, 81, 0.5);;
  }

  *::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;


const Card = styled.div`
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
  border-radius: 4px;
  padding: 20px;
  margin-top: 40px;`

return <DashboardContainer>
    {Banner}
    <Card>
        <h1>DAOs overview</h1>
        <p>Click on any link to access detailed dao dashboard.</p>
        <p style={{maxWidth: "300px" }}>
            {daosList.map((dao) => <a
                href={`https://near.org/${widgetProvider}/widget/NDC-Page?selected_dao=${dao}`}
                target="_blank"
            >
                {dao}
            </a>)}
        </p>
    </Card>
    {Balances}
    <>
        <iframe
            style={{ width: "100%", height: "440px", marginTop: "40px" }}
            src={widgetProposalCountUrl}
        ></iframe>
    </>
    {Proposals}
</DashboardContainer>