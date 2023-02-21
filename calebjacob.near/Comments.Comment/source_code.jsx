const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/comment`, blockHeight) ?? "null");
const parentItem = content.item;
const highlight = !!props.highlight;
const raw = !!props.raw;

const extractNotifyAccountId = (parentItem) => {
  if (!parentItem || parentItem.type !== "social" || !parentItem.path) {
    return undefined;
  }
  const accountId = parentItem.path.split("/")[0];
  return `${accountId}/post/main` === parentItem.path ? accountId : undefined;
};

const commentUrl = `/#/calebjacob.near/widget/PostPage?accountId=${accountId}&commentBlockHeight=${blockHeight}`;

const Post = styled.div`
  position: relative;
  background: ${props.highlight ? "#f00" : ""};

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
  display: inline-flex;
  margin-bottom: 12px;
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
  margin: 0 -6px 6px;
`;

return (
  <Post>
    <Header>
      <Widget
        src="calebjacob.near/widget/AccountProfile"
        props={{
          accountId,
          avatarSize: "32px",
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
              item: {
                type: "social",
                path: `${accountId}/post/comment`,
                blockHeight,
              },
              notifyAccountId,
            }}
          />
          <Widget
            src="calebjacob.near/widget/CommentButton"
            props={{
              hideCount: true,
              onClick: () => State.update({ showReply: !state.showReply }),
            }}
          />
          <Widget
            src="calebjacob.near/widget/CopyUrlButton"
            props={{
              url: commentUrl,
            }}
          />
        </Actions>
      )}

      {state.showReply && (
        <div className="mb-2">
          <Widget
            src="calebjacob.near/widget/Comments.Compose"
            props={{
              initialText: `@${accountId}, `,
              notifyAccountId: extractNotifyAccountId(parentItem),
              item: parentItem,
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
      )}
    </Body>
  </Post>
);

// return (
//   <>
//     <div
//       className={`pt-3 border-top pb-2 ${
//         highlight ? "bg-warning bg-opacity-10" : ""
//       }`}
//     >
//       <Widget
//         src="mob.near/widget/MainPage.Post.Header"
//         props={{ accountId, blockHeight, link, postType: "comment" }}
//       />
//       <div className="mt-2 text-break">
//         <Widget
//           src="mob.near/widget/MainPage.Post.Content"
//           props={{ content, raw }}
//         />
//       </div>
//       {blockHeight !== "now" && (
//         <div className="mt-1 d-flex justify-content-between">
//           <Widget
//             src="mob.near/widget/LikeButton"
//             props={{
//               notifyAccountId: accountId,
//   item: {
//     type: "social",
//     path: `${accountId}/post/comment`,
//     blockHeight,
//   },
//             }}
//           />
//           {parentItem && (
//             <Widget
//               src="mob.near/widget/CommentButton"
//               props={{
//                 onClick: () =>
//                   !state.showReply && State.update({ showReply: true }),
//               }}
//             />
//           )}
//         </div>
//       )}
//     </div>
//     {state.showReply && (
//       <div className="mb-2" key="reply">
//         <Widget
//           src="mob.near/widget/MainPage.Comment.Compose"
//           props={{
// initialText: `@${accountId}, `,
// notifyAccountId: extractNotifyAccountId(parentItem),
// item: parentItem,
// onComment: () => State.update({ showReply: false }),
//           }}
//         />
//       </div>
//     )}
//   </>
// );
