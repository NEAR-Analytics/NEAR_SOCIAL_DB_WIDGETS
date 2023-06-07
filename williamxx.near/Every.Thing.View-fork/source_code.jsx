const path = props.path;
const blockHeight = props.blockHeight || "final";

// Replace all in the VM? Thing keyword?
let parts = [];
try {
  parts = path.split("/");
} catch (e) {
  // TODO : Better error handling?
  console.log(`path not valid.`);
  return <></>;
}

// GET THE TYPE BASED ON THE PATH //
// TODO: replace with Type.get(path) //
let type;
if (parts.length === 1) {
  type = "account";
} else if (parts[1] === "thing") {
  const thing = Social.get(path, blockHeight);
  thing = JSON.parse(thing || "null");
  type = thing.type || null;
} else {
  type = parts[1];
}

if (type === null) {
  console.log(`type not found: ${type}`);
  return <></>;
}

// GET THE CREATOR ID //
// ROOT ID? //
const creatorId = parts[0];

const Container = styled.div`
  border: 1px solid #ccc;
  height: fit-content;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid #ccc;
`;

const IconBox = styled.div`
  font-family: "Times New Roman";
  font-size: 2em;
  line-height: 1.25;
  font-weight: 400;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 1px;
  min-height: 10px;
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 4px;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Key = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const Value = styled.span`
  color: #888;
`;

const Item = styled.div`
  padding: 0;
  .btn {
    width: 100%;
    border: 0;
    text-align: left;
    &:hover,
    &:focus {
      background-color: #ecedee;
      text-decoration: none;
      outline: none;
    }

    i {
      color: #7e868c;
    }

    span {
      font-weight: 500;
    }
  }
`;

function renderContent() {
  if (state.showHistory) {
    return (
      <Widget
        src="efiz.near/widget/Every.Thing.History"
        props={{ path, blockHeight }}
      />
    );
  }
  if (state.showRaw) {
    let thing;
    if (type === "settings") {
      // Need to normalize to accountId/settings/**
      // Or fix the path that is given to the settings component.
      // Every thing takes a path and a blockHeight
      parts.pop();
      parts.push("**");
      path = parts.join("/");
      thing = Social.get(path, blockHeight);
    } else {
      thing = JSON.parse(Social.get(path, blockHeight));
    }
    if (state.showEdit) {
      function handleSubmit(val) {
        const parts = path.split("/");
        parts.shift(); // Remove the first element
        const newData = {
          [parts[0]]: {
            [parts[1]]: val.replace(/\n/g, ""),
          },
        };
        if (context.accountId === creatorId) {
          Social.set(newData, {
            force: true,
          });
        }
      }
      return (
        <Widget
          src="efiz.near/widget/Every.Raw.Edit"
          props={{ value: thing, handleSubmit: handleSubmit }}
        />
      );
    } else {
      return (
        <>
          <p>{path}</p>
          <Widget
            src="efiz.near/widget/Every.Raw.View"
            props={{ value: thing }}
          />
        </>
      );
    }
  } else {
    if (type.split("/").length > 1) {
      const thingType = type;
      const type = JSON.parse(Social.get(thingType, blockHeight) || "null");
      if (type === null) {
        console.log(
          `edge case: thing ${path} had an invalid type: ${thingType}`
        );
      }
      let widgetSrc;
      if (state.showEdit) {
        // Can I merge state with accessor
        widgetSrc = type?.widgets?.edit;
      } else {
        widgetSrc = type?.widgets?.view; // Or settings
      }
      const thing = Social.get(path, blockHeight);
      thing = JSON.parse(thing || "null"); // I already fetched thing when I got type
      // what if thing data comes from somewhere else? auditable backend according to type, api keys are stored browser side or proxy
      return (
        <Widget
          src={widgetSrc}
          props={{ data: thing.data, blockHeight, ...props }}
        />
      );
      // HERE IS THE TYPE RENDER
      // We have an idea... it should render as the default idea view
      // But first should check if user has a custom in settings
      // What if the creator of the idea wants to display it in their own way?
      // What if we want to force a specific way for it to be displayed?
    } else {
      switch (type) {
        case "widget":
          return <Widget src={path} />;
        case "account":
          return <p>account</p>;
        case "settings":
          return (
            <Widget
              src="efiz.near/widget/Every.Setting"
              props={{ path, blockHeight }}
            />
          );
        case "type":
          return <Widget src="efiz.near/widget/Every.Type" />;
        case "profile":
          return <Widget src={"efiz.near/widget/Every.Profile"} />;
        case "graph":
          return <p>graph</p>;
        case "post":
          return <Widget src={"efiz.near/widget/Every.Post"} />;
        case "thing":
          console.log(`edge case: ${path} had "thing" type`);
          return <></>;
        default:
          // TODO: this doesn't work in current vm
          return null;
      }
    }
  }
}

// DROPDOWN //
// where can I put this? I'd like a better editor
// this is a separate plugin
// put in settings acording to the type
function toggleEdit() {
  if (state.showEdit) {
    return (
      <button
        className={`btn`}
        onClick={() => State.update({ showEdit: false })}
      >
        <i className="bi bi-arrow-counterclockwise me-1" />
        <span>Cancel Edit</span>
      </button>
    );
  } else {
    return (
      <button
        className={`btn`}
        onClick={() => State.update({ showEdit: true, showRaw: true })}
      >
        <i className="bi bi-pencil me-1" />
        <span>Edit</span>
      </button>
    );
  }
}
// These are two very similiar functions
function toggleRaw() {
  if (state.showRaw) {
    return (
      <button
        className={`btn`}
        onClick={() => State.update({ showRaw: false })}
      >
        <i className="bi bi-arrow-up-left-circle me-1" />
        <span>Show Thing</span>
      </button>
    );
  } else {
    return (
      <button className={`btn`} onClick={() => State.update({ showRaw: true })}>
        <i className="bi bi-filetype-raw me-1" />
        <span>Raw</span>
      </button>
    );
  }
}
function toggleHistory() {
  if (state.showHistory) {
    return (
      <button
        className={`btn`}
        onClick={() => State.update({ showHistory: false })}
      >
        <i className="bi bi-clock me-1" />
        <span>Hide History</span>
      </button>
    );
  } else {
    return (
      <button
        className={`btn`}
        onClick={() => State.update({ showHistory: true })}
      >
        <i className="bi bi-clock-history me-1" />
        <span>Show History</span>
      </button>
    );
  }
}

function nearPad() {
  if (type === "widget") {
    return (
      <a
        className={`btn`}
        href={`https://nearpad.dev/editor/${path}`}
        target="_blank"
      >
        <i className=" me-1">
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="2 2 18 18"
            width="16px"
            height="16px"
          >
            <path d="M12.16 3h-.32L9.21 8.25h5.58zm4.3 5.25h5.16l-2.07-4.14C19.21 3.43 18.52 3 17.76 3h-3.93l2.63 5.25zm4.92 1.5h-8.63V20.1zM11.25 20.1V9.75H2.62zM7.54 8.25 10.16 3H6.24c-.76 0-1.45.43-1.79 1.11L2.38 8.25h5.16z"></path>
          </svg>
        </i>
        <span>Open NEARpad</span>
      </a>
    );
  }
}
// This should be a prop
const renderIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="black"
      width="24px"
      height="24px"
    >
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
};

function toggleView(path, blockHeight) {}

// We need it to be able to change state.
// I need a widget referenced in state
const plugins = [];
const typeParts = type.split("/");
if (typeParts.length > 1 || type === "widget") {
  plugins = Social.get(
    `${context.accountId}/settings/every/${type}/plugins`
  ) || [toggleEdit(), toggleRaw(), toggleHistory(), nearPad()];
}

return (
  <Container id={path}>
    <Header>
      <ButtonRow>
        <Widget
          src="efiz.near/widget/Common.Dropdown"
          props={{
            renderIcon: renderIcon,
            elements: plugins,
          }}
        />
      </ButtonRow>
    </Header>
    <Content>{renderContent()}</Content>
  </Container>
);

// I think that there is a standard install
// You start with some default settings
// Type = "every.near/type/plugin"
// plugins apply to types...
// pluginType =
