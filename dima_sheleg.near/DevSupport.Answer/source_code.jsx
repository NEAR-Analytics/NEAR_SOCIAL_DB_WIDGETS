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
  type: "social",
  path: `${accountId}/question/main`,
  blockHeight,
};

const handleValidAnswerClick = () => {
  Near.call(adminContract, "mark_useful", {
    id: { account_id: accountId, block_height: blockHeight },
    amount: "1",
  });
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
const Item = styled.div`
  padding: 0;
  .btn {
    &:hover,
    &:focus {
      background-color: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    &.valid-btn {
      i {
        color: #30A46C;
      }
    }
    span {
      font-weight: 500;
    }
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
        src="dmitriy_sheleg.near/widget/AccountProfile"
        props={{
          accountId,
          inlineContent: (
            <div class="d-flex align-items-center flex-fill">
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
              <div class="dropdown ms-auto">
                <button
                  class="btn border-0 p-0"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="bi bi-three-dots" />
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <Item className="dropdown-item">
                      <Widget
                        src="dima_sheleg.near/widget/DevSupport.Answer.Button.Valid"
                        props={{
                          accountId,
                          blockHeight,
                          admins,
                          adminContract,
                          onClick: handleValidAnswerClick,
                          text: "Mark as Correct",
                          className: "btn valid-btn",
                        }}
                      />
                    </Item>
                  </li>
                </ul>
              </div>
            </div>
          ),
        }}
      />
    </Header>
    <Body>
      <Content className="mt-2">
        {answer.text && (
          <Widget
            src="adminalpha.near/widget/SocialMarkdown"
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
        </Actions>
      )}

      {state.showReply && (
        <div className="mb-2">
          <Widget
            src="dima_sheleg.near/widget/DevSupport.Answer.Edit"
            props={{
              notifyAccountId: accountId,
              item,
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
      )}

      <Comments>
        <Widget
          src="dima_sheleg.near/widget/DevSupport.Answer.Feed"
          props={{ item, admins, adminContract, nested: true }}
        />
      </Comments>
    </Body>
  </Post>
);
