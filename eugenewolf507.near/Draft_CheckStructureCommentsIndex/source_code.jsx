const accountId = props.accountId ?? context.accountId;
// ========= HANDLER SET =========
const getPublicationParamsAllArticles = () => ({
  index: {
    wiki_test: JSON.stringify({
      key: "wikitest-v0.0.0",
      value: {
        articleId: "articleA",
        body: "body A (index)",
      },
    }),
  },
});
// ========= HANDLER GET =========
const clickHandlerGetStructure = () => {
  const accountId = "mob.near";

  console.log(" ========== GET ONE POST ========== ");
  const post = Social.get(`${accountId}/post/main`, 84722911);
  //84445357 - blockHeight put into post inside social get
  console.log("postGet", post);
  //   const postData = Social.get(`${accountId}/post/**`, "final");
  //   console.log("postData", postData);
  //   console.log(" ========== GET INDEX ARRAY FOR POSTS ========== ");
  const postsIndex = Social.index("post", "main", {
    limit: 10,
    order: "desc",
    accountId,
  });
  console.log(postsIndex);
  //   console.log(" ========== GET 10 POSTS ========== ");
  //   postsIndex.forEach(({ accountId, blockHeight }) => {
  //     const postData = Social.get(`${accountId}/post/main`, blockHeight);
  //     console.log(postData);
  //   });

  console.log(" ========== GET SOME COMMENTS ========== ");
  const item = {
    type: "social",
    path: `${accountId}/post/main`,
    blockHeight: 84722911,
  };
  const index = {
    action: "comment",
    key: item,
    options: {
      limit: 3,
      order: "desc",
      accountId: "bosco.near",
      subscribe: false,
    },
  };
  const indexComments = Social.index(index.action, index.key, index.options);
  console.log("indexComments", indexComments);
  const comment1 = Social.get(`bosco.near/post/comment`, "final");
  console.log(comment1);

  const comment2 = Social.get(`bosco.near/post/comment`, 84723425);
  console.log(comment2);
  const comment3 = Social.get(`bosco.near/post/comment`, 84723113);
  console.log(comment3);
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
