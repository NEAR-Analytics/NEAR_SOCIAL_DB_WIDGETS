const path = props.path;
const blockHeight = props.blockHeight || "final";

// GET THE THING //
const thing = JSON.parse(Social.get(path, blockHeight) || "null");

if (thing === null) {
  console.log(`thing not found at path: ${path}`);
  return <></>;
}

// GET THE TYPE //
const type = JSON.parse(Social.get(thing.type, "final") || "null");

if (type === null) {
  return <p>type not found: {thing.type}</p>;
}

// GET THE OWNER //
const parts = path.split("/");
const ownerId = parts[0];

const Container = styled.div`
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Content = styled.div`
  
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: end;
  width: 100%;
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
    border:0;
    text-align: left;
    &:hover,
    &:focus {
      background-color: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      color: #7E868C;
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
        type: thing.type,
      }),
    },
    index: {
      post: JSON.stringify({
        key: "main",
        value: {
          type: thing.type, // because we want to filter by type
        },
      }),
    },
  };
}

State.init({ raw: false });

function renderContent() {
  if (state.showRaw) {
    const text = `
\`\`\`json
${JSON.stringify(thing, undefined, 2)}
\`\`\`
`;
    return <Markdown text={text} />;
    // Would be cool to edit raw directly
  } else {
    if (state.showEdit) {
      <>
        {type?.widgets?.view && (
          <Widget src={type.widgets.view} props={{ data: thing.data }} />
        )}
      </>;
    } else {
      return (
        <>
          {type?.widgets?.view && (
            <Widget src={type.widgets.view} props={{ data: thing.data }} />
          )}
        </>
      );
    }
  }
}

function toggleEdit() {
  if (state.showEdit) {
    return (
      <button
        className={`btn`}
        onClick={() => State.update({ showEdit: false })}
      >
        <i className="bi bi-pencil me-1" />
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

function toggleRaw() {
  if (state.showRaw) {
    return (
      <button
        className={`btn`}
        onClick={() => State.update({ showRaw: false })}
      >
        <i className="bi bi-pencil me-1" />
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
        {ownerId === context.accountId && (
          <Widget
            src="efiz.near/widget/Common.Dropdown"
            props={{
              renderIcon: renderIcon,
              elements: [toggleEdit(), toggleRaw()],
            }}
          />
        )}
      </ButtonRow>
    </Header>
    <Content>{renderContent()}</Content>
  </Container>
);
