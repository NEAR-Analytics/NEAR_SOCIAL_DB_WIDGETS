if (context.accountId == null) {
  return <h1 class="text-danger">You have to sign in to play Laser Chess</h1>;
}

const pages = {
  menu: "MENU",
  aiGame: "AI_GAME",
  usersMatcher: "USERS_MATCHER",
  initializingData: "INITIALIZING_DATA",
  loadingGame: "LOADING_GAME",
  game: "GAME",
};

const indexedPages = () => {
  const pagesValues = Object.values(pages);
  const toReturn = {};
  for (let i = 0; i < pagesValues.length; i++) {
    toReturn[pagesValues[i]] = i;
  }
  return toReturn;
};

const comparePages = (firstPage, secondPage) => {
  // return if first page goes earlier than second page
  return indexedPages()[firstPage] > indexedPages()[secondPage];
};

const boardSetups = {
  ace: "l++3d++kd++b+++2/2b7/3B+6/b++1B1ss+1b+++1B+/b+++1B+1S+S1b++1B/6b+++3/7B++2/2B+DKD3L",
  curiosity:
    "l++3d++kd++s+++2/19/3B+2b++3/b++B2B+++s+2b+++B+/b+++B+2S+b+2b++B/3B2b+++3/19/2S+DKD3L",
  grail:
    "l++3bd++b+++3/5k4/b++3bd++s+3/b+++1s1B+1B+++3/3b+1b+++1S1B+/3S+DB++3B/4K5/3B+DB++3L",
  mercury:
    "l+3bkb+++2S+/5d++b+++3/b+++2s+1d++4/b++3B+3B1/1b++3b+++3B/4D1S+2B+/3B+D5/s+2B+KB++3L+++",
  sophie:
    "l++3kB+b+++3/3d++1d+3B/b++3bb+++1S+1B+/7s2/2S7/b+++1s+1B+B++3B/b++3D+++1D3/3B+b+++K3L",
  random: "null",
};

const gameTypes = {
  ai: "ai",
  online: "online",
};

const widgetKey = "laserchess3d";
const widgetName = "Laser chess";

State.init({
  // currentPage: pages.usersMatcher,
  currentPage: pages.menu,
  gameType: null,

  dataInitializingCalled: false,

  roomData: null,
  roomId: props.roomId || null,
  gameCreated: null,
  sn: boardSetups.random,
});

if (state.roomId && comparePages(pages.initializingData, state.currentPage)) {
  State.update({ currentPage: pages.initializingData });
}

const iframeHtml = `
<!doctype html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <title>Laser chess</title>
      <link rel="stylesheet" href="https://near-social-laser-chess.github.io/laser-chess-3d/css/style.css">
      <script defer="defer" src="https://near-social-laser-chess.github.io/laser-chess-3d/bundle.js"></script>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
   </head>
   <body>
      <div class="rotate-buttons">
         <div class="rotate-header">Rotate</div>
         <div class="buttons">
            <button class="rotate-button" type="button" aria-label="rotate piece left" disabled="disabled">
               <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"></path>
               </svg>
            </button>
            <button class="rotate-button" type="button" aria-label="rotate piece right" disabled="disabled">
               <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"></path>
               </svg>
            </button>
         </div>
      </div>
      <div class="winner-message" aria-label="winner message">
        <div class="winner-message__content">
            <div id="winner-message__header"></div>
            <div id="winner-message__info"></div>
                <div class="container">
                  <div class="row winner-message-buttons" style="width: 100%;">
                    <div class="col-md-6">
                      <button type="button" class="btn btn-primary"><a href="https://wallet.near.org/send-money/hockeyclubmanager.near" style="color: #fff;">Support developers</a></button>
                    </div>
                    <div class="col-md-6">
                      <button type="button" class="btn btn-warning"><a href="https://unchain.fund/#donate">Support Ukraine</a></button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12" style="padding-top: 50px;">
                      <button type="button" id="go-home-button"><a href="https://near.social/#/let45fc.near/widget/LaserChess3D" style="color: #fff; text-decoration: none;">Go to main menu</a></button>
                    </div>
                  </div>
                </div>
        </div>
    </div>
      <script>window.addEventListener('load', (e) => EntryPoint.initGame({
         type: ${`"${state.gameType ? state.gameType : gameTypes.ai}"`},
         userColor: "blue",
         opponentColor: "red",
         
         sn: ${
           state.sn != boardSetups.random ? `"${state.sn}"` : boardSetups.random
         },
         }))
      </script>
   </body>
</html>
`;

const exit = () => {
  console.log("EXIT");
  State.update({
    currentPage: pages.menu,
    roomId: null,
    roomData: null,
  });
};

const menuCallback = (isPve, sn) => {
  State.update({
    currentPage: isPve ? pages.aiGame : pages.usersMatcher,
    gameType: isPve ? gameTypes.ai : gameTypes.online,
    sn:
      sn.toLowerCase() == "random"
        ? Object.values(boardSetups).slice(0, -1)[
            Math.floor(Math.random() * Object.values(boardSetups).length)
          ]
        : boardSetups[sn.toLowerCase()],
  });
};

if (state.currentPage == pages.menu) {
  return (
    <Widget
      src="let45fc.near/widget/MainMenu"
      props={{
        callback: menuCallback,
        connectToGameCallback: () =>
          State.update({
            currentPage: pages.usersMatcher,
            gameType: gameTypes.online,
          }),
      }}
    />
  );
}

if (state.currentPage == pages.aiGame) {
  return (
    <>
      <h1>Playing against AI</h1>
      <button class="btn btn-danger" onClick={exit}>
        Exit
      </button>
      <iframe
        srcDoc={iframeHtml}
        class="w-100 h-100"
        style={{ width: "100%", height: "700px" }}
      />
    </>
  );
}

const usersMatcherCallback = (roomData, roomId, created) => {
  State.update({
    roomData,
    roomId,
    gameCreated: created,
    currentPage: pages.initializingData,
  });
};

if (state.currentPage == pages.usersMatcher) {
  return (
    <Widget
      src="let45fc.near/widget/UsersMatcher"
      props={{
        widgetKey: "laserchess3d",
        widgetName: "Laser chess",
        loadRoomCallback: usersMatcherCallback,
        urlPrefix:
          "https://near.social/#/let45fc.near/widget/LaserChess3D?roomId=",
        initialValue: {
          sn: state.sn,
        },
      }}
    />
  );
}

if (state.currentPage == pages.initializingData) {
  // TODO: check if there are already two players in game
  const keysQuery = `*/${widgetKey}/${state.roomId}/`;
  let keysResult = Social.keys(keysQuery, "final", {
    subscribe: true,
  });
  if (keysResult === null) {
    return <h1>Getting game data</h1>;
  }
  const accountsInGame = Object.keys(keysResult);

  if (accountsInGame.length == 0) {
    exit();
  }
  if (
    accountsInGame.length == 2 &&
    !accountsInGame.find((el) => el == context.accountId)
  ) {
    return <h1>Already two users in game</h1>;
  }

  const ownerAccountId = state.roomId.split("---")[0];
  const queryString = `${ownerAccountId}/${widgetKey}/${state.roomId}`;
  let roomData = state.roomData || Social.getr(queryString);
  console.log(queryString, roomData);
  if (!roomData) {
    return <h1>Getting room data</h1>;
  }
  State.update({ roomData, gameCreated: false, sn: roomData.sn });

  if (
    accountsInGame.length == 1 &&
    !accountsInGame.find((el) => el == context.accountId)
  ) {
    // Initialize data if not initialized already
    if (!state.dataInitializingCalled) {
      console.log("before");
      Social.set({
        [widgetKey]: {
          [state.roomId]: { ...roomData },
        },
      });
      console.log("after");
      State.update({ dataInitializingCalled: true });
    }
    return <h1>Initializing your game</h1>;
  }
  console.log(state.currentPage);
  State.update({ currentPage: pages.loadingGame });

  return <h1>Initializing your game</h1>;
}

if (state.currentPage == pages.loadingGame) {
  let keysResult = Social.keys(`*/laserchess3d/${state.roomId}/`, "final", {
    subscribe: true,
  });
  if (keysResult === null) {
    return <h1>Getting game data</h1>;
  }

  if (Object.keys(keysResult).length == 0) {
    exit();
  }

  if (Object.keys(keysResult).length == 1) {
    return (
      <>
        <h1>Waiting for your opponent</h1>
        <h2>Your room link:</h2>
        <pre
          style={{ color: "red" }}
        >{`https://near.social/#/let45fc.near/widget/LaserChess3D?roomId=${state.roomId}`}</pre>
      </>
    );
  }
  if (Object.keys(keysResult).length == 2) {
    State.update({ currentPage: pages.game });
    return <h1>{"Loading your game..."}</h1>;
  }

  return <h1>{"Something went wrong. (We really don't know what exactly)"}</h1>;
}
console.log(state.sn);
if (state.currentPage == pages.game) {
  return (
    <Widget
      src="let45fc.near/widget/LaserChess3DOnline"
      props={{
        exitCallback: exit,
        roomId: state.roomId,
        roomData: state.roomData,
        sn: state.sn,
      }}
    />
  );
}
