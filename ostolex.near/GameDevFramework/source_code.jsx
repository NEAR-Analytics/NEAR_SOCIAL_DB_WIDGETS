const data = `
- [Widget for rolling dice](https://near.social/#/ostolex.near/widget/DiceWidget)
- [Widget for matching users](https://near.social/#/let45fc.near/widget/UsersMatcher)
- [LeaderBoard widget](https://near.social/#/ostolex.near/widget/LeaderBoardWidget)
`;

return (
  <>
    <h1>List of widgets for gamedev</h1>
    <Markdown text={data} />
  </>
);
