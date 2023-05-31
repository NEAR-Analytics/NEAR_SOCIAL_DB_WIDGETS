const type = props.type || "";
const postThing = props.postThing;
const availableTypes = JSON.parse(props.availableTypes) || [
  "efiz.near/type/paragraph",
  "efiz.near/type/Image",
  "efiz.near/type/document",
  "efiz.near/type/feed",
  "efiz.near/type/idea",
  "md",
];

State.init({
  selectedType: type,
  expanded: false,
});

function extractMentions(text) {
  const mentionRegex =
    /@((?:(?:[a-z\d]+[-_])*[a-z\d]+\.)*(?:[a-z\d]+[-_])*[a-z\d]+)/gi;
  mentionRegex.lastIndex = 0;
  const accountIds = new Set();
  for (const match of text.matchAll(mentionRegex)) {
    if (
      !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
      !/[/\w`]/.test(match.input.charAt(match.index + match[0].length)) &&
      match[1].length >= 2 &&
      match[1].length <= 64
    ) {
      accountIds.add(match[1].toLowerCase());
    }
  }
  return [...accountIds];
}

function extractTagNotifications(text, item) {
  return extractMentions(text || "")
    .filter((accountId) => accountId !== context.accountId)
    .map((accountId) => ({
      key: accountId,
      value: {
        type: "mention",
        item,
      },
    }));
}

const composeData = () => {
  // generate a random id
  const thingId = state.thingId || Math.random();
  const data = {
    thing: {
      ...state.extra,
      [thingId]: JSON.stringify({
        data: state.thing,
        type: state.selectedType,
      }),
    },
    index: {
      thing: JSON.stringify({
        key: thingId,
        value: {
          type: state.selectedType,
        },
      }),
    },
  };

  // TODO: What other types can we extract mentions from?
  // How can this be better associated with the type?
  if (state.selectedType === "md") {
    const notifications = extractTagNotifications(state.thing, {
      type: "social",
      path: `${context.accountId}/thing/${thingId}`,
    });

    if (notifications.length) {
      data.index.notify = JSON.stringify(
        notifications.length > 1 ? notifications : notifications[0]
      );
    }
  }

  if (postThing) {
    data = postThing(data);
  }
  return data;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

// const Row = styled.div`
//   display: flex;
//   gap: 10px;
// `;

// const Select = styled.select`
//   padding: 5px;
//   width: 100%;
// `;

// const Input = styled.input`
// `;

const SwitchButton = styled.button`
  padding: 5px 10px;
  background-color: ${({ active }) => (active ? "#5fba7d" : "#ccc")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
`;

const TextContainer = styled.div`
    margin-left: 4px;
`;

const FormContainer = styled.div`
  margin: 20px;
`;

const Input = styled.input`
  flex: 1;
  max-width: 200px;
  margin-bottom: 10px;
  height: 30px;
`;

const Select = styled.select`
  height: 30px;
`;

const Button = styled.button`
  height: 30px;
`;

const Text = styled.p`
  display: inline-block;
  margin-right: 10px;
`;

const handleTypeChange = (e) => {
  State.update({ selectedType: e.target.value });
};

if (state.selectedType !== "") {
  if (state.selectedType !== "md") {
    type = JSON.parse(Social.get(state.selectedType, "final") || null);
    if (type === null) {
      return <></>;
    }
  } else {
    type = "md";
  }
}

const handleThingData = (value, extra) => {
  State.update({ thing: value, extra });
};

function RenderTypeCreate() {
  if (type !== "") {
    if (type?.widgets?.create !== undefined) {
      return (
        <Widget
          src={type?.widgets?.create}
          props={{ onChange: handleThingData }} // onChange
        />
      );
    } else {
      return (
        <Widget
          src="efiz.near/widget/every.md.create"
          props={{ onChange: handleThingData }} // onChange
        />
      );
    }
  }
}

return (
  <>
    <Container>
      {props.type === undefined ? (
        <>
          <Row>
            <TextContainer>create a thing of type:</TextContainer>
          </Row>
          <Row>
            <Select value={state.selectedType} onChange={handleTypeChange}>
              <option value="">Select a type</option>
              {availableTypes.map((it) => (
                <option value={it} key={it}>
                  {it}
                </option>
              ))}
            </Select>
          </Row>
        </>
      ) : null}

      <RenderTypeCreate />
    </Container>
    <Button onClick={() => State.update({ expanded: !state.expanded })}>
      optional {state.expanded ? "-" : "+"}
    </Button>
    <Row>
      {state.expanded ? (
        <>
          <Input
            onChange={(e) => State.update({ thingId: e.target.value })}
            placeholder="thing id"
          />
        </>
      ) : null}
    </Row>
    <CommitButton
      force
      data={composeData()}
      disabled={!state.thing}
      className="styless"
    >
      create
    </CommitButton>
  </>
);
