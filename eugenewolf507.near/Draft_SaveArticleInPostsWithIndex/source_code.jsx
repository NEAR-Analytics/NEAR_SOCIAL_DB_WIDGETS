const accountId = props.accountId ?? context.accountId;
const clickHandlerGetStructureThis = () => {
  console.log("fgdsfsd");
  const path = "/articlesPersonal2/**";
  const data1 = Social.get(`${accountId}${path}`);
  console.log(data1);
  const data2 = Social.get(
    `${accountId}/articlesPersonal2/articleF/**`,
    "final"
  );
  console.log(data2);
  const data3 = Social.keys(`${accountId}/articlesPersonal2/*`, "final");
  console.log(Object.keys(data3[accountId].articlesPersonal2));
};
return (
  <div>
    <div>
      <h2>draft 2 widget</h2>
      <Widget src="eugenewolf507.near/widget/Draft_Eugene2" />
    </div>
    <div>
      <h2>this widget</h2>
      <button onClick={clickHandlerGetStructureThis}>Get Structure</button>
    </div>
  </div>
);
