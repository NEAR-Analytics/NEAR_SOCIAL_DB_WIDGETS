if (!props.src) return "";

State.init({
  copiedShareUrl: false,
  selectedTab: props.tab ?? "about",
});

const [accountId, widget, widgetName] = props.src.split("/");
const data = Social.get(`${accountId}/widget/${widgetName}/**`);
const code = data[""];
const metadata = data.metadata;
const tags = Object.keys(metadata.tags || {});
const shareUrl = `https://near.social/#/${props.src}`;

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

    {tags.length > 0 && (
      <TagsWrapper>
        <Tags>
          {tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </Tags>
      </TagsWrapper>
    )}

    <Markdown text={sourceCode} />
  </>
);
