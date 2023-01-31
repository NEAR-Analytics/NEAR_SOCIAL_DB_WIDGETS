// =========  =========
const accountId = props.accountId ?? context.accountId;

// ========= TRY OBJECT STRUCTURE =========
const dataStructure = {
  article3G: {
    author: "EV",
    body: "body for article 3G",
  },
  // article3H: {
  //   author: "EV",
  //   body: "body for article 3H",
  // },
  // article17: {
  //   author: "EV",
  //   body: "body for article 17",
  // },
  // article18: {
  //   author: "EV",
  //   body: "body for article 18",
  // },
};

// ========= HANDLER SET =========
const getPublicationParamsAllArticles = () => {
  return { articlesPersonal2: dataStructure };
};

// ========= HANDLER GET =========
const clickHandlerGetStructure = () => {
  // === ALL ARTICLES
  const path = "/articlesPersonal2/**";
  const data1 = Social.get(`${accountId}${path}`);
  console.log(data1);

  // === ONE ARTICLE
  const data2 = Social.get(
    `${accountId}/articlesPersonal2/articleF/**`,
    "final"
  );
  console.log(data2);

  // === ALL IDS
  const data3 = Social.keys(`${accountId}/articlesPersonal2/*`, "final");
  console.log(Object.keys(data3[accountId].articlesPersonal2));
};

// ========= RETURN =========
return (
  <div>
    <p>Press button and check log in browser</p>
    <CommitButton data={getPublicationParamsAllArticles()}>
      SET Data
    </CommitButton>
    <button onClick={clickHandlerGetStructure}>GET Data</button>
  </div>
);
