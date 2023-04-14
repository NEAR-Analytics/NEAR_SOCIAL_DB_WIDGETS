const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loadig";
}

const test = Social.keys("*/wikiTest/articles", "final");
console.log("test ", test);

const test4 = Near.view("social.near", "get", {
  keys: ["vanjule.near/**", "vanyog.near/**"],
});
console.log("test4", test4);

const testArray = test && Object.keys(test);
const resultArticles = [];

// TODO make better checks for  data
!resultArticles.length &&
  testArray &&
  testArray.forEach((item, index, arr) => {
    console.log("item", item);
    const data = Near.view("social.near", "get", {
      keys: [`${item}/wikiTest/articles/**`],
    });
    console.log("data", data[item].wikiTest.articles);
    const articles = data && Object.keys(data[item].wikiTest.articles);
    const array =
      data &&
      articles.map((key) => {
        return data[item].wikiTest.articles[key];
      });
    data && resultArticles.push(...array);
  });
resultArticles.length &&
  resultArticles.sort((a, b) => {
    return Number(b.timeLastEdit) - Number(a.timeLastEdit);
  });

const filteredArticles = [];
resultArticles.length &&
  resultArticles.forEach((article, index) => {
    if (
      !filteredArticles.some(({ articleId }) => articleId === article.articleId)
    ) {
      filteredArticles.push(article);
    }
  });

console.log("resultArticles  ", resultArticles);
console.log("filteredArticles", filteredArticles);

const initialBody = `# Markdown heading level 1

This is a markdown paragraph. So, here are a few examples of markdown syntax and what it looks like.

1. markdown
2. ordered
3. list`;

const errTextNoBody = "ERROR: no article Body",
  errTextNoId = "ERROR: no article Id",
  errTextDublicatedId = "ERROR: there is article with such name";

const initialCreateArticleState = {
  articleId: "",
  articleBody: initialBody,
  errorId: "",
  errorBody: "",
};

State.init({
  currentTab: "loadarticles",
  createArticle: initialCreateArticleState,
});

const getArticleData = () => {
  const args = {
    articleId: state.createArticle.articleId,
    author: accountId,
    lastEditor: accountId,
    timeLastEdit: Date.now(),
    timeCreate: Date.now(),
    body: state.createArticle.articleBody,
    version: 0,
    navigation_id: null,
  };
  return args;
};

// === SAVE HANDLER ===
const saveHandler = (e) => {
  State.update({
    ...state,
    createArticle: { ...state.createArticle, errorId: "", errorBody: "" },
  });
  if (state.createArticle.articleId && state.createArticle.articleBody) {
    // TODO check it automaticle
    const isArticleIdDublicated = false;

    if (!isArticleIdDublicated) {
      console.log("SAVE ARTICLE");
      const newArticle = getArticleData();

      Social.set({
        wikiTest: { articles: { [newArticle.articleId]: { ...newArticle } } },
      });
    } else {
      State.update({
        ...state,
        createArticle: { ...state.createArticle, errorId: errTextDublicatedId },
      });
    }
  } else {
    if (!state.createArticle.articleId) {
      State.update({
        ...state,
        createArticle: { ...state.createArticle, errorId: errTextNoId },
      });
    }
    if (!state.createArticle.articleBody) {
      State.update({
        ...state,
        createArticle: { ...state.createArticle, errorBody: errTextNoBody },
      });
    }
  }
};

// === CANCEL HANDLER ===
const cancelHandler = () => {
  State.update({
    ...state,
    createArticle: {
      articleId: "",
      articleBody: "",
      errorId: null,
      errorBody: null,
    },
  });
};

const description = profile.description;

const pills = [
  { id: "articles", title: "Articles" },
  { id: "authors", title: "Authors" },
  { id: "create", title: "Create Article" },
];

const handleArticle = (e, article) => {
  State.update({ ...state, article: article, authorId: undefined });
};

const handleAuthor = (e, authorId) => {
  console.log("click author");
  State.update({ ...state, article: undefined, authorId });
};

const getDate = (timestamp) => {
  console.log("timestamp", timestamp);
  const date = new Date(Number(timestamp));
  return date.toDateString();
};

const saveArticle = (args) => {
  console.log("SAVE ARTICLE", state);
  const newArticleData = {
    ...state.article,
    body: state.note,
    lastEditor: accountId,
    timeLastEdit: Date.now(),
    version: Number(state.article.version) + 1,
  };
  console.log("newArticleData", newArticleData);

  Social.set({
    wikiTest: {
      articles: { [state.article.articleId]: { ...newArticleData } },
    },
  });
};

const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = `${date.toLocaleDateString()} / ${date.toLocaleTimeString()}`;
  return dateString;
};

const getAuthors = () => {
  const authors = Array.from(resultArticles, ({ author }) => author);
  const uniqAuthors = Array.from(new Set(authors));

  console.log("authors", authors);
  console.log("uniqAuthors", uniqAuthors);

  return (
    <>
      <h6>Total authors: {uniqAuthors.length}</h6>
      <ul>
        {uniqAuthors.map((author) => (
          <li>
            <a
              href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${author}`}
            >
              {author}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
return <></>;
