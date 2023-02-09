/* eslint no-magic-numbers: 0 */

const VERSION = '0.3.0';

/**
 *  NEAR Social App
 *  Docs: https://github.com/NEARFoundation/events-platform
 *
 */

/**
 * Adjust these:
 * */

const NEAR_STORAGE_BYTES_SAFTY_OFFSET = 42;
const PROP_IS_REQUIRED_MESSAGE = 'props.{prop} is required';
const PLEASE_CONNECT_WALLET_MESSAGE =
  'Please connect your NEAR wallet to continue.';

const GRID_PAD_TINY = '4px';
const GRID_PAD_SMALL = '10px';
const GRID_PAD = '20px';
const GRID_PAD_BIG = '30px';

const FONT_SIZE_TINY = 'calc(max(12px, 0.75vw))';
const FONT_SIZE_SMALL = 'calc(max(16px, 1.25vw))';
const FONT_SIZE_DEFAULT = 'calc(max(20px, 1.66vw))';
const FONT_SIZE_GIANT = 'calc(max(32px, 2.5vw))';

const TAG_PADDING = 'calc(max(4px, 0.25vw)) calc(max(8px, 0.5vw))';

const DEFAULT_BORDER_RADIUS = '4px';

const TEXT_COLOR = '#333333';
const TEXT_COLOR_LIGHT = '#666666';

const BORDER_COLOR = '#e6e6e6';

const ERROR_COLOR = '#cc0000';

// dark purple
const BUTTON_BG_COLOR = '#4d2c91';
const BUTTON_BG_HOVER_COLOR = '#3c1f6f';
const BUTTON_COLOR = '#ffffff';
const BUTTON_PADDING = `${GRID_PAD_SMALL} ${GRID_PAD}`;
const BUTTON_BORDER_RADIUS = '8px';

/**
 * Animation
 * */
const FadeIn = styled.keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const SlideInLeft = styled.keyframes`
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

/**
 * Components
 * */

const Components = {
  Select: styled.select`
    background-color: ${BUTTON_BG_COLOR}
    border: none;
    color: white;
    padding: ${GRID_PAD} ${GRID_PAD_BIG};
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: ${FONT_SIZE_DEFAULT};
    margin: 4px 2px;
    cursor: pointer;
  `,

  Button: styled.button`
    background-color: ${BUTTON_BG_COLOR};
    border: none;
    color: ${BUTTON_COLOR};
    padding: ${BUTTON_PADDING};
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: ${FONT_SIZE_DEFAULT};
    transition: all 0.5s ease;
    cursor: pointer;
    border-radius: ${BUTTON_BORDER_RADIUS};

    &:hover {
      background-color: ${BUTTON_BG_HOVER_COLOR};
    }
  `,

  PageTitle: styled.h1`
    font-size: ${FONT_SIZE_GIANT};
    color: black;
  `,

  Container: styled.div`
    padding-left: ${GRID_PAD};
    padding-right: ${GRID_PAD};
    padding-top: ${GRID_PAD_SMALL};
    padding-bottom: ${GRID_PAD_SMALL};
  `,

  ContainerHeader: styled.div`
    font-size: ${FONT_SIZE_DEFAULT};
    color: ${TEXT_COLOR};
    padding: ${GRID_PAD_SMALL} 0;
    @media (max-width: 768px) {
      font-size: ${FONT_SIZE_SMALL};
    }
  `,

  Hr: styled.div`
    width: 100%;
    border-bottom: 1px solid ${BORDER_COLOR};
  `,

  InfoBar: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0px ${GRID_PAD};
    border-bottom: 1px solid ${BORDER_COLOR};
  `,

  InfoBarItem: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${GRID_PAD};
    padding: 8px 0;
  `,

  InfoBarLink: styled.a`
    font-size: ${FONT_SIZE_SMALL};
    color: ${TEXT_COLOR};
    text-decoration: none;
    margin-right: ${GRID_PAD};
    padding: ${GRID_PAD} 0;

    &:hover {
      text-decoration: underline;
    }

    &:last-child {
      margin-right: 0;
    }

    &:visited {
      color: ${TEXT_COLOR};
    }

    &:active {
      color: ${TEXT_COLOR};
    }
  `,

  TextHeader: styled.div`
    font-size: ${FONT_SIZE_DEFAULT};
    color: ${TEXT_COLOR};
  `,

  InlineTag: styled.div`
    display: inline-block;
    background-color: ${BORDER_COLOR};
    padding: ${TAG_PADDING};
    border-radius: ${DEFAULT_BORDER_RADIUS};
    margin-right: ${GRID_PAD};
    margin-left: ${GRID_PAD};
  `,

  Text: styled.div`
    font-size: ${FONT_SIZE_SMALL};
    color: ${TEXT_COLOR};
    margin-right: ${GRID_PAD};
  `,

  ValidationError: styled.div`
    color: ${ERROR_COLOR};
    font-size: ${FONT_SIZE_TINY};
    margin-top: ${GRID_PAD_SMALL};
  `,

  FullActionButton: styled.button`
    width: 100%;
    padding: ${BUTTON_PADDING};
    margin: 0;
    border: 1px solid ${BORDER_COLOR};
    border-radius: ${DEFAULT_BORDER_RADIUS};
    box-sizing: border-box;
    background-color: ${BUTTON_BG_COLOR};
  `,

  FormLabel: styled.label`
    width: 100%;
    color: ${TEXT_COLOR_LIGHT};
    padding: ${GRID_PAD_SMALL} 0;
    margin: 0;
    box-sizing: border-box;
  `,

  GridContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: flex-start;

    width: auto;
    margin-left: -${GRID_PAD};
    margin-right: -${GRID_PAD};

    & > * {
      margin: ${GRID_PAD};
      min-width: 320px;
      max-width: ${({ itemWidth }) => itemWidth || '540px'};
      width: 100%;
      flex-grow: 1;
      flex-shrink: 1;

      animation: ${FadeIn} 0.5s ease-in-out;
    }
  `,

  HorizontalScroll: styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: stretch;
    justify-content: flex-start;

    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;

    & > * {
      margin-right: ${GRID_PAD};
      max-width: ${({ itemWidth }) => itemWidth || '540px'};
      width: 100%;
      flex-grow: 3;
      flex-shrink: 0;

      animation: ${SlideInLeft} 0.3s ease-in-out;
    }

    & > *:last-child {
      margin-right: 0;
    }

    @media (max-width: 768px) {
      & > * {
        width: 45%;
        max-width: 45%;

        margin-right: ${GRID_PAD_SMALL};
      }
    }
  `,

  Card: styled.div`
    display: flex;
    flex-direction: ${(args) => orientation2FlexDirection(args) || 'column'};
    flex-wrap: ${(args) => orientation2FlexWrap(args) || 'wrap'};
    align-items: stretch;
    justify-content: stretch;
    padding: 0;
    background-color: #ffffff;
    border-radius: ${DEFAULT_BORDER_RADIUS};
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    border: 0.1vw solid ${BORDER_COLOR};

    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
      box-shadow: 5px 0 15px -2px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
      flex-direction: column !important;
    }
  `,

  CardHeaderImage: styled.div`
    height: auto;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 2px 2px 0 0;
    border-bottom: 0.1vw solid ${BORDER_COLOR};
    flex-shrink: 0;
    flex-grow: 0;
  `,

  CardHeader: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    width: 33%;
    border-right: 1px solid ${BORDER_COLOR};
    min-height: 200px;
    flex-grow: 1;
    flex-shrink: 0;
    height: 100%;

    padding: ${({ small }) => (small ? GRID_PAD_SMALL : GRID_PAD)};

    @media (max-width: 768px) {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid ${BORDER_COLOR};
      height: auto;
      min-height: 0px;

      padding: ${GRID_PAD_SMALL};
    }
  `,

  CardBody: styled.div`
    width: 100%;
    height: auto;
    flex-grow: 100;
    flex-shrink: 0;
    padding: ${({ small }) => (small ? GRID_PAD_SMALL : GRID_PAD)};
  `,

  CardFooter: styled.div`
    font-size: ${({ small }) => (small ? FONT_SIZE_TINY : FONT_SIZE_SMALL)};
    font-weight: 400;
    margin: 0;
    padding: ${({ small }) => (small ? GRID_PAD_TINY : GRID_PAD_SMALL)};
    height: auto;
    flex-grow: 0;
    flex-shrink: 0;
    width: 100%;
    border-top: 0.1vw solid #cccccc;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
      font-size: ${({ small }) => (small ? FONT_SIZE_TINY : FONT_SIZE_SMALL)};
    }
  `,

  CardTitle: styled.div`
    font-size: ${({ small }) => (small ? FONT_SIZE_TINY : FONT_SIZE_SMALL)};
    font-weight: 600;
    margin: 0;
    height: auto;
    flex-grow: 0;
    flex-shrink: 0;
    width: 100%;
    word-break: break-word;
    margin-bottom: ${({ small }) => (small ? GRID_PAD_TINY : GRID_PAD_SMALL)};

    @media (max-width: 768px) {
      font-size: ${({ small }) => (small ? FONT_SIZE_TINY : FONT_SIZE_SMALL)};
    }
  `,
};

/**
 *   I suggest you don't edit anything below this line
 * */

const accountId = context.accountId;
if (!accountId) {
  return PLEASE_CONNECT_WALLET_MESSAGE;
}

function propIsRequiredMessage(prop) {
  return PROP_IS_REQUIRED_MESSAGE.replace('{prop}', prop);
}

const appOwner = props.appOwner;
if (!appOwner) {
  return propIsRequiredMessage('appOwner');
}

const appName = props.appName;
if (!appName) {
  return propIsRequiredMessage('appName');
}

const entryRoute = props.entryRoute;
if (!entryRoute) {
  return propIsRequiredMessage('entryRoute');
}

const DEBUG = props.DEBUG || false;

const entryProps = props.entryProps || {};

const rootRoute = {
  name: entryRoute,
  props: entryProps,
};

if (!state) {
  console.log('initializing state');
  State.init({
    renderCycles: state ? state.renderCycles + 1 : 1,
    layers: [rootRoute],
  });
  return <></>;
}

const ENV = { appOwner, appName, VERSION };

const COST_NEAR_PER_BYTE = Math.pow(10, 20);
const TGAS_300 = '300000000000000';

const SessionState = {
  _state: {},
  set: (prop, value) => {
    SessionState._state[prop] = value;
    return true;
  },
  get: (prop) => {
    return SessionState._state[prop];
  },
};

function orientation2FlexDirection({ orientation }) {
  switch (orientation) {
    case 'horizontal':
      return 'row';
    case 'vertical':
      return 'column';
    default:
      return 'column';
  }
}

function orientation2FlexWrap({ orientation }) {
  switch (orientation) {
    case 'horizontal':
      return 'nowrap';
    case 'vertical':
      return 'wrap';
    default:
      return 'nowrap';
  }
}

function sessionGet(env, prop, defaultValue) {
  return (
    SessionState.get(`${env.appOwner}.${env.appName}.${prop}`) || defaultValue
  );
}
function sessionSet(env, prop, value) {
  return SessionState.set(`${env.appOwner}.${env.appName}.${prop}`, value);
}

function storageGet(env, prop, defaultValue) {
  console.log('storageGet', `${env.appOwner}.${env.appName}.${prop}`);
  return Storage.get(`${env.appOwner}.${env.appName}.${prop}`) || defaultValue;
}
function storageSet(env, prop, value) {
  console.log('storageSet', `${env.appOwner}.${env.appName}.${prop}`, value);
  return Storage.set(`${env.appOwner}.${env.appName}.${prop}`, value);
}

function restoreRoutes() {
  const info = storageGet(ENV, 'routing', null);
  console.log('Restoring routing information', JSON.stringify(info, null, 2));
  if (info === null || info === undefined) {
    return;
  }

  const layers = state.layers;
  console.log('Current routing information', JSON.stringify(layers, null, 2));
  if (
    layers &&
    Array.isArray(info) &&
    JSON.stringify(info) !== JSON.stringify(layers)
  ) {
    State.update({
      layers: info,
    });
    console.log('Restored routing information');
  }
}

restoreRoutes();

function persistRoutingInformation(env, newState) {
  storageSet(ENV, 'routing', newState);
}

function slugFromName(name) {
  return name.split('.').join('__').split('-').join('_');
}

function fetchPathOptions(env, path) {
  const nameParts = path.split(':');
  if (nameParts.length === 1) {
    return {
      owner: env.appOwner,
      name: env.appName,
      slug: slugFromName(nameParts[0]),
    };
  }
  if (nameParts.length === 2) {
    return {
      owner: env.appOwner,
      name: nameParts[0],
      slug: slugFromName(nameParts[1]),
    };
  }
  if (nameParts.length === 3) {
    return {
      owner: nameParts[0],
      name: nameParts[1],
      slug: slugFromName(nameParts[2]),
    };
  }
  throw new Error(`Invalid path: ${path}`);
}

function widgetPathFromName(env, widgetName) {
  const { owner, name, slug } = fetchPathOptions(env, widgetName);
  console.log('widgetPathFromName', {
    owner,
    name,
    slug,
    widgetName,
    path: `${owner}/widget/${name}__${slug}`,
  });
  return `${owner}/widget/${name}__${slug}`;
}

function layoutPathFromName(env, layoutName) {
  return widgetPathFromName(env, layoutName);
}

function rerender() {
  // HACK: force a re-render
  State.update({
    renderCycles: state.renderCycles + 1,
  });
}

function push(env, name, props) {
  const layer = {
    name,
    props: props || {},
    appOwner: env.appOwner,
    appName: env.appName,
  };
  const newLayers = [...state.layers, layer];

  persistRoutingInformation(newLayers);

  State.update({
    layers: newLayers,
  });
}

function replace(env, name, props) {
  const layer = {
    name,
    props: props || {},
    appOwner: env.appOwner,
    appName: env.appName,
  };
  const newLayers = [...state.layers.slice(0, -1), layer];

  persistRoutingInformation(newLayers);

  State.update({
    layers: newLayers,
  });
}

// pop from the stack, ensure we always have at least one layer
function pop(env) {
  const newLayers =
    state.layers.length > 1 ? state.layers.slice(0, -1) : state.layers;

  persistRoutingInformation(newLayers);

  State.update({
    layers: newLayers,
  });

  // rerender();
}

function dirtyEval(env, args) {
  const method = args[0];
  const key = args[1];
  const mArgs = args.slice(2);

  switch (method) {
    case 'push':
      return push(env, key, mArgs[0]);
    case 'replace':
      return replace(env, key, mArgs[0]);
    case 'pop':
      return pop(env);
    default:
      throw new Error(`Unknown method ${method}`);
  }
}

function isDate(value) {
  // we have no instanceof or typeof, so we check for the interface
  try {
    value.getFullYear();
    value.getMonth();
    value.getDate();
    value.getHours();
    value.getMinutes();
    value.getSeconds();
    return true;
  } catch (e) {
    return false;
  }
}

function numberToMonth(number, format) {
  const month = parseInt(number, 10);
  const map = [
    ['Jan', 'January'],
    ['Feb', 'February'],
    ['Mar', 'March'],
    ['Apr', 'April'],
    ['May', 'May'],
    ['Jun', 'June'],
    ['Jul', 'July'],
    ['Aug', 'August'],
    ['Sep', 'September'],
    ['Okt', 'Oktober'],
    ['Nov', 'November'],
    ['Dec', 'December'],
  ];

  if (format === 'long') {
    return map[month - 1][1];
  }
  return map[month - 1][0];
}

function dayWithSuffix(day) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const value = parseInt(day, 10);
  const suffix = suffixes[value % 10 > 3 ? 0 : value % 10];
  return `${value}${suffix}`;
}

function formatDate(date, format) {
  if (date === null || date === undefined) {
    console.error('formatDate', 'date is null or undefined', date, format);
    return '';
  }
  const properDate = isDate(date) ? date : new Date(date);
  const dateString = properDate.toISOString();

  const parts = {
    YYYY: dateString.substring(0, 4),
    YY: dateString.substring(2, 4),
    MM: dateString.substring(5, 7),
    DD: dateString.substring(8, 10),
    hh: dateString.substring(11, 13),
    mm: dateString.substring(14, 16),
    ss: dateString.substring(17, 19),
    Mshort: numberToMonth(dateString.substring(5, 7)),
    Mlong: numberToMonth(dateString.substring(5, 7), 'long'),
    Dst: dayWithSuffix(dateString.substring(8, 10)),
  };

  return format.replace(
    /\{\{\s*(?<part>YYYY|YY|MM|DD|hh|mm|ss|Mshort|Mlong|Dst)\s*\}\}/gu,
    (_match, part) => {
      return parts[part];
    }
  );
}

// https://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript
function byteLength(str) {
  // returns the byte length of an utf8 string
  var s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    let code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) {
      s++;
    } else if (code > 0x7ff && code <= 0xffff) {
      s += 2;
    }
    if (code >= 0xdc00 && code <= 0xdfff) {
      i--;
    } //trail surrogate
  }
  return s;
}

function calculateStorageCost(value) {
  // get number of bytes without TextEncoder or Blob
  const bytes = byteLength(JSON.stringify(value));
  return COST_NEAR_PER_BYTE * (bytes + NEAR_STORAGE_BYTES_SAFTY_OFFSET);
}

function contractCall(contractName, methodName, args) {
  const cost = calculateStorageCost(args);
  // console.log('contractCall', { contractName, methodName, args, cost });
  Near.call(contractName, methodName, args || {}, TGAS_300, cost);
}

function contractView(contractName, methodName, args) {
  // console.log('contractView', { contractName, methodName, args });
  return Near.view(contractName, methodName, args || {});
}

function loading(displayText) {
  return <>{displayText || '...'}</>;
}

function mergeEnv(env, newEnv) {
  return {
    ...env,
    // add all keys from env which are not null or undefined
    ...Object.entries(newEnv || {}).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {}),
  };
}

function renderComponent(name, props, env) {
  const widgetEnv = mergeEnv(ENV, env);

  const _sessionGet = (...args) => {
    return sessionGet(widgetEnv, ...args);
  };
  const _sessionSet = (...args) => {
    return sessionSet(widgetEnv, ...args);
  };
  const _storageGet = (...args) => {
    return storageGet(widgetEnv, ...args);
  };
  const _storageSet = (...args) => {
    return storageSet(widgetEnv, ...args);
  };

  const _layoutPathFromName = (path) => {
    return layoutPathFromName(widgetEnv, path);
  };
  const _widgetPathFromName = (path) => {
    return widgetPathFromName(widgetEnv, path);
  };

  const _push = (_name, _props) => {
    return push(widgetEnv, _name, _props);
  };
  const _pop = () => {
    return pop(widgetEnv);
  };
  const _replace = (_name, _props) => {
    return replace(widgetEnv, _name, _props);
  };

  const _renderComponent = (_name, _props, _env) => {
    return safeRender(_name, _props, mergeEnv(widgetEnv, _env));
  };

  const _dirtyEval = (args) => {
    return dirtyEval(widgetEnv, args);
  };

  const engine = {
    env: widgetEnv,
    accountId,

    loading,
    rerender,
    push: _push,
    pop: _pop,
    replace: _replace,
    sessionGet: _sessionGet,
    sessionSet: _sessionSet,
    storageGet: _storageGet,
    storageSet: _storageSet,
    layoutPathFromName: _layoutPathFromName,
    widgetPathFromName: _widgetPathFromName,

    renderComponent: _renderComponent,

    Components,

    helpers: {
      propIsRequiredMessage,
      calculateStorageCost,
      formatDate,
    },

    hacks: {
      dirtyEval: _dirtyEval,
    },

    TGAS_300,

    contract: {
      call: contractCall,
      view: contractView,
    },
  };

  const controllerProps = {
    __engine: engine,

    component: {
      name: name,
      props: props,
    },
  };

  return (
    <Widget
      src={`${appOwner}/widget/app__layout_controller`}
      key={props && props.key ? props.key : name}
      props={controllerProps}
    />
  );
}

function safeRender(_name, _props, _customEnv) {
  try {
    return renderComponent(_name, _props, _customEnv);
  } catch (err) {
    console.log(err);
    return (
      <div>
        Failed to render component <strong>{_name}</strong> with props:{' '}
        <pre>{JSON.stringify(_props, null, 4)}</pre>
        <br />
        <pre>{err.toString()}</pre>
        <br />
      </div>
    );
  }
}

const AppLayer = styled.div`
  animation: ${FadeIn} 0.3s ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: ${(props) => props.delay};
  animation-duration: ${(props) => props.duration};
  width: 100vw;
  min-height: 100vh;
  background-color: transparent;
  z-index: ${(props) => props.zIndex};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  opacity: 0;

  backdrop-filter: ${(props) => {
    return props.backdropFilter;
  }};
  webkit-backdrop-filter: ${(props) => {
    return props.backdropFilter;
  }};

  transition: backdrop-filter 0.3s ease-in-out;
  transition-delay: ${(props) => props.transitionDelay};
`;

// have to deconstruct Components here because of a bug in the VM.
// It cannot render <Components.Button /> :(
const { Button } = Components;

return (
  <>
    <div id="app-state" data-state={JSON.stringify(state)}></div>

    {/* state reset button */}
    {DEBUG ? (
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          zIndex: 9999,
          padding: 8,
        }}
      >
        <Button
          onClick={() => {
            storageSet('routing', [rootRoute]);
            State.update({
              layers: [rootRoute],
            });
          }}
        >
          Reset
        </Button>
      </div>
    ) : null}

    {state.layers.map((layer, index) => {
      const isLast = index === state.layers.length - 1;

      return (
        <AppLayer
          key={index}
          delay={isLast ? '0.0s' : '0.2s'}
          duration={isLast ? '0.3s' : '1s'}
          transitionDelay={isLast ? '0s' : '1s'}
          backdropFilter={
            isLast
              ? 'blur(16px) saturate(140%) brightness(80%)'
              : 'blur(0px) saturate(100%) brightness(100%)'
          }
          zIndex={index + 100}
        >
          {safeRender(layer.name, layer.props, {
            appOwner: layer.appOwner,
            appName: layer.appName,
          })}
        </AppLayer>
      );
    })}
  </>
);
