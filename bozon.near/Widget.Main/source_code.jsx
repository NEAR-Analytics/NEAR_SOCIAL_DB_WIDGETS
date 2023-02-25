//props.widgetPath

const [accountId, _, widget] = props.widgetPath.split("/");

const code = Social.get(props.widgetPath);

if (code === null) return "Loading";
if (code === undefined) return "Widget not found";

const text = `
\`\`\`jsx
${code}
\`\`\`
`;

function isOwner() {
  const [widgetOwnerAccountId, _, widget] = props.widgetPath.split("/");
  return widgetOwnerAccountId == context.accountId;
}

State.init({
  tab: "code",

  collaboratorsCount: 0,
  historyCount: 0,
});

const Tabs = styled.div`
  display: flex;
  padding: 0 12px;
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
`;

const TabView = styled.div`
  padding: 10px;
`;

const TabsButton = styled.button`
  font-weight: 400;
  font-size: 14px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;

  &:hover {
    color: #11181C;
  }

  &::after {
    content: '';
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 3px;
    background: #0091FF;
  }
`;

//using "display: none" to make functions work on initialization
return (
  <div>
    <Tabs>
      <TabsButton
        onClick={() => State.update({ tab: "code" })}
        selected={state.tab == "code"}
      >
        Code
      </TabsButton>
      <TabsButton
        onClick={() => State.update({ tab: "history" })}
        selected={state.tab == "history"}
      >
        History {state.historyCount}
      </TabsButton>
      <TabsButton
        onClick={() => State.update({ tab: "issues" })}
        selected={state.tab == "issues"}
      >
        Issues
      </TabsButton>
      <TabsButton
        onClick={() => State.update({ tab: "pullRequests" })}
        selected={state.tab == "pullRequests"}
      >
        Pull requests
      </TabsButton>
      <TabsButton
        onClick={() => State.update({ tab: "collaborators" })}
        selected={state.tab == "collaborators"}
      >
        Developers {state.collaboratorsCount}
      </TabsButton>
    </Tabs>

    <TabView>
      {state.tab == "code" && <Markdown text={text} />}

      <div
        style={{
          display: state.tab == "pullRequests" ? "block" : "none",
        }}
      >
        <Widget src="bozon.near/widget/Widget.PullRequests" />
      </div>

      <div
        style={{
          display: state.tab == "history" ? "block" : "none",
        }}
      >
        <Widget
          src="bozon.near/widget/WidgetHistory.History"
          props={{
            widgetPath: props.widgetPath,
            count: (count) => State.update({ historyCount: count }),
          }}
        />
      </div>

      <div
        style={{
          display: state.tab == "collaborators" ? "block" : "none",
        }}
      >
        <Widget
          src="bozon.near/widget/Widget.Developers"
          props={{
            widgetPath: props.widgetPath,
            count: (count) => State.update({ collaboratorsCount: count }),
          }}
        />
      </div>
    </TabView>
  </div>
);
