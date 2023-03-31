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

const is_useful = Near.view(adminContract, "is_useful", {
  id: { account_id: accountId, block_height: blockHeight },
});
const border = is_useful ? "border-success" : "border-black";

const item = {
  type: "social",
  path: `${accountId}/question/main`,
  blockHeight,
};

const handleOnMouseEnter = () => {
  State.update({ showOverlay: true });
};
const handleOnMouseLeave = () => {
  State.update({ showOverlay: false });
};
const handleValidAnswerClick = () => {
  Near.call(adminContract, "mark_useful", {
    id: { account_id: accountId, block_height: blockHeight },
    amount: "1",
  });
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
const Item = styled.div`
  .btn {

    &:hover,
    &:focus {
      background-color: #ECEDEE;
      text-decoration: none;
      outline: none;
    }
    i {
      color: #30A46C;
    }
    span {
      font-weight: 500;
    }
  }
`;

const overlay = (
  <div
    className="border m-3 p-3 rounded-4 bg-white shadow"
    style={{ maxWidth: "24em", zIndex: 1070 }}
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
  >
    <Item>
      <Widget
        src="dmitriy_sheleg.near/widget/DevSupport.Answer.Button.Valid"
        props={{
          accountId,
          blockHeight,
          admins,
          adminContract,
          onClick: handleValidAnswerClick,
          text: "Mark as Correct",
          className: "btn",
        }}
      />
    </Item>
  </div>
);

return (
  <Post>
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
              <OverlayTrigger
                show={state.showOverlay}
                trigger={["hover", "focus"]}
                delay={{ show: 250, hide: 300 }}
                placement="auto"
                overlay={overlay}
              >
                <span
                  className="ms-auto"
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                >
                  <i class="bi bi-three-dots" />
                </span>
              </OverlayTrigger>
            </div>
          ),
        }}
      />
    </Header>
    <Body>
      <Content>
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
            src="dmitriy_sheleg.near/widget/DevSupport.Answer.Edit"
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
          src="dmitriy_sheleg.near/widget/DevSupport.Answer.Feed"
          props={{ item, admins, adminContract, nested: true }}
        />
      </Comments>
    </Body>
  </Post>
);
