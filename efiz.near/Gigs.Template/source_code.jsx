const isDev = props.isDev ?? false;
const gigsBoardUrl = isDev
  ? "https://b54103fcb629.ngrok.app" // place your own ngrok url here
  : "https://gigs-board.vercel.app"; // or your fork of gigs-board

const daoId = "liberty.sputnik-dao.near"; // owner of the gigs board

function onCardAdd(payload) {
  console.log(JSON.stringify(payload));
  // Generate UUID (can just be plain text for now, may need to integrate uuid.generate() into VM)
  const uuid = 12345;

  // Function call proposal to the DAO with payload
  Social.set(
    {
      thing: {
        [uuid]: JSON.stringify({
          // save thing at uuid
          payload,
        }),
      },
      index: {
        [daoId]: JSON.stringify({
          // index key at daomain
          key: uuid,
          value: {
            type: "every.near/type/problem", // What type should this be? Depends on the Kanban board...
          },
        }),
      },
    },
    {
      force: true,
    }
  );
}

function onCardDelete(payload) {
  console.log(JSON.stringify(payload));
}

function onCardMoveAcrossLanes(payload) {
  console.log(JSON.stringify(payload));
  // function call proposal t
  return { preventDefault: true };
}

function loadCards() {
  // this should just get the ids from the DAO
  // Then Social.index(daoId, {key}) on each key to get each "gig" and it's history
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

  // Then convert into cards
  const convertData = (inputData) => {
    const cards = [];
    inputData.forEach((item, index) => {
      const card = {
        id: item.articleId,
        title: item.articleId,
        laneId: index % 2 === 0 ? "proposed" : "in-progress",
        author: item.author,
        blockHeight: item.blockHeight,
        body: item.body,
        lastEditor: item.lastEditor,
        timeCreate: item.timeCreate,
        timeLastEdit: item.timeLastEdit,
        version: item.version,
      };
      cards.push(card);
    });
    return cards;
  };

  const data = convertData(filteredArticles);
  return data;
}

return (
  <Widget
    src={"efiz.near/widget/Gigs.Board"}
    props={{
      gigsBoardUrl,
      onCardAdd,
      onCardDelete,
      onCardMoveAcrossLanes,
      loadCards,
    }}
  />
);
