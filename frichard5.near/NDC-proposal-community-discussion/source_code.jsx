const { widgetProvider, proposal_id, displayComments } = props;

State.init({
  showReply: false,
});

const item = {
  type: "sputnik_proposal_comment",
  path: `${context.accountId}/proposal/main`,
  proposal_id,
};

const Actions = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Comments = styled.div`
  > div > div:first-child {
    padding-top: 12px;
  }
`;

return (
  <>
    {props.displayComments ? (
      <div>
        <Actions>
          <Widget
            src="near/widget/CommentButton"
            props={{
              item,
              onClick: () => State.update({ showReply: !state.showReply }),
            }}
          />
        </Actions>
        {state.showReply && (
          <div className="mb-2">
            <Widget
              src="near/widget/Comments.Compose"
              props={{
                //notifyAccountId,
                item,
                onComment: () => State.update({ showReply: false }),
              }}
            />
          </div>
        )}
        <Comments>
          <Widget
            src="near/widget/Comments.Feed"
            props={{
              item,
              subscribe: true,
            }}
          />
        </Comments>
      </div>
    ) : (
      ""
    )}
  </>
);
