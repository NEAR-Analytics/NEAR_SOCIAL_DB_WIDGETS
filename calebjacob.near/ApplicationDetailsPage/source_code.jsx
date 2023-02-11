State.init({
  copiedShareUrl: false,
  selectedTab: props.tab ?? "about",
});

const [accountId, widget, widgetName] = props.src.split("/");
const existsData = Social.keys(`${accountId}/widget/${widgetName}`);
const exists = !existsData || Object.keys(existsData).length > 0;
const data = Social.get(`${accountId}/widget/${widgetName}/**`);
const code = data[""];
const metadata = data.metadata;
const tags = Object.keys(metadata.tags || {});
const shareUrl = `https://near.social/#/${props.src}`;

const dependencyMatch = code && code.matchAll(/<Widget.+src="(.+)".+\/>/g);
const dependencySources = [...(dependencyMatch || [])]
  .map((r) => r[1])
  .filter((r) => !!r);

const sourceCode = `
\`\`\`jsx
${code}
\`\`\`
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 48px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: 32px;
  line-height: 39px;
  color: #11181C;
  margin: 0;
  font-weight: 600;
`;

const Thumbnail = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border: 1px solid #ECEEF0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const TagsWrapper = styled.div`
  position: relative;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: 16px;
    background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1));
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const Tags = styled.ul`
  display: flex;
  list-style: none;
  gap: 6px;
  overflow: auto;
  margin: 0;
  padding: 6px 16px 0 0;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tag = styled.li`
  border: 1px solid #E6E8EB;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 18px;
  color: #687076;
  font-weight: 500;
`;

const ButtonLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  height: 32px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: ${(p) => (p.primary ? "#fff" : "#11181C")} !important;
  background: ${(p) => (p.primary ? "#0091FF" : "#FBFCFD")};
  border: ${(p) => (p.primary ? "none" : "1px solid #D7DBDF")};

  &:hover,
  &:focus {
    background: ${(p) => (p.primary ? "#0484e5" : "#ECEDEE")};
    text-decoration: none;
    outline: none;
  }

  i {
    color: #7E868C;
  }
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
  margin-bottom: 32px;
`;

const TabsButton = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
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
  grid-template-columns: 1fr 336px;
  gap: 64px;
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
`;

const SmallTitle = styled.h3`
  color: #687076;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 32px;
  text-transform: uppercase;
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

if (!exists) {
  return (
    <>
      <Title>Error</Title>
      <Text>Could not find: {props.src}</Text>
    </>
  );
}

return (
  <>
    <Header>
      <Thumbnail>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: metadata.image,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
            alt: metadata.name,
          }}
        />
      </Thumbnail>

      <Title>{metadata.name || widgetName}</Title>
    </Header>

    <Actions>
      <ButtonLink primary href={`/#/${props.src}`}>
        Open
      </ButtonLink>

      <ButtonLink href={`/#/edit/${props.src}`}>
        {context.accountId === accountId ? (
          <>
            <i class="bi bi-pencil-fill"></i> Edit
          </>
        ) : (
          <>
            <i class="bi bi-git"></i> Fork
          </>
        )}
      </ButtonLink>

      <ButtonLink
        as="button"
        type="button"
        onClick={() => {
          State.update({ selectedTab: "source" });
        }}
      >
        <i class="bi bi-code-square"></i>
        View Source
      </ButtonLink>

      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Copy to clipboard</Tooltip>}
      >
        <ButtonLink
          as="button"
          type="button"
          onMouseLeave={() => {
            State.update({ copiedShareUrl: false });
          }}
          onClick={() => {
            clipboard.writeText(shareUrl).then(() => {
              State.update({ copiedShareUrl: true });
            });
          }}
        >
          {state.copiedShareUrl ? (
            <i class="bi bi-check-circle"></i>
          ) : (
            <i class="bi bi-box-arrow-up-right"></i>
          )}
          Share URL
        </ButtonLink>
      </OverlayTrigger>
    </Actions>

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
    </Tabs>

    {state.selectedTab === "about" && (
      <Content>
        <div>
          <Markdown text={metadata.description} />
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
              <TagsWrapper>
                <Tags>
                  {tags.map((tag, i) => (
                    <Tag key={i}>{tag}</Tag>
                  ))}
                </Tags>
              </TagsWrapper>
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
                <i class="bi bi-box-arrow-up-right"></i>
              </TextLink>
            </div>
          )}

          <div>
            <Text small>
              <i class="bi bi-clock"></i>
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
              <Text>This application contains no component dependencies.</Text>
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
  </>
);
