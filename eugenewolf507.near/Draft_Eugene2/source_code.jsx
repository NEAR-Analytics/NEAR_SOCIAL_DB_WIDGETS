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
  articlesNav: ["articleA", "articleB", "article1", "article2"],
};

// ========= HANDLERS =========
const clickHandlerSetStructure = () => {
  Social.set(JSON.stringify(dataStructure));
};
const clickHandlerGetStructure = () => {
  // path that works
  // const path = "/*";
  const path = "/widget/*";
  // const path = "/widget/Draft_Eugene2";

  // path that doesn't works
  // const path = "/articles/articlesAll";

  const data1 = Social.get(`${accountId}${path}`);
  // console.log(data1);

  const data2 = Social.keys("*/widget/*", "final");
  console.log(data2);
};

// ========= RETURN =========
return (
  <div>
    <p>Press button and check log in browser</p>
    <div>
      <button onClick={clickHandlerSetStructure}>Set Structure</button>
      <CommitButton
        data={{
          articles: {
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
            articlesNav: [
              "articleA",
              "articleB",
              "articleC",
              "article1",
              "article2",
            ],
          },
        }}
        // data={{
        //   articles: { "eugenewolf507.near": { homepage: state.homepage } },
        // }}
      >
        SetStructure with CommitButton
      </CommitButton>
    </div>
    <button onClick={clickHandlerGetStructure}>Get Structure</button>
  </div>
);
