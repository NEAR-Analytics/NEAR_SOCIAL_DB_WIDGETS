const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const subscribe = !!props.subscribe;
const admins = props.admins || [];
const adminContract = props.adminContract;

if (accountId === undefined || blockHeight === undefined) {
  return;
}

State.init({ showAnswer: false });

const answer = JSON.parse(
  Social.get(`${accountId}/question/answer`, blockHeight) ?? "null"
);

const is_useful = Near.view(adminContract, "is_useful", {
  id: { account_id: accountId, block_height: blockHeight },
});
const border = is_useful ? "border-success" : "border-black";

const item = {
  type: "social",
  path: `${accountId}/question/main`,
  blockHeight,
};

const Post = styled.div`
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 19px;
    top: 52px;
    bottom: 12px;
    width: 2px;
    background: #eceef0;
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

return (
  <Post>
    <Header>
      <Widget
        src="adminalpha.near/widget/AccountProfile"
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
            src="adminalpha.near/widget/SocialMarkdown"
            props={{ text: answer.text }}
          />
        )}

        {content.image && (
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: answer.image,
            }}
          />
        )}
      </Content>

      {blockHeight !== "now" && (
        <Actions>
          <Widget
            src="adminalpha.near/widget/LikeButton"
            props={{
              item,
              accountId,
            }}
          />
          <Widget
            src="adminalpha.near/widget/CommentButton"
            props={{
              item,
              onClick: () => State.update({ showReply: !state.showReply }),
            }}
          />
          {/*
          <Widget
            src="adminalpha.near/widget/CopyUrlButton"
            props={{
              url: postUrl,
            }}
          />
          */}
        </Actions>
      )}

      {state.showReply && (
        <div className="mb-2">
          <Widget
            src="adminalpha.near/widget/Comments.Compose"
            props={{
              accountId,
              item,
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
      )}

      <Comments>
        <Widget
          src="adminalpha.near/widget/Comments.Feed"
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
  /*
    <>
      <div className={`border ${border} mt-3 p-3`}>
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId, tooltip: false }}
        />
        <hr />

        <div class="mt-3">
          <Widget
            src="mob.near/widget/MainPage.Post.Content"
            props={{ content: { text: answer.text } }}
          />
        </div>

        <button
          class="btn btn-success"
          onClick={() => {
            State.update({ showAnswer: !state.showAnswer });
          }}
        >
          Comment
        </button>

        <Widget
          src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Answer.Button.Valid"
          props={{ accountId, blockHeight, admins, adminContract }}
        />

        {state.showAnswer && (
          <Widget
            src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Answer.Edit"
            props={{
              notifyAccountId: accountId,
              item,
              onComment: () => State.update({ showReply: false }),
            }}
          />
        )}

        <Widget
          src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Answer.Feed"
          props={{ item, admins, adminContract, nested: true }}
        />
      </div>
    </>

  */
);
