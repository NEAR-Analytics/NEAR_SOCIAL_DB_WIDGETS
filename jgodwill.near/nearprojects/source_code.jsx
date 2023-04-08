const user = "jgodwill.near";

const gist_id = "09f2b3bc64829b975ce847f90bb2af28";

State.init({
  jsonData: null,
  error: null,
});

const DUMMYDATA = [
  {
    ProjectName: "ABCD",
    Category: null,
    Subtitle: null,
    AwesomeNearLink: null,
    Series: null,
    ABBV: null,
    Icon: "ABCD",
    "Website Link": "ABCD",
    "Buy Link": null,
    "Stake Link": null,
    "DApp Link": "ABCD",
    Facebook: "ABCD",
    Twitter: "ABCD",
    Github: "ABCD",
    Telegram: "ABCD",
    Discord: "ABCD",
    Linkedin: null,
    Medium: "ABCD",
    "Other Links": null,
    "Near Token": null,
    "Aurora Token": null,
    "Ethereum Token": null,
    "Other Tokens": "ABCD",
    Description: "ABCD",
    Grants: null,
    "News Articles": null,
    WalletSelector_Comments1: null,
    WalletSelector_Comments2: null,
    Notes:
      "PrevFundraising:xyza|CurrentFundraising:ABCD|TobeContacted:ABCD|Integrated_WS:ABCD|Email:ABCD|ContactEmail:ABCD",
    Date_Created: "ABCD",
  },
  {
    ProjectName: "ABCD",
    Category: null,
    Subtitle: null,
    AwesomeNearLink: null,
    Series: null,
    ABBV: null,
    Icon: "ABCD",
    "Website Link": "ABCD",
    "Buy Link": null,
    "Stake Link": null,
    "DApp Link": "ABCD",
    Facebook: "ABCD",
    Twitter: "ABCD",
    Github: "ABCD",
    Telegram: "ABCD",
    Discord: "ABCD",
    Linkedin: null,
    Medium: "ABCD",
    "Other Links": null,
    "Near Token": null,
    "Aurora Token": null,
    "Ethereum Token": null,
    "Other Tokens": "ABCD",
    Description: "ABCD",
    Grants: null,
    "News Articles": null,
    WalletSelector_Comments1: null,
    WalletSelector_Comments2: null,
    Notes:
      "PrevFundraising:xyza|CurrentFundraising:ABCD|TobeContacted:ABCD|Integrated_WS:ABCD|Email:ABCD|ContactEmail:ABCD",
    Date_Created: "ABCD",
  },
  {
    ProjectName: "ABCD",
    Category: null,
    Subtitle: null,
    AwesomeNearLink: null,
    Series: null,
    ABBV: null,
    Icon: "ABCD",
    "Website Link": "ABCD",
    "Buy Link": null,
    "Stake Link": null,
    "DApp Link": "ABCD",
    Facebook: "ABCD",
    Twitter: "ABCD",
    Github: "ABCD",
    Telegram: "ABCD",
    Discord: "ABCD",
    Linkedin: null,
    Medium: "ABCD",
    "Other Links": null,
    "Near Token": null,
    "Aurora Token": null,
    "Ethereum Token": null,
    "Other Tokens": "ABCD",
    Description: "ABCD",
    Grants: null,
    "News Articles": null,
    WalletSelector_Comments1: null,
    WalletSelector_Comments2: null,
    Notes:
      "PrevFundraising:xyza|CurrentFundraising:ABCD|TobeContacted:ABCD|Integrated_WS:ABCD|Email:ABCD|ContactEmail:ABCD",
    Date_Created: "ABCD",
  },
];
const loadActualData = () => {
  asyncFetch(
    "https://gist.githubusercontent.com/Jikugodwill/09f2b3bc64829b975ce847f90bb2af28/raw/a5230d5e3706ab451a75db4e72d443e15339bdb3/projectData.json"
  )
    .then((response) => response.body)
    .then((data) => {
      data = JSON.parse(data);
      console.log(typeof data);
      State.update({ jsonData: data });
    })
    .catch((error) => {
      State.update({ error: error });
      console.log(error);
    });
};

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: rgba(214, 214, 214, 0.2);
  border-radius: 10px;
  justify-content: center;
  padding-top: 3em;
  box-shadow: 0 0.05rem 0.05rem rgb(34 34 34 / 5%), 0 0.2rem 0.8rem rgb(34 34 34 / 8%);
`;

let content = !state.jsonData && "Sample";

loadActualData();
return (
  <div class="container-fluid">
    <h3 class="text-center">{content} Near Projects </h3>
    {!state.jsonData && (
      <button onClick={loadActualData} class="btn btn-primary">
        load Cards
      </button>
    )}
    <hr />
    {state.jsonData ? (
      <Cards>
        {state.jsonData.map((projectData, i) => {
          if (projectData.ProjectName)
            return (
              <Widget
                src={`${user}/widget/nearprojectcard`}
                key={i}
                props={projectData}
              />
            );
        })}
      </Cards>
    ) : (
      <>
        {state.error && <div>Could not load json data</div>}
        <Cards>
          {DUMMYDATA.map((projectData, i) => {
            if (projectData.ProjectName)
              return (
                <Widget
                  src={`${user}/widget/nearprojectcard`}
                  key={i}
                  props={projectData}
                />
              );
          })}
        </Cards>
      </>
    )}
  </div>
);
