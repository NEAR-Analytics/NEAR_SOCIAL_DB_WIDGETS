const externalAppUrl = "https://b54103fcb629.ngrok.app";

/**
 * Initial Path (optional but recommended)
 */
const path = props.path;
/**
 * Initial view height (optional but recommended)
 */
const initialViewHeight = 500;
const initialPayload = {};

const requestHandler = (request, response, Utils) => {
  switch (request.type) {
    case "add-card":
      handleAddCard(request, response);
      break;
    case "delete-card":
      handleDeleteCard(request, response);
      break;
    case "get-cards":
      handleGetCards(request, response, Utils);
      break;
  }
};

const handleAddCard = (request, response) => {
  const { payload } = request;
  if (payload) {
    console.log(payload);
  } else {
    response(request).send({ error: "payload not provided" });
  }
};

const handleDeleteCard = (request, response) => {
  const { payload } = request;
  if (payload) {
    console.log(payload);
  } else {
    response(request).send({ error: "payload not provided" });
  }
};

const handleGetCards = (request, response, Utils) => {
  // We can put a data cache here
  Utils.promisify(() => {
    const addressForArticles = "ndcGigArticle";
    const authorsWhitelist = props.writersWhiteList ?? [
      "neardigitalcollective.near",
      "blaze.near",
      "jlw.near",
      "kazanderdad.near",
      "joep.near",
      "sarahkornfeld.near",
      "yuensid.near",
    ];
    const articleBlackList = [91092435, 91092174, 91051228, 91092223, 91051203];
    const authorForWidget = "neardigitalcollective.near";
    // ========== GET INDEX ARRAY FOR ARTICLES ==========
    const postsIndex = Social.index(addressForArticles, "main", {
      order: "desc",
    });
    // ========== GET ALL ARTICLES ==========
    const resultArticles =
      postsIndex &&
      postsIndex
        .reduce((acc, { accountId, blockHeight }) => {
          const postData = Social.get(
            `${accountId}/${addressForArticles}/main`,
            blockHeight
          );
          const postDataWithBlockHeight = {
            ...JSON.parse(postData),
            blockHeight,
          };
          return [...acc, postDataWithBlockHeight];
        }, [])
        .filter((article) =>
          authorsWhitelist.some((addr) => addr === article.author)
        )
        .filter((article) => !articleBlackList.includes(article.blockHeight));

    // ========== FILTER DUPLICATES ==========
    const filteredArticles =
      resultArticles.length &&
      resultArticles.reduce((acc, article) => {
        if (!acc.some(({ articleId }) => articleId === article.articleId)) {
          return [...acc, article];
        } else {
          return acc;
        }
      }, []);

    const getDateLastEdit = (timestamp) => {
      const date = new Date(Number(timestamp));
      const dateString = {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      };
      return dateString;
    };

    const convertData = (inputData) => {
      const outputData = { cards: [] };
      inputData.forEach((item) => {
        const card = {
          id: item.articleId,
          title: item.articleId,
          laneId: "proposed",
          author: item.author,
          blockHeight: item.blockHeight,
          body: item.body,
          lastEditor: item.lastEditor,
          timeCreate: item.timeCreate,
          timeLastEdit: item.timeLastEdit,
          version: item.version,
        };
        outputData.cards.push(card);
      });
      return outputData;
    };

    const data = convertData(filteredArticles);

    response(request).send({ data: data.cards });
  });
};

return (
  <Widget
    src={"wendersonpires.near/widget/NearSocialBridgeCore"}
    props={{
      externalAppUrl,
      path,
      initialViewHeight,
      initialPayload,
      requestHandler,
    }}
  />
);
