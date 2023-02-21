const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const subscribe = !!props.subscribe;
const notifyAccountId = accountId;
const postUrl = `/#/calebjacob.near/widget/PostPage?accountId=${accountId}&blockHeight=${blockHeight}`;

const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");

const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

const Post = styled.div`
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 19px;
    top: 52px;
    bottom: 0;
    width: 2px;
    background: #ECEEF0;
  }
`;

const Header = styled.div`
  margin-bottom: 12px;
`;

const Body = styled.div`
  padding-left: 52px;
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
  margin: 0 -6px -6px;
`;

const Comments = styled.div``;

return (
  <Post>
    <Header>
      <Widget
        src="calebjacob.near/widget/AccountProfile"
        props={{
          accountId,
          inlineContent: (
            <>
              <Text as="span">･</Text>
              {blockHeight === "now" ? (
                "now"
              ) : (
                <Text>
                  <Widget
                    src="mob.near/widget/TimeAgo"
                    props={{ blockHeight }}
                  />{" "}
                  ago
                </Text>
              )}
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
              onClick: () =>
                !state.showReply && State.update({ showReply: true }),
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
            src="mob.near/widget/MainPage.Comment.Compose"
            props={{
              notifyAccountId,
              item,
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
      )}

      <Comments>
        <Widget
          src="mob.near/widget/MainPage.Comment.Feed"
          props={{
            item,
            highlightComment: props.highlightComment,
            limit: props.commentsLimit,
            subscribe,
            raw,
          }}
        />
      </Comments>
    </Body>
  </Post>
);
