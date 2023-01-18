// =========  =========
const accountId = props.accountId ?? context.accountId;

// ========= TRY OBJECT STRUCTURE =========
const dataStructure = {
  articlesAll: {
    testwiki: {
      article1: {
        author: "testwiki",
        body: "body for article 1 by testwiki",
      },
      article2: {
        author: "testwiki",
        body: "body for article 2 by testwiki",
      },
    },
    eugenewolf507: {
      articleA: {
        author: "testwiki",
        body: "body for article A by eugenewolf507",
      },
      articleB: {
        author: "testwiki",
        body: "body for article B by eugenewolf507",
      },
    },
  },
  articlesNav: ["article1", "article2", "articleA", "articleB"],
};

// ========= HANDLERS =========
const clickHandlerLocalStructure = () => {
  console.log(dataStructure);
};
const clickHandlerGetStructure = () => {
  const articles1 = JSON.parse(Social.get(`${accountId}/articles`));
  console.log(articles1);
};
const clickHandlerGetAuthor = () => {
  const data2 = Social.get(`${accountId}/articles`);
  console.log(data2);
};
const clickHandlerSetStructure = () => {
  Social.set(JSON.stringify(dataStructure));
};

// ========= RETURN =========
return (
  <div>
    <p>Press button and check log in browser</p>
    <button onClick={clickHandlerLocalStructure}>Local Structure</button>
    <button onClick={clickHandlerGetStructure}>Get Structure</button>
    <button onClick={clickHandlerGetAuthor}>Get Author</button>
    <button onClick={clickHandlerSetStructure}>Set Structure</button>
    <CommitButton
      data={{ experimental: dataStructure }}
      // data={{
      //   articles: { "eugenewolf507.near": { homepage: state.homepage } },
      // }}
    >
      SetStructure with CommitButton
    </CommitButton>
  </div>
);
