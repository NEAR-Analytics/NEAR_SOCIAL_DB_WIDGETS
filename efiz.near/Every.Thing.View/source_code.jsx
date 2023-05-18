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

const Container = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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

const handleToggleRaw = () => {
  State.update({ raw: !state.raw });
};

function renderRaw() {
  const text = `
\`\`\`json
${JSON.stringify(thing, undefined, 2)}
\`\`\`
`;
  return <Markdown text={text} />;
}

return (
  <Container>
    <Header>
      <ButtonRow>
        <Button onClick={handleToggleRaw}>
          show {state.raw ? "thing" : "raw"}
        </Button>
        <CommitButton force data={composePost} className="styless">
          post
        </CommitButton>
      </ButtonRow>
    </Header>
    {state.raw ? (
      <>{renderRaw()}</>
    ) : (
      <>
        {type?.widgets?.view && (
          <Widget src={type.widgets.view} props={{ data: thing.data }} />
        )}
      </>
    )}
  </Container>
);
