/*

widgetPath: string,
onClose(): function,

*/

const widgetCode = Social.get(props.widgetPath);

if (widgetCode === null) return "loading...";

State.init({
  title: "",
  code: widgetCode,
  memo: "",
  tab: "code",
  props: Storage.get("props") || {},
});

const [widgetAccountId, _, widgetName] = props.widgetPath.split("/");

function getDatastringFromBlockHeight(blockHeight) {
  const block = Near.block(blockHeight);
  const date = new Date(block.header.timestamp_nanosec / 1e6);
  return date.toDateString() + " " + date.toLocaleTimeString();
}

const Tabs = styled.div`
  display: flex;
  padding: 0 12px;
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
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

return (
  <div>
    <div class="d-flex flex-row align-items-center mb-3">
      <div class="col"></div>
      <h4 class="col">Create Pull Request</h4>
      <div class="col d-flex justify-content-end">
        <button className="btn-close" onClick={() => props.onClose()} />
      </div>
    </div>
    <div className="col-lg-12  mb-2">
      Title
      <input
        type="text"
        onBlur={(e) => {
          State.update({
            title: e.target.value,
          });
        }}
      />
      Code:
      <textarea
        type="text"
        rows={6}
        class="form-control"
        placeholder="code"
        defaultValue={widgetCode}
        onBlur={(e) => {
          State.update({
            code: e.target.value,
          });
        }}
      />
      Memo:
      <textarea
        type="text"
        rows={2}
        class="form-control"
        placeholder="memo"
        onBlur={(e) => {
          State.update({
            memo: e.target.value,
          });
        }}
      />
    </div>
    <CommitButton
      data={{
        index: {
          pull_request: JSON.stringify([
            {
              key: props.widgetAccountId,
              value: {
                title: state.title,
              },
            },
          ]),
        },
        pull_request: {
          title: state.title,
          code: state.code,
          memo: state.memo,
        },
      }}
    >
      {widgetCode ? "Submit" : "Widget not found"}
    </CommitButton>
    <hr />
    <div>
      <div className="border rounded-4 p-3 pb-1">
        <div className="d-flex flex-row justify-content-between">
          <div className="flex-grow-1 text-truncate">
            <a
              className="text-dark text-decoration-none text-truncate"
              href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
            >
              <Widget
                src="mob.near/widget/Profile.ShortInlineBlock"
                props={{ accountId: context.accountId, tooltip: true }}
              />
            </a>
          </div>
          <div className="text-muted">{getDatastringFromBlockHeight()}</div>
        </div>

        {state.title && <h3 className="m-3">{state.title}</h3>}

        {state.memo && <Markdown className="m-3" text={state.memo} />}

        <Tabs>
          <TabsButton
            onClick={() => State.update({ tab: "code" })}
            selected={state.tab === "code"}
          >
            Code
          </TabsButton>
          <TabsButton
            onClick={() => State.update({ tab: "render" })}
            selected={state.tab === "render"}
          >
            Render
          </TabsButton>
        </Tabs>

        <div
          style={{
            display: state.tab == "code" ? "block" : "none",
          }}
        >
          <Widget
            src={`bozon.near/widget/CodeDiff`}
            props={{
              currentCode: state.code,
              prevCode: widgetCode,
            }}
          />
        </div>

        <div
          style={{
            display: state.tab == "render" ? "block" : "none",
          }}
          className="p-3"
        >
          props:
          <textarea
            type="text"
            rows={2}
            class="form-control"
            defaultValue={JSON.stringify(state.props)}
            onBlur={(e) => {
              try {
                const provProps = JSON.parse(e.target.value);

                Storage.set("props", provProps);

                State.update({
                  props: provProps,
                });
              } catch {}
            }}
          />
          <Widget code={state.code} props={state.props} />
        </div>
      </div>
    </div>
  </div>
);
