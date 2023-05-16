const dataa = Social.get("frichard5.near/widget/**");
console.log("data", dataa);
const comment = () => {
  const index = {
    action: "post",
    key: "main",
    options: {
      limit: 10,
      order: "desc",
      accountId: "frichard5.near",
    },
  };
  const initialItems = Social.index(index.action, index.key, index.options);
  console.log("initialItems", initialItems);
  //const setPost = Social.set();
  const data = {
    post: {
      main: JSON.stringify({ type: "md", text: "test wrong zkey" }),
    },
    index: {
      post: JSON.stringify({
        key: "main",
        value: {
          type: "midd",
        },
      }),
    },
  };
  //Social.set(data, { force: true });
  //Social.set({ ndcTest: "hello" });
  /*const item = {
    type: "social",
    path: `satoshidev.near/post/main`,
    blockheight: 91360190,
  };
  const uh = Social.index("like", item);
  console.log("azdaz", uh);*/
};

return (
  <div>
    <button onClick={comment}>Comment</button>
  </div>
);
