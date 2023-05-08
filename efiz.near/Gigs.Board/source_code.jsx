/**
 * Serves a simple react app with react-trello, hooked up via near-social-bridge.
 * Repository: https://github.com/near-everything/gigs-board
 *
 * Props:
 *      lanes: template for react-trello lanes, fully customizable, see https://github.com/rcdexta/react-trello/tree/master#usage
 *      onCardAdd: optional custom function called when a card is added
 *      onCardDelete: optional custom function called when a card is deleted
 *      loadCardData: optional custom function called to load card data
 *
 * Note: Customize how lanes look via lanes prop, customize how cards look via a repository fork
 */

const isDev = true;
const externalAppUrl = isDev
  ? "https://b54103fcb629.ngrok.app" // place your own ngrok url here
  : "https://gigs-board.vercel.app"; // or your fork of gigs-board

// Define your template here:
const lanes = props.lanes || {
  lanes: [
    {
      currentPage: 1,
      id: "proposed",
      style: {
        border: 0,
        backgroundColor: "initial",
      },
      title: "Proposed",
      cards: [],
    },
    {
      currentPage: 1,
      id: "in-progress",
      style: {
        border: 0,
        backgroundColor: "initial",
      },
      title: "In Progress",
      disallowAddingCard: true,
      cards: [],
    },
    {
      currentPage: 1,
      id: "completed",
      style: {
        border: 0,
        backgroundColor: "initial",
      },
      title: "Completed",
      disallowAddingCard: true,
      cards: [],
    },
  ],
};

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

/**
 * Called when a new card is added: onCardAdd(card, laneId)
 * https://github.com/rcdexta/react-trello/tree/master#callbacks-and-handlers
 *
 * Pass a custom function via props.onCardAdd
 */
const handleAddCard = (request, response, Utils) => {
  const { payload } = request;
  if (payload) {
    if (props.onCardAdd) {
      props.onCardAdd(payload);
    } else {
      // add to everything, unassigned
      console.log(payload);
    }
  } else {
    response(request).send({ error: "payload not provided" });
  }
};

/**
 * Called when a card is deleted: onCardDelete(cardId, laneId)
 * https://github.com/rcdexta/react-trello/tree/master#callbacks-and-handlers
 *
 * Pass a custom function via props.onCardDelete
 */
const handleDeleteCard = (request, response) => {
  const { payload } = request;
  if (payload) {
    if (props.onCardDelete) {
      // TODO: What should happen when a card is deleted?
      props.onCardDelete(request, response);
    } else {
      console.log(payload);
    }
  } else {
    response(request).send({ error: "payload not provided" });
  }
};

/**
 * Called on load to populate data.
 *
 * Pass a custom function via props.loadCardData
 */
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
      initialViewHeight: 600,
      initialPayload: lanes,
      requestHandler,
    }}
  />
);
