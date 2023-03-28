const user = "jgodwill.near";

const gist_id = "09f2b3bc64829b975ce847f90bb2af28";

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
State.init({
  jsonData: props.projectData,
});

async () => {
  let response = await fetch(`https://api.github.com/gists/${gist_id}`, {
    method: "GET",
  });

  let data = await response.text();
  State.update({ jsonData: data });
};
if (!data) {
  State.update({
    jsonData: DUMMYDATA,
  });
}

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

return (
  <div class="container-fluid">
    <h3 class="text-center">Sample list of near projects </h3>
    <hr />
    <Cards>
      {state.jsonData?.map((projectData, i) => {
        if (projectData.ProjectName)
          return (
            <Widget
              src={`${user}/widget/nearprojectcard`}
              key={i}
              props={projectData}
            />
          );
      }) || "Components Here"}
    </Cards>
  </div>
);
