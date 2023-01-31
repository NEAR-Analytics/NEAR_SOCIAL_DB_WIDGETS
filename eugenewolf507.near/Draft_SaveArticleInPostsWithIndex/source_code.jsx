const accountId = props.accountId ?? context.accountId;
// ========= STRUCTURE =========
const dataStructure = {
  article3G: {
    author: "EV",
    body: "body for article 3G",
  },
};

// ========= HANDLER SET =========
const getPublicationParamsAllArticles = () => {
  return { articlesPersonal2: dataStructure };
};

// ========= HANDLER GET =========
const clickHandlerGetStructure = () => {
  const path = "/articlesPersonal2/**";
  const data1 = Social.get(`${accountId}${path}`);
  console.log(data1);
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
