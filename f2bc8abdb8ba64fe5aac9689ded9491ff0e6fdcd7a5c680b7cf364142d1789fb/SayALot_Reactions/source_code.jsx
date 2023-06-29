// Don't forget to put space between emoji and text -> "❤️ Positive"
const initialEmoji = "🤍 Like";
// It is important that 'Heart' Positive emoji is first
const emojiArray = [
  "❤️ Positive",
  "🙏 Thank you",
  "💯 Definitely",
  "👀 Thinking",
  "🔥 Awesome",
  "👍 Like",
  "🙌 Celebrate",
  "👏 Applause",
  "⚡ Lightning",
  "⋈ Bowtie",
];
const item = props.item;

const accountThatIsLoggedIn = context.accountId;

if (!item) {
  return "";
}

State.init({
  emoji: undefined,
  likesStatistics: [],
  show: false,
  loading: false,
});

// ========= UNFILTERED LIKES and SOCIAL.INDEX =========
const unfilteredLikes = Social.index("like", item, {
  order: "desc",
});

// ========= ARRAY LAST LIKE FOR EACH USER =========
// arrayLastLikeForEachUser - array of objects {accountId, blockHeight, value: {type: "😁 LOL"}}
const uniqueAccounts = [];
const arrayLastLikeForEachUser =
  unfilteredLikes &&
  unfilteredLikes.filter((obj) => {
    if (!uniqueAccounts.includes(obj.accountId)) {
      uniqueAccounts.push(obj.accountId);
      return true;
    }
    return false;
  });

// ========= GET USER EMOJI =========
const userEmoji = arrayLastLikeForEachUser.find((obj) => {
  return obj.accountId === accountThatIsLoggedIn;
});

// ========= GET LIKES STATISTICS =========
const getLikeStats = (acc, likeObj) => {
  if (likeObj.value.type === initialEmoji) {
    return acc;
  }
  if (!acc.hasOwnProperty(likeObj.value.type)) {
    acc[likeObj.value.type] = {
      quantity: 0,
      emoji: likeObj.value.type.slice(0, 2),
      text: likeObj.value.type.slice(2),
      accounts: [],
    };
    // acc[likeObj.value.type].quantity = 0;
    // acc[likeObj.value.type].emoji = likeObj.value.type.slice(0, 2);
    // acc[likeObj.value.type].accounts = [];
  }
  acc[likeObj.value.type].quantity += 1;
  acc[likeObj.value.type].accounts = [
    likeObj.accountId,
    ...acc[likeObj.value.type].accounts,
  ];

  return acc;
};
const countLikesStats = (arr) => Object.values(arr.reduce(getLikeStats, {}));
let likesStatistics =
  arrayLastLikeForEachUser && countLikesStats(arrayLastLikeForEachUser);
if (state.likesStatistics.length === 0 || state.likesStatistics === null) {
  State.update({
    likesStatistics,
  });
}
//likesStatistics - array of objects {emoji: '😁', quantity: 2, accounts: []}

// ========= CHECK DOES USER VOTED =========
const doesUserVoted = () => {
  const resObject = arrayLastLikeForEachUser.find(
    (item) => item.accountId === accountThatIsLoggedIn
  );
  return resObject;
};

// ========= UPDATE EMOJI STATE IF USER VOTED SOMETIME BEFORE =========
const updateEmojiIfUserVoted = () => {
  const resObject = arrayLastLikeForEachUser.find(
    (item) => item.accountId === accountThatIsLoggedIn
  );
  if (resObject) {
    State.update({ emoji: resObject.value.type });
  }
};
state.emoji === undefined &&
  arrayLastLikeForEachUser &&
  updateEmojiIfUserVoted();

// ========= UPDATE LIKE STATISTICS IF USER VOTED RIGHT NOW=========
const updateLikesStatisticsIfUserVoted = (newEmoji) => {
  const resObject = arrayLastLikeForEachUser.find(
    (item) => item.accountId === accountThatIsLoggedIn
  );
  if (!resObject) {
    arrayLastLikeForEachUser = [
      ...arrayLastLikeForEachUser,
      {
        accountId: accountThatIsLoggedIn,
        blockHeight: item.blockHeight,
        value: { type: newEmoji },
      },
    ];
  } else {
    arrayLastLikeForEachUser =
      arrayLastLikeForEachUser &&
      arrayLastLikeForEachUser.map((item) => {
        if (item.accountId === accountThatIsLoggedIn) {
          return { ...item, value: { type: newEmoji } };
        }
        return item;
      });
  }
  likesStatistics =
    arrayLastLikeForEachUser && countLikesStats(arrayLastLikeForEachUser);
  State.update({
    likesStatistics,
  });
};

// ================= Mouse Handlers ===============

const handleOnMouseEnter = (e) => {
  State.update({ show: true });
};

const handleOnMouseLeave = (e) => {
  State.update({ show: false });
};

const clickHandler = (emojiMessage) => {
  if (state.loading) {
    return;
  }
  State.update({
    loading: true,
  });

  // decide to put unique emoji or white heart (unlike emoji)
  const emojiToWrite =
    emojiMessage === initialEmoji && state.emoji === initialEmoji
      ? emojiArray[0]
      : emojiMessage;

  const data = {
    index: {
      like: JSON.stringify({
        key: item,
        value: {
          type: emojiToWrite,
        },
      }),
    },
  };

  Social.set(data, {
    onCommit: () => {
      updateLikesStatisticsIfUserVoted(emojiToWrite);
      State.update({ emoji: emojiToWrite, loading: false, show: false });
    },
    onCancel: () => State.update({ loading: false, show: false }),
  });
};

// =============== CSS Styles ===============
const Button = styled.button`
  min-width: fit-content;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: start;
  width: 8em;
  height: 2.5em;
  padding: 6px 12px;
  margin: 2px 0;
  border: 0;
  border-radius: .375rem;
  :hover {
    background: #EBEBEB; 
    outline: 1px solid #C6C7C8;
  }
`;

const SmallButton = styled.button`
position: relative;
  border: 0;
  background: transparent;
  width: 35px;
  height: 35px;
  color: ${({ isHeart }) => (isHeart ? "red" : "")};
`;

const SmallButtonSpan = styled.span`
  font-size: 19px;
  :hover{
      position: absolute;
      font-size: 35px;
      bottom: -5px;
      width: 35px;
      height: 40px;
      transform: translateX(-50%) translateY(-50%);
  }
  
  @media (max-width: 599px) {
      ::before { 
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, .4);
          content: "";}
      :hover{
      ::before { 
          position: absolute;
          width: 100%;
          height: 120%;
          background-color: rgba(255, 255, 255, .4);
          content: "";}
  }
      
  }
`;

// =============== NEW CSS Styles ===============!!!!!!!!
const EmojiWrapper = styled.div`
display: inline-block;
position: relative;
overflow: visible !important;
padding-left: 8px;
`;

const Reactions = styled.div`
  position: relative;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: start;
  width: 8em;
  height: 2.5em;
  padding: 6px 12px;
  margin: 2px 0;
  border: 0;
  border-radius: .375rem;
`;

const EmojiListWrapper = styled.div`
display: flex;
flex-wrap: wrap;
padding: 0.5rem;

background: white;
border-radius: 1rem;
box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15) !important;
@media (min-width: 600px) {
    display: ${({ show }) => (show ? "flex" : "none")};
    height: 3.2rem;
    flex-wrap: nowrap;
    position: absolute;
    transform: translateY(-10%);
    zIndex: 2;
  }
`;

const StatWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: visible !important;
  border-radius: ${({ isUserVote }) => (isUserVote ? "1rem" : "0")};
  background-color: ${({ isUserVote }) =>
    isUserVote ? "rgba(0, 191, 255, 0.3)" : "transparent"};
`;

const EmojiQty = styled.span`
  width: 1rem;
  padding-right: 8px;
`;

const AccountsListBigContainer = styled.div`
  position: absolute;
  overflow: hidden;
  bottom: 2rem;
  background-color: rgb(230, 230, 230);
  border-radius: 12px;
  max-width: 20rem;
`;

const AccountsListSmallContainer = styled.div`
  margin: 0.5rem;
  border-radius: 12px;
  overflow: hidden;
  padding: 10px;
  text-overflow: ellipsis;
  background-color: white;
  max-height: 20rem;
`;

const AccountContainer = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

// =============== NEW JSX ===============!!!!!!!!
const Overlay = () => (
  <EmojiListWrapper
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
    show={state.show}
  >
    {emojiArray &&
      emojiArray.map((item, index) => (
        <SmallButton onClick={() => clickHandler(item)} isHeart={index === 0}>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <div className="text-truncate text-start">{item.slice(2)}</div>
              </Tooltip>
            }
          >
            <SmallButtonSpan>{item.slice(0, 2)}</SmallButtonSpan>
          </OverlayTrigger>
        </SmallButton>
      ))}
  </EmojiListWrapper>
);

let maxAmountOfAccountsShown = 7;

const renderReactionListModal = (accounts, objText) => {
  let accountsa = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  ];

  return (
    <div className="modal" tabindex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{`All ${objText} reactions`}</h5>
            <button
              onClick={() => State.update({ showReactionsListModal: "" })}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {accountsa.map((acc) => {
              return <AccountContainer>{acc}</AccountContainer>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const renderReactionList = (accounts, objText) => {
  let accountsa = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  ];

  return (
    <AccountsListBigContainer
      onMouseLeave={() => State.update({ expandReactionList: "" })}
    >
      <AccountsListSmallContainer>
        {accountsa &&
          accountsa.map((acc, i) => {
            if (i < maxAmountOfAccountsShown - 1) {
              return <AccountContainer>{acc}</AccountContainer>;
            } else if (i == maxAmountOfAccountsShown) {
              return (
                <ShowMoreIndicator
                  onClick={() =>
                    State.update({ showReactionsListModal: objText })
                  }
                >{`And ${
                  accountsa.length - maxAmountOfAccountsShown
                } more`}</ShowMoreIndicator>
              );
            } else {
              return <></>;
            }
          })}
      </AccountsListSmallContainer>
    </AccountsListBigContainer>
  );
};

const Stats = () =>
  likesStatistics && likesStatistics.length ? (
    likesStatistics.map((obj) => {
      const userReaction = userEmoji ? userEmoji.value.type.slice(0, 2) : "";
      return (
        <div
          onMouseOver={() => State.update({ expandReactionList: obj.text })}
          onMouseLeave={() => State.update({ expandReactionList: "" })}
        >
          {state.expandReactionList == obj.text &&
            renderReactionList(obj.accounts, obj.text)}
          {state.showReactionsListModal == obj.text &&
            renderReactionListModal(obj.accounts, obj.text)}
          <StatWrapper
            title={`${obj.text}`}
            isUserVote={obj.emoji === userReaction}
          >
            <EmojiWrapper>{obj.emoji}</EmojiWrapper>
            <EmojiQty>{obj.quantity}</EmojiQty>
          </StatWrapper>
        </div>
      );
    })
  ) : (
    <></>
  );

const Spinner = () => {
  return (
    <div
      className="spinner-border text-secondary"
      style={{ height: "1rem", width: "1rem", marginTop: "2px" }}
      role="status"
    >
      <span className="sr-only" title="Loading..."></span>
    </div>
  );
};

return (
  <EmojiWrapper>
    <Button
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onClick={() => State.update({ expandReactionList: obj.text })}
    >
      {state.loading && <Spinner />}
      {!userEmoji ? initialEmoji : <Stats />}
    </Button>
    {!userEmoji ? (
      <Reactions>
        <Stats />
      </Reactions>
    ) : (
      <></>
    )}
    <Overlay />
  </EmojiWrapper>
);
