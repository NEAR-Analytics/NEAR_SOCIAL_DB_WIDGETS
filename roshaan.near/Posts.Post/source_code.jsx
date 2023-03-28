const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const subscribe = !!props.subscribe;
const notifyAccountId = accountId;
const postUrl = `https://alpha.near.org/#/calebjacob.near/widget/PostPage?accountId=${accountId}&blockHeight=${blockHeight}`;
const comments = props.comments ?? [];
const content = JSON.parse(props.content);

if (!content) {
  return "no content provided";
}
const Post = styled.div`
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

const Header = styled.div`
  margin-bottom: 0;
  display: inline-flex;
`;

const Body = styled.div`
  padding-left: 52px;
  padding-bottom: 1px;
`;

const Content = styled.div`
  img {
    display: block;
    max-width: 100%;
    max-height: 80vh;
    margin: 0 0 12px;
  }
`;

const Text = styled.p`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #687076;
  white-space: nowrap;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: -6px -6px 6px;
`;

const Comments = styled.div`
  > div > div:first-child {
    padding-top: 12px;
  }
`;
const Wrapper = styled.div`
  > div:first-child {
    > a:first-child {
      display: inline-flex;
      margin-bottom: 24px;
      font-size: 14px;
      line-height: 20px;
      color: #687076;
      outline: none;
      font-weight: 600;

      &:hover,
      &:focus {
        color: #687076;
        text-decoration: underline;
      }
    }
  }
`;
const renderComment = (a) =>
  a.value.type === "md" && (
    <div key={JSON.stringify(a)}>
      console.log(a, "item")
      <Widget
        src="roshaan.near/widget/Comments.Comment"
        props={{
          accountId: a.accountId,
          blockHeight: a.blockHeight,
          highlight:
            a.accountId === props.highlightComment?.accountId &&
            a.blockHeight === props.highlightComment?.blockHeight,
        }}
      />
    </div>
  );

// const renderedComments = comments.map(renderComment);

return (
  <Post>
    <Header>
      <Widget
        src="calebjacob.near/widget/AccountProfile"
        props={{
          accountId,
          hideAccountId: true,
          inlineContent: (
            <>
              <Text as="span">･</Text>
              <Text>
                {blockHeight === "now" ? (
                  "now"
                ) : (
                  <>
                    <Widget
                      src="mob.near/widget/TimeAgo"
                      props={{ blockHeight }}
                    />{" "}
                    ago
                  </>
                )}
              </Text>
            </>
          ),
        }}
      />
    </Header>

    <Body>
      <Content>
        {content.text && (
          <Widget
            src="calebjacob.near/widget/SocialMarkdown"
            props={{ text: content.text }}
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

      {blockHeight !== "now" && (
        <Actions>
          <Widget
            src="calebjacob.near/widget/LikeButton"
            props={{
              item,
              notifyAccountId,
            }}
          />
          <Widget
            src="calebjacob.near/widget/CommentButton"
            props={{
              item,
              onClick: () => State.update({ showReply: !state.showReply }),
            }}
          />
          <Widget
            src="calebjacob.near/widget/CopyUrlButton"
            props={{
              url: postUrl,
            }}
          />
        </Actions>
      )}

      {state.showReply && (
        <div className="mb-2">
          <Widget
            src="calebjacob.near/widget/Comments.Compose"
            props={{
              notifyAccountId,
              item,
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
      )}
      <Comments>
        <Wrapper>{comments}</Wrapper>
      </Comments>
    </Body>
  </Post>
);
