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
  return <p>type not found: {thing.type}</p>;
}

// GET THE CREATOR ID //
// ROOT ID? //
const creatorId = parts[0];

const Container = styled.div`
  border: 1px solid #ccc;
  width: fit-content;
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

function composePost() {
  return {
    post: {
      main: JSON.stringify({
        path,
        blockHeight,
        type: type,
      }),
    },
    index: {
      post: JSON.stringify({
        key: "main",
        value: {
          type: type, // because we want to filter by type
        },
      }),
    },
  };
}

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
      console.log(path);
      function handleSubmit(val) {
        const parts = path.split("/");
        parts.shift(); // Remove the first element

        const newData = {
          [parts[0]]: {
            [parts[1]]: val,
          },
        };
        Social.set(newData, {
          force: true,
        });
      }
      return (
        <Widget
          src="efiz.near/widget/Every.Raw.Edit"
          props={{ value: thing, handleSubmit: handleSubmit }}
        />
      );
    } else {
      return (
        <Widget
          src="efiz.near/widget/Every.Raw.View"
          props={{ value: thing }}
        />
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
      // what if thing data comes from somewhere else? auditable backend according to type, api keys are stored browser side
      return <Widget src={widgetSrc} props={{ data: thing.data }} />;
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
          return (
            <Widget
              src={"settings/every/profile" || "efiz.near/widget/Every.Profile"}
            />
          );
        case "graph":
          return <p>graph</p>;
        case "post":
          return (
            <Widget
              src={"settings/every/post" || "efiz.near/widget/Every.Post"}
            />
          );
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
        onClick={() => State.update({ showEdit: true })}
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

return (
  <Container>
    <Header>
      <ButtonRow>
        {creatorId === context.accountId && (
          <Widget
            src="efiz.near/widget/Common.Dropdown"
            props={{
              renderIcon: renderIcon,
              elements: [toggleEdit(), toggleRaw(), toggleHistory()],
            }}
          />
        )}
      </ButtonRow>
    </Header>
    <Content>{renderContent()}</Content>
  </Container>
);
