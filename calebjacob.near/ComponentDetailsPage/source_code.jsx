State.init({
  copiedShareUrl: false,
  selectedTab: props.tab ?? "about",
});

const src = props.src;
const [accountId, widget, widgetName] = src.split("/");
const existsData = Social.keys(`${accountId}/widget/${widgetName}`);
const exists = !existsData || Object.keys(existsData).length > 0;
const data = Social.get(`${accountId}/widget/${widgetName}/**`);
const code = data[""];
const metadata = data.metadata;
const tags = Object.keys(metadata.tags || {});
const shareUrl = `https://near.social/#/calebjacob.near/widget/ComponentDetailsPage?src=${src}`;

const dependencyMatch = code && code.matchAll(/<Widget.*src="(.+)".+\/>/g);
const dependencySources = [...(dependencyMatch || [])]
  .map((r) => r[1])
  .filter((r) => !!r);

const sourceCode = `
\`\`\`jsx
${code}
\`\`\`
`;

function onViewSource() {
  State.update({ selectedTab: "source" });
}

const SummaryWrapper = styled.div`
  margin-bottom: 32px;
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
  margin-bottom: 32px;
`;

const TabsButton = styled.button`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;

  &:hover {
    color: #11181C;
  }

  &::after {
    content: '';
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #0091FF;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 336px;
  gap: 64px;

  @media (max-width: 995px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Sidebar = styled.div`
  > div {
    padding-bottom: 32px;
    border-bottom: 1px solid #ECEEF0;
    margin-bottom: 32px;

    &:last-child {
        padding-bottom: 0;
        border-bottom: none;
        margin-bottom: 0;
    }
  }
  
  @media (max-width: 995px) {
    padding-top: 32px;
    border-top: 1px solid #ECEEF0;
  }
`;

const SmallTitle = styled.h3`
  color: #687076;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 32px;
  text-transform: uppercase;

  @media (max-width: 770px) {
    margin-bottom: 16px;
  }
`;

const TextLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0091FF;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};

  i {
    margin-right: 4px;
  }
`;

const Dependency = styled.div`
  margin-bottom: 24px;
`;

const HistoryContainer = styled.div`
  > div > h1,
  > div > .input-group.mb-3 {
    display: none;
  }
`;

if (!exists) {
  return (
    <>
      <Title>Error</Title>
      <Text>Could not find: {src}</Text>
    </>
  );
}

return (
  <>
    <SummaryWrapper>
      <Widget
        src="calebjacob.near/widget/ComponentSummary"
        props={{
          primaryAction: "open",
          size: "large",
          showTags: false,
          src,
          onViewSource,
        }}
      />
    </SummaryWrapper>

    <Tabs>
      <TabsButton
        type="button"
        onClick={() => State.update({ selectedTab: "about" })}
        selected={state.selectedTab === "about"}
      >
        About
      </TabsButton>

      <TabsButton
        type="button"
        onClick={() => State.update({ selectedTab: "source" })}
        selected={state.selectedTab === "source"}
      >
        Source
      </TabsButton>

      <TabsButton
        type="button"
        onClick={() => State.update({ selectedTab: "history" })}
        selected={state.selectedTab === "history"}
      >
        History
      </TabsButton>
    </Tabs>

    {state.selectedTab === "about" && (
      <Content>
        <div>
          {metadata.description ? (
            <Markdown text={metadata.description} />
          ) : (
            <Text>This component has no description.</Text>
          )}
        </div>

        <Sidebar>
          <div>
            <SmallTitle>Developer</SmallTitle>
            <Widget
              src="calebjacob.near/widget/AccountProfile"
              props={{
                accountId: accountId,
              }}
            />
          </div>

          {tags.length > 0 && (
            <div>
              <SmallTitle>Tags</SmallTitle>
              <Widget
                src="calebjacob.near/widget/ComponentTags"
                props={{
                  tags,
                }}
              />
            </div>
          )}

          {metadata.linktree?.website && (
            <div>
              <SmallTitle>Website</SmallTitle>
              <TextLink
                href={`https://${metadata.linktree.website}`}
                target="_blank"
              >
                {metadata.linktree.website}
                <i className="bi bi-box-arrow-up-right"></i>
              </TextLink>
            </div>
          )}

          <div>
            <Text small>
              <i className="bi bi-clock"></i>
              Last updated
              <Widget
                src="mob.near/widget/TimeAgo"
                props={{ keyPath: `${accountId}/widget/${widgetName}` }}
              />{" "}
              ago.
            </Text>
          </div>
        </Sidebar>
      </Content>
    )}

    {state.selectedTab === "source" && (
      <Content>
        <Markdown text={sourceCode} />

        <Sidebar>
          <div>
            <SmallTitle>Dependencies ({dependencySources.length})</SmallTitle>

            {dependencySources.length === 0 && (
              <Text>This component has no dependencies.</Text>
            )}

            {dependencySources.map((source) => (
              <Dependency key={source}>
                <Widget
                  src="calebjacob.near/widget/ComponentProfile"
                  props={{ src: source }}
                />
              </Dependency>
            ))}
          </div>
        </Sidebar>
      </Content>
    )}

    {state.selectedTab === "history" && (
      <HistoryContainer>
        <Widget
          src="bozon.near/widget/WidgetHistory"
          props={{ widgetPath: src }}
        />
      </HistoryContainer>
    )}
  </>
);
