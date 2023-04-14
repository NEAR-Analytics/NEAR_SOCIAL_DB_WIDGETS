/**
 * This Widget is part of the NEAR Social Bridge library.
 * Visit https://github.com/wpdas/near-social-bridge to get to know more.
 */

// Crucial checks
if (!props.externalAppUrl) {
  return (
    <div>
      <p
        style={{ fontWeight: 600, color: "#AB2E28", fontFamily: "Courier new" }}
      >
        This Widget is part of the{" "}
        <a href="https://github.com/wpdas/near-social-bridge">
          "near-social-bridge"
        </a>{" "}
        library that makes it possible to develop common ReactJS applications
        and inject them into the Widget having access to all Discovery API
        resources.
      </p>
      <p
        style={{ fontWeight: 600, color: "#AB2E28", fontFamily: "Courier new" }}
      >
        Learn more here:{" "}
        <a href="https://github.com/wpdas/near-social-bridge">
          https://github.com/wpdas/near-social-bridge
        </a>
      </p>
    </div>
  );
}

/**
 * Load React, React Dom and the Core Bridge library
 *
 * It's recommended to use VSCode to edit this code.
 * Save this code in the core.js file as well.
 */
const code = `
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script
  type="text/javascript"
  src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"
></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reseter.css/1.0.8/reseter.min.css">
<div id="bridge-root"></div>

<script>
// Viewer port
let viewerPort

// Outside of the component state controller
let state = {
  externalAppUrl: '',
  initialPath: null,
  userInfo: null,
  initialPayload: {},
  connectMessageSent: false,
}

// Core Component
function NearSocialBridgeCore() {
  const [externalAppUrl, setExternalAppUrl] = React.useState(state.externalAppUrl)
  const [connectMessageSent, setConnectMessageSent] = React.useState(state.connectMessageSent)
  const [, setUserInfo] = React.useState(state.userInfo)

  React.useEffect(() => {
    const handler = (e) => {
      // Set the Viewer port
      if (!viewerPort && e.data.type === 'connect-view') {
        viewerPort = e.source
        setExternalAppUrl(e.data.externalAppUrl)
        setUserInfo(e.data.userInfo)
        state.externalAppUrl = e.data.externalAppUrl
        state.initialPath = e.data.initialPath
        state.userInfo = e.data.userInfo
        state.initialPayload = e.data.initialPayload
      }

      // When get a message from the View
      if (viewerPort && e.data.from === 'view') {
        // Is it message to the core?
        if (e.data.type.includes('core:')) {
          // process eventual message to core here
          return
        }

        // Send to external app
        sendMessage(e.data)
      }
    }

    window.addEventListener('message', handler)

    return () => {
      window.removeEventListener('message', handler)
    }
  }, [])

  const sendMessage = (message) => {
    var iframe = document.getElementById('coreIframe')
    iframe.contentWindow.postMessage(message, '*')
  }

  const sendMessageToView = (message) => {
    viewerPort.postMessage(message, '*')
  }

  // Answer Factory
  const buildAnswer = (requestType, payload) => {
    return {
      from: 'core',
      type: 'answer',
      requestType,
      payload,
    }
  }

  // Build connection payload
  const buildConnectionPayload = () => ({
    type: 'connect',
    payload: {
      userInfo: state.userInfo,
      initialPath: state.initialPath,
      initialPayload: state.initialPayload,
    },
    created_at: Date.now(),
  })

  const onMessageHandler = (message) => {
    // Internal Request Handler
    if (message.data.from === 'external-app') {
      // Send to View
      sendMessageToView(message.data)
    }
  }

  function onLoadHandler() {
    // On load iframe
    if (!connectMessageSent) {
      setConnectMessageSent(true)
      state.connectMessageSent = true

      // On get msg from External App
      window.addEventListener('message', onMessageHandler, false)
    }

    // Send the welcome message (connects with the external app)
    const welcomePayload = buildConnectionPayload()
    sendMessage(welcomePayload)

    // Wait a bit and send the message again to ensure the app and scripts are loaded and ready
    setTimeout(() => {
      sendMessage(buildConnectionPayload())
    }, 2000)
  }

  // Wait for the external app url to render the iframe
  if (!state.externalAppUrl) return null

  return React.createElement('iframe', {
    sandbox: 'allow-scripts allow-popups-to-escape-sandbox allow-popups',
    id: 'coreIframe',
    src: externalAppUrl,
    style: { border: 'none', width: '100%', margin: 0, padding: 0 },
    onLoad: onLoadHandler,
  })
}

const domContainer = document.querySelector('#bridge-root')
const root = ReactDOM.createRoot(domContainer)
root.render(React.createElement(NearSocialBridgeCore, {}))

// iFrameResizer - auto resize the iframe to fit the child size
iFrameResize({ log: true }, '#coreIframe')

</script>
`;

// (i) Discovery API uses cached data structure
const Utils = {
  /**
   * Send message
   */
  sendMessage: (message) => {
    State.update({
      currentMessage: message,
    });
  },
  /**
   * Call resolve or reject for a given caller
   * E.g:
   * var timeout = 5000 // 5sec
   * Utils.promisify(() => getCachedObject(), (res) => console.log(res), (err) => console.log(err), timeout)
   *
   * Default timeout is 10 seconds
   */
  promisify: (caller, resolve, reject, _timeout) => {
    const timer = 1000;
    const timeout = _timeout || timer * 10;
    let timeoutCheck = 0;

    const find = () => {
      const response = caller();
      if (response) {
        resolve(response);
      } else {
        if (timeoutCheck < timeout) {
          // try again
          setTimeout(find, 1000);
          timeoutCheck += timer;
        } else {
          reject(null);
        }
      }
    };

    // Fist attempt
    find();
  },
};

// External App Url
const externalAppUrl = props.externalAppUrl;

// User Info
const accountId = context.accountId;
const userInfo = { accountId };

// Initial Path
const initialPath = props.path;

// Initial Payload (optional)
const initialPayload = props.initialPayload || {};

// Initial State
State.init({
  // (i) DON'T send async data, it's going to randonly fail
  // If you need to get new info, use "request" for that
  currentMessage: {
    type: "connect-view",
    externalAppUrl,
    userInfo,
    initialPath,
    initialPayload,
  },
});

// Answer Factory
const buildAnswer = (requestType, payload) => {
  return {
    from: "view",
    type: "answer",
    requestType,
    payload,
    created_at: Date.now(),
  };
};

/**
 * Widget response factory - closure
 *
 * E.g:
 * const response = responseFactory.build()
 * response({type: 'request-type'}).send({myPayloadHere: 123})
 */
const responseFactory = {
  build: () => {
    return (request) => {
      return {
        send: (payload) => {
          const responseBody = buildAnswer(request.type, payload);
          Utils.sendMessage(responseBody);
        },
      };
    };
  },
};

const onMessageHandler = (message) => {
  // Handles core calls
  if (message.type.includes("nsb:")) {
    handlerCoreRequests(message);
    return;
  }

  // Handles Widget request calls:
  // - request: payload sent by External App
  // - response: method to send the answer back to the External App
  // - utils: Utils features like: promisify, ...
  const request = {
    type: message.type,
    payload: message.payload,
  };
  const utils = {
    promisify: Utils.promisify,
  };

  if (props.requestHandler) {
    props.requestHandler(request, responseFactory.build(), utils);
  }
};

// REQUEST HANDLERS BELOW
const handlerCoreRequests = (message) => {
  switch (message.type) {
    case "nsb:session-storage:hydrate-viewer":
      sessionStorageHydrateViewer(message.type, message.payload);
      break;
    case "nsb:session-storage:hydrate-app":
      sessionStorageHydrateApp(message.type, message.payload);
      break;
    case "nsb:navigation:sync-content-height":
      setIframeHeight(message.type, message.payload);
      break;
    case "nsb:auth:get-user-info":
      getUserInfo(message.type, message.payload);
      break;
  }
};

const CORE_STORAGE_KEY = "app:storage";
// Store data
const sessionStorageHydrateViewer = (requestType, payload) => {
  if (payload) {
    // store data
    Storage.privateSet(CORE_STORAGE_KEY, payload);

    const responseBody = buildAnswer(requestType, payload);
    Utils.sendMessage(responseBody);
  }
};

// Retrieve stored data
const sessionStorageHydrateApp = (requestType) => {
  Utils.promisify(
    // get stored data
    () => Storage.privateGet(CORE_STORAGE_KEY),
    (storageData) => {
      const responseBody = buildAnswer(requestType, storageData);
      Utils.sendMessage(responseBody);
    },
    () => {
      // After 3 seconds, if no data is found, just send
      // an empty answer
      const responseBody = buildAnswer(requestType);
      Utils.sendMessage(responseBody);
    },
    3000
  );
};

// Set thew new iFrame height based on the new screen/route
const setIframeHeight = (requestType, payload) => {
  State.update({ iframeHeight: payload.height + 20 });
  const responseBody = buildAnswer(requestType, {});
  Utils.sendMessage(responseBody);
};

// Get user info
const getUserInfo = (requestType) => {
  // check if user is signed in
  if (!accountId) {
    const responseBody = buildAnswer(requestType, {
      error: "user is not signed in",
    });
    Utils.sendMessage(responseBody);
    return;
  }

  Utils.promisify(
    () => Social.getr(`${accountId}/profile`), // profile info
    (res) => {
      const responseBody = buildAnswer(requestType, {
        accountId,
        profileInfo: res,
      });
      Utils.sendMessage(responseBody);
    },
    (err) => {
      console.log("error fetching profile data", err);
    }
  );
};

return (
  <div>
    <iframe
      iframeResizer
      className="w-100"
      srcDoc={code}
      message={state.currentMessage}
      onMessage={onMessageHandler}
    />
  </div>
);
