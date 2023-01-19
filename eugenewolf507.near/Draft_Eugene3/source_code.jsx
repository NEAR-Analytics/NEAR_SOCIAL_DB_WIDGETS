// =========  =========
const accountId = props.accountId ?? context.accountId;

// ========= HANDLER GET =========
const clickHandlerGetStructureThis = () => {
  console.log("fgdsfsd");
  // === ALL ARTICLES
  // path that works
  // const path = "/*";
  // const path = "/widget/*";
  // const path = "/widget/Draft_Eugene2";
  const path = "/articlesPersonal2/**";
  const data1 = Social.get(`${accountId}${path}`);
  console.log(data1);

  // === ONE ARTICLE
  // const data2 = Social.keys("*/widget/*", "final");
  // const data2 = Social.keys("*/articles/*", "final");
  // const data2 = Social.getr("bearner.near/nametag/bearner.near/tags", "final");
  const data2 = Social.get(
    `${accountId}/articlesPersonal2/articleF/**`,
    "final"
  );
  console.log(data2);

  // === ALL IDS
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
