// =========  =========
const accountId = props.accountId ?? context.accountId;

// ========= TRY OBJECT STRUCTURE =========
const dataStructure = {
  articlG: {
    author: "EV",
    body: "body for article G",
  },
  articleH: {
    author: "EV",
    body: "body for article H",
  },
  article7: {
    author: "EV",
    body: "body for article 7",
  },
  article8: {
    author: "EV",
    body: "body for article 8",
  },
};

// ========= HANDLER SET =========
const clickHandlerSetStructure = () => {
  // Social.set(JSON.stringify(dataStructure));
  Social.set({ articles: JSON.stringify(dataStructure) });
};

// ========= HANDLER GET =========
const clickHandlerGetStructure = () => {
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

// ========= RETURN =========
return (
  <div>
    <p>Press button and check log in browser</p>
    {/* <button onClick={clickHandlerSetStructure}>Set Structure</button> */}
    <CommitButton
      data={{
        articlesPersonal2: dataStructure,
      }}
      // option how to write to anather account and syntax why we use {{}}
      // but I don't check it
      // data={{
      //   articles: { "eugenewolf507.near": { homepage: state.homepage } },
      // }}
    >
      SET All with CommitButton
    </CommitButton>
    <CommitButton
      data={{
        articlesPersonal2: {
          articleF: { body: "body 4 article F: FFFFFFF" },
        },
      }}
    >
      CHANGE One with CommitButton
    </CommitButton>
    <button onClick={clickHandlerGetStructure}>Get Structure</button>
  </div>
);
