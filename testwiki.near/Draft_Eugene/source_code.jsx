// =========  =========
const accountId = props.accountId ?? context.accountId;

// ========= COMPARE GET METHODS =========
// const path = "/widget/Draft_Eugene";
const path = "/widget/*";
// const path = "/*";
const data1 = Social.get(`${accountId}${path}`);
const data2 = Social.getr(`${accountId}${path}`);
const data3 = Social.keys(
  `${accountId}${path}`
  // ,
  //  "final", {
  //   return_type: "BlockHeight",
  //   values_only: true,
  // }
);

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
const clickHandlerGetMethods = () => {
  console.log("get is ", data1);
  //   console.log("getr is ", data2);
  //   console.log("keys is ", data3);
};
const clickHandlerObjectStructure = () => {
  console.log(dataStructure);
};

// ========= RETURN =========
return (
  <div>
    <p>Press button and check log in browser</p>
    <button onClick={clickHandlerGetMethods}>Compare Get Methods</button>
    <button onClick={clickHandlerObjectStructure}>Try Object Structure</button>
  </div>
);
