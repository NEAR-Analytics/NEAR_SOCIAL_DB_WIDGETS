const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const subscribe = !!props.subscribe;
const admins = props.admins || [];
const adminContract = props.adminContract;

if (accountId === undefined || blockHeight === undefined) {
  return;
}

State.init({ showAnswer: false, showOverlay: false });

const answer = JSON.parse(
  Social.get(`${accountId}/question/answer`, blockHeight) ?? "null"
);

const isUseful = Near.view(adminContract, "is_useful", {
  id: { account_id: accountId, block_height: blockHeight },
});

const item = {
  accountId,
  blockHeight,
};

const Post = styled.div`
  position: relative;
  display: grid;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 19px;
    top: 52px;
    bottom: 12px;
    width: 2px;
    background: ${isUseful ? "#30A46C" : "#eceef0"};
  }
`;
const Header = styled.div`
  margin-bottom: 0;
  display: inline-flex;
  justify-content: stretch;
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

const CorrectPost = styled.div`
  position: absolute;
  top: -0.7rem;
  left: -0.5rem;
  color: #30A46C;
`;

return (
  <Post>
    {isUseful && (
      <CorrectPost>
        <i class="bi bi-check-circle-fill" />
      </CorrectPost>
    )}
    <Header>
      <Widget
        src="dev-support.near/widget/AccountProfile"
        props={{
          accountId,
          blockHeight,
          includeValidButton: admins.includes(context.accountId),
          adminContract,
        }}
      />
    </Header>
    <Body>
      <Content className="mt-2">
        {answer.text && (
          <Widget
            src="near/widget/SocialMarkdown"
            props={{ text: answer.text }}
          />
        )}

        {answer.image && (
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: answer.image,
            }}
          />
        )}
      </Content>

      <Actions>
        <Widget
          src="near/widget/NestedDiscussions.Preview.LikeButton"
          props={{
            item: { accountId, blockHeight },
            notifyAccountId: accountId,
            previewWidget: "dev-support.near/widget/DevSupport.Answer",
          }}
        />
        <Widget
          src="near/widget/NestedDiscussions.Preview.CommentButton"
          props={{
            item,
            dbAction: "answer",
            onClick: () => State.update({ showReply: !state.showReply }),
          }}
        />
      </Actions>

      {state.showReply && (
        <div className="mb-2">
          <Widget
            src="edu.near/widget/edu.answer.edit"
            props={{
              notifyAccountId: accountId,
              item,
              previewWidget: "edu.near/widget/edu.answer",
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
      )}

      <Comments>
        <Widget
          src="edu.near/widget/edu.answer.feed"
          props={{ item, admins, adminContract, nested: true }}
        />
      </Comments>
    </Body>
  </Post>
);
