// Original widget: https://alpha.near.org/#/calebjacob.near/widget/Posts.Post
const accountId = props.accountId ?? context.accountId;
const blockHeight = props.blockHeight ?? "now";
const snipContent = props.snipContent ?? false;
const snippetMaxWords = props.snippetMaxWords ?? 40;
const content = props.content;
if (content?.text && snippet) {
  const text = content.text.split(" ");
  content.text = text.slice(0, snippetMaxWords);
  if (text.length >= snippetMaxWords) {
    content.text.push(props.snippedEnd ?? "...");
  }
  content.text = content.text.join(" ");
}
const key = props.key ?? JSON.stringify(content);
const postType = props.postType ?? "post";
const postBlockHeight =
  postType === "post" ? "blockHeight" : "commentBlockHeight";
const postUrl = `https://alpha.near.org/#/adminalpha.near/widget/PostPage?accountId=${accountId}&${postBlockHeight}=${blockHeight}`;
const onClick =
  props.onClick ??
  (() => {
    if (props.debug) {
      console.log(`clicked on post: ${postUrl}`);
    }
  });

const Post =
  props.styles?.Post ??
  styled.a`
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 19px;
    top: 52px;
    bottom: 12px;
    width: 2px;
    background: #ECEEF0;
  }
`;

const Header =
  props.styles?.Header ??
  styled.div`
  margin-bottom: 0;
  display: inline-flex;
`;

const Body =
  props.styles?.Body ??
  styled.div`
  padding-left: 52px;
  padding-bottom: 1px;
`;

const Content =
  props.styles?.Content ??
  styled.div`
  img {
    display: block;
    max-width: 100%;
    max-height: 80vh;
    margin: 0 0 12px;
  }
`;

const Text =
  props.styles?.Text ??
  styled.p`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #687076;
  white-space: nowrap;
`;

const Card = styled.div`
  width: 264px;
  height: 279px;
  border: 1px solid #E6E8EB;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TopRow = styled.div`
  display: flex;
  padding: 8px;
`;

const MiddleRow = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 8px;
`;

const BottomRow = styled.div`
  display: flex;
  padding: 8px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-top: 1px solid #ECEEF0;
  height: 65px;
`;

const ViewFullPostButton = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 8px;
  width: 216px;
  height: 33px;
  background: #FAFAFA;
  border: 1px solid #E6E8EB;
  border-radius: 50px;
  flex: none;
  order: 1;
  flex-grow: 1;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #006ADC;
  &:hover {
    background-color: #E6E8EB;
  }
  &:focus {
    outline: none;
  }
`;
return (
  <Card>
    <TopRow>
      <Widget
        src="dorgon108.near/widget/AccountProfile-Search-PostComponent"
        props={{
          accountId,
          hideAccountId: true,
        }}
      />
    </TopRow>
    <MiddleRow>
      <Content>
        {"content.text" && (
          <Widget
            src="calebjacob.near/widget/SocialMarkdown"
            props={{
              text: "content.text Westworld talks about concisouss in. some hosts and who knows",
            }}
          />
        )}

        {content.image && (
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: content.image,
            }}
          />
        )}
      </Content>
    </MiddleRow>
    <BottomRow>
      <Footer>
        <ViewFullPostButton>View full post</ViewFullPostButton>
      </Footer>
    </BottomRow>
  </Card>
);
