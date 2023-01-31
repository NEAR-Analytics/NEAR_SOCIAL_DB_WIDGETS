const accountId = props.accountId ?? context.accountId;
// ========= STRUCTURE =========
const dataStructure = {
  articleA: {
    author: "EV",
    body: "body A (index)",
  },
  articleB: {
    author: "EV",
    body: "body B (index)",
  },
};

// ========= HANDLER SET =========
const getPublicationParamsAllArticles = () => {
  // return { articlesPersonal2: dataStructure };
  return {
    index: {
      wiki_test: {
        key: "wikitest-v0.0.0",
        value: {
          articleId: "articleA",
          author: "EV",
          body: "body A (index)",
        },
      },
    },
  };
};

// ========= HANDLER GET =========
const clickHandlerGetStructure = () => {
  // const path = "/articlesPersonal2/**";
  // const data1 = Social.get(`${accountId}${path}`);
  // console.log(data1);

  // const answers = Social.index("poll_question", "answer-v3.1.0");
  // console.log(answers);

  const questions = Social.index("poll_question", "question-v3.1.0");
  console.log(questions);
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
