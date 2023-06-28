const CommentCard = styled.div`
display: flex;
padding: 14px 16px;
flex-direction: column;
align-items: flex-start;
gap: 12px;
border-radius: 10px;
background: #FFF;
`;

const CommentCardHeader = styled.div`
display: flex;
width: 294px;
align-items: center;
justify-content: space-between;
gap: 8px;
`;

const CommentUserContent = styled.div`
display: flex;
align-items: center;
gap: 8px;
`;

const ProfileImageComment = styled.img`
width: 20px;
height: 20px;
flex-shrink: 0;
`;

const CommentUser = styled.p`
color: #000;
font-size: 12px;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
margin: 0px;
`;

const ReplyCounterDiv = styled.div`
display: flex;
align-items: center;
gap: 4px;
`;

const ReplyIconPurple = styled.img`
width: 14px;
height: 14px;
`;

const ReplyCounterText = styled.p`
color: #000;
font-size: 10px;
font-family: Avenir;
font-weight: 500;
margin: 0px;
`;

const CommentCardContent = styled.p`
color: #828688;
font-size: 12px;
font-family: Avenir;
line-height: 120%;
display: flex;
width: 294px;
flex-direction: column;
margin: 0px;
`;

const CommentCardLowerSection = styled.div`
display: flex;
width: 294px;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 4px;
`;

const TimestampCommentDiv = styled.div`
display: flex;
align-items: center;
gap: 4px;
flex: 1 0 0;
`;

const TimestampIconComment = styled.img`
width: 12px;
height: 12px;
`;

const TimestampTextComment = styled.p`
color: #000;
font-size: 10px;
font-family: Avenir;
font-weight: 300;
margin: 0px;
`;

const CommentButtonDiv = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
gap: 4px;
`;

const DeleteCommentButton = styled.button`
display: flex;
width: 28px;
padding: 2px 12px;
justify-content: center;
align-items: center;
gap: 6px;
align-self: stretch;
border-radius: 4px;
border: 1px solid #C23F38;
background: #F1D6D5;
`;

const DeleteCommentIcon = styled.img`
width: 14px;
height: 14px;
flex-shrink: 0;
`;

const ShareCommentButton = styled.button`
display: flex;
width: 28px;
height: 28px;
padding: 2px 12px;
justify-content: center;
align-items: center;
gap: 6px;
border-radius: 4px;
border: solid 1px transparent;
background-image: linear-gradient(white, white), radial-gradient(circle at top left, #9333EA 0%,#4F46E5 100%);
background-origin: border-box;
background-clip: padding-box, border-box;
`;

const ShareCommentIcon = styled.img`
width: 14px;
height: 14px;
flex-shrink: 0;
`;

const ReplyCommentButton = styled.div`
display: flex;
padding: 2px 12px;
align-items: center;
gap: 6px;
align-self: stretch;
border-radius: 4px;
background: var(--buttons-yellow-default, #FFD50D);
`;

const ReplyCommentText = styled.p`
color: var(--primary-black, #000);
font-size: 12px;
font-family: Avenir;
font-weight: 500;
line-height: 24px;
margin: 0px;
`;

const ReplyCommentIcon = styled.img`
width: 14px;
height: 14px;
`;

const CommentReplySeparator = styled.hr`
width: 294px;
height: 0px;
margin: 16px 0 16px 0;

border: 1px solid rgba(208, 214, 217, 1);
`;

const ReplyContainer = styled.div`
display: flex;
width: 260px;
flex-direction: column;
align-items: flex-start;
gap: 12px;
margin: 0 0 0 35px
`;

const ReplyHeader = styled.div`
display: flex;
align-items: center;
gap: 8px;
align-self: stretch;
`;

const ReplyContent = styled.p`
color: #828688;
font-size: 12px;
font-family: Avenir;
line-height: 120%;
margin: 0px;
`;

const ReplyLowerSection = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 4px;
align-self: stretch;
`;

const ReplyButtonSection = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
gap: 4px;
`;

const DeleteReplyButton = styled.button`
display: flex;
padding: 2px 12px;
align-items: center;
gap: 6px;
align-self: stretch;
border-radius: 4px;
border: 1px solid #C23F38;
background: #F1D6D5;
`;

const DeleteReplyText = styled.p`
color: #C23F38;
font-size: 12px;
font-family: Avenir;
font-weight: 500;
line-height: 24px;
margin: 0px;
`;

return (
  <CommentCard>
    <CommentCardHeader>
      <CommentUserContent>
        <ProfileImageComment
          src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmZBPPMKLdZG2zVpYaf9rcbtNfAp7c3BtsvzxzBb9pNihm?_gl=1*6avmrp*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzMzM2NC4zLjEuMTY4NjkzMzM4Ni4zOC4wLjA."
          alt="pic"
        ></ProfileImageComment>
        <CommentUser>@[deleted]</CommentUser>
      </CommentUserContent>
      <ReplyCounterDiv>
        <ReplyIconPurple
          src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmQ2XjRy2zRU86H4km9qihm6VRZiFGPGjocTofURoxg8Uv?_gl=1*3eysmk*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4NzkwMzU0NS40LjAuMTY4NzkwMzU0NS42MC4wLjA."
          alt="pic"
        ></ReplyIconPurple>
        <ReplyCounterText>1 reply</ReplyCounterText>
      </ReplyCounterDiv>
    </CommentCardHeader>
    <CommentCardContent>This comment is deleted</CommentCardContent>
    <CommentCardLowerSection>
      <TimestampCommentDiv>
        <TimestampIconComment
          src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmTvukihn95FGcAG9DCX6VuHzwRguHtynrKnaqEJczDg6V?_gl=1*mha71r*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4Nzg5NzQ3OS4yLjEuMTY4Nzg5OTA1MS42MC4wLjA."
          alt="pic"
        ></TimestampIconComment>
        <TimestampTextComment>2 hours ago</TimestampTextComment>
      </TimestampCommentDiv>
      <CommentButtonDiv>
        <DeleteCommentButton>
          <DeleteCommentIcon
            src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/Qma7DF8kyoGN4Mf3Yty5uoP64RpZewCsZFawae4Ux4wBBF?_gl=1*1bheqbv*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4NzkwMTAwNy4zLjAuMTY4NzkwMTAwNy42MC4wLjA."
            alt="pic"
          ></DeleteCommentIcon>
        </DeleteCommentButton>
        <ShareCommentButton>
          <ShareCommentIcon
            src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmX8CfMjpndJzmyRfRtLKrfKKV6vi186Tj1mkhqqLdr7yd?_gl=1*5rd8dj*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4NzkwMTAwNy4zLjEuMTY4NzkwMTIxNC42MC4wLjA."
            alt="pic"
          ></ShareCommentIcon>
        </ShareCommentButton>
        <ReplyCommentButton>
          <ReplyCommentText>Reply</ReplyCommentText>
          <ReplyCommentIcon
            src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/Qma6cnsU1NdHPcMbJqmXrUepxbvPuVLEBWzX4jEsaVhaN8?_gl=1*c3nexg*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4NzkwMTAwNy4zLjEuMTY4NzkwMTUzMS42MC4wLjA."
            alt="pic"
          ></ReplyCommentIcon>
        </ReplyCommentButton>
      </CommentButtonDiv>
    </CommentCardLowerSection>
    <div>
      <CommentReplySeparator></CommentReplySeparator>
      <ReplyContainer>
        <ReplyHeader>
          <ProfileImageComment
            src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmZBPPMKLdZG2zVpYaf9rcbtNfAp7c3BtsvzxzBb9pNihm?_gl=1*6avmrp*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzMzM2NC4zLjEuMTY4NjkzMzM4Ni4zOC4wLjA."
            alt="pic"
          ></ProfileImageComment>
          <CommentUser>user.near</CommentUser>
        </ReplyHeader>
        <ReplyContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quam
          enim, dignissim sed ante at, convallis maximus enim. Duis condimentum
          aliquam nisl nec sagittis. Ut tristique facilisis... See more
        </ReplyContent>
        <ReplyLowerSection>
          <TimestampCommentDiv>
            <TimestampIconComment
              src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmTvukihn95FGcAG9DCX6VuHzwRguHtynrKnaqEJczDg6V?_gl=1*mha71r*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4Nzg5NzQ3OS4yLjEuMTY4Nzg5OTA1MS42MC4wLjA."
              alt="pic"
            ></TimestampIconComment>
            <TimestampTextComment>2 hours ago</TimestampTextComment>
          </TimestampCommentDiv>
          <ReplyButtonSection>
            <ShareCommentButton>
              <ShareCommentIcon
                src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmX8CfMjpndJzmyRfRtLKrfKKV6vi186Tj1mkhqqLdr7yd?_gl=1*5rd8dj*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4NzkwMTAwNy4zLjEuMTY4NzkwMTIxNC42MC4wLjA."
                alt="pic"
              ></ShareCommentIcon>
            </ShareCommentButton>
            <DeleteReplyButton>
              <DeleteReplyText>Delete</DeleteReplyText>
              <DeleteCommentIcon
                src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/Qma7DF8kyoGN4Mf3Yty5uoP64RpZewCsZFawae4Ux4wBBF?_gl=1*1bheqbv*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4NzkwMTAwNy4zLjAuMTY4NzkwMTAwNy42MC4wLjA."
                alt="pic"
              ></DeleteCommentIcon>
            </DeleteReplyButton>
          </ReplyButtonSection>
        </ReplyLowerSection>
      </ReplyContainer>
    </div>
  </CommentCard>
);
