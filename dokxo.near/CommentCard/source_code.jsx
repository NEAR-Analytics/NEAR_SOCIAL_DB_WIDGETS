const ModalCard = styled.div`
width: 100%;
height: 100%;
z-index: 1;
background: rgba(0, 0, 0, 0.70);
padding-top: 25%;
padding-bottom: 25%;
 
@media only screen and (max-width: 480px) {
 
}
`;
const CommentCard = styled.div`
display: flex;
width: 400px;
padding: 20px;
flex-direction: column;
align-items: flex-start;
gap: 16px; 
border-radius: 10px;
background: #FFF;
border: 1px solid transparent;
 margin-left: auto;
    margin-right: auto;
    
    margin-buttom: 50%;
  
   
@media only screen and (max-width: 480px) {
 
}
`;
const CTitle = styled.div`
color: var(--000000, #000);
font-size: 14px;
font-family: Avenir;
font-style: normal;
font-weight: 500;
line-height: 120%;
@media only screen and (max-width: 480px) {
 
}
`;
const Ccontainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
gap: 20px;
align-self: stretch;
@media only screen and (max-width: 480px) {
 
}
`;
const CommentBody = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 16px;
align-self: stretch;
@media only screen and (max-width: 480px) {
 
}
`;
const BComment = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 8px;
align-self: stretch;
@media only screen and (max-width: 480px) {
 
}
`;
const BCommentmessage = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 8px;
align-self: stretch;
@media only screen and (max-width: 480px) {
 
}
`;
const BCMHeader = styled.div`
display: flex;
width: 326px;
align-items: center;
gap: 8px;
@media only screen and (max-width: 480px) {
 
}
`;
const BCMProfile = styled.div`
width: 20px;
height: 20px;
flex-shrink: 0;
flex-direction:row;
border-radius: 29px;
background: #D0D6D9;
text-align: center;
@media only screen and (max-width: 480px) {
 
}
`;
const BCMProfileimg = styled.img`
width: 12.5px;
height: 12.5px;
flex-shrink: 0;
vertical-align: initial;
@media only screen and (max-width: 480px) {
 
}
`;
const BCMProfileUsername = styled.label`
display: flex;
width: 228px;
flex-direction: column;
justify-content: center;
flex-shrink: 0;
color: #000;
font-size: 12px;
font-family: Avenir;
font-style: normal;
font-weight: 500;
line-height: 120%;
@media only screen and (max-width: 480px) {
 
}
`;
const BCMMessage = styled.div`
display: flex;
flex-direction: column;
align-self: stretch;
color: #828688;
font-size: 14px;
font-family: Avenir;
font-style: normal;
font-weight: 400;
line-height: 120%;
@media only screen and (max-width: 480px) {
 
}
`;
const BFooter = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 4px;
align-self: stretch;
`;
const BFootercont = styled.div`
display: flex;
align-items: center;
align-self: stretch;
`;
const BFootercontTime = styled.div`
display: flex;
align-items: center;
gap: 4px;
flex: 1 0 0;
`;
const BFCTimetext = styled.div`
display: flex;
height: 19.394px;
flex-direction: column;
justify-content: center;
flex: 1 0 0;
color: #000;
font-size: 10px;
font-family: Avenir;
font-style: normal;
font-weight: 300;
line-height: normal;
`;
const BFCButton = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
gap: 4px;
`;
const BFCButtonitem = styled.button`
display: flex;
padding: 2px 12px;
align-items: center;
gap: 6px;
border-radius: 4px;
 border-width: 1px;
border: solid 1px #9333EA;
 
 
  background-image: linear-gradient(#fff, #fff), radial-gradient(circle at top left,#F0E1CE, #F0E1CE);
  background-origin: border-box;
  background-clip: padding-box, border-box;
`;
const BFCBIText = styled.label`
font-size: 12px;
font-family: Avenir;
font-style: normal;
font-weight: 500;
line-height: 24px;
color: #9333EA;
cursor: pointer;
  
`;
const NewComment = styled.textarea`
display: flex;
height: 100px;
padding: 9px 10px 0px 10px;
align-items: flex-start;

gap: 10px;
align-self: stretch;
  border-radius: 8px;
    border: 1px solid #D0D6D9;
    background: #FFF;
    color: #828688;
font-size: 12px;
font-family: Avenir;
font-style: normal;
font-weight: 400;
line-height: 120%;
`;
const CommentFooter = styled.div`
display: flex;
flex-direction: row;
align-items: flex-end;
justify-content: end;
gap: 16px;
align-self: stretch;
@media only screen and (max-width: 480px) {
 
}
`;
const CFCancel = styled.button`
display: flex;
width: 107px;
padding: 8px 12px;
justify-content: center;
align-items: center;
gap: 10px;
color:#9333EA;
border-radius: 10px;
 border-width: 1px;
  border: solid 1px #9333EA;
 
 
  background-image: linear-gradient(#fff, #fff), radial-gradient(circle at top left,#F0E1CE, #F0E1CE);
  background-origin: border-box;
  background-clip: padding-box, border-box;
@media only screen and (max-width: 480px) {
 
}
`;

const CFSubmit = styled.button`
display: flex;
width: 107px;
padding: 8px 12px;
justify-content: center;
align-items: center;
gap: 10px;
color:#000;
display: flex;
width: 107px;
padding: 8px 12px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 10px;
 border-width: 1px;
  border: solid 1px transparent;
 
 
  background-image: linear-gradient(#FFD50D, #FFD50D), radial-gradient(circle at top left,#F0E1CE, #F0E1CE);
  background-origin: border-box;
  background-clip: padding-box, border-box;
@media only screen and (max-width: 480px) {
 
}
`;
const { username, profile_picture, originalComment, timeago, _share_url } =
  props;
// State
State.init({
  theme,
  reply: "",
  share_url: _share_url,
  cancel: false,
});

const Submit = () => {
  console.log(state);
};

return (
  <ModalCard>
    {" "}
    <CommentCard>
      <CTitle>Comment to reply</CTitle>
      <Ccontainer>
        <CommentBody>
          <BComment>
            <BCommentmessage>
              <BCMHeader>
                <BCMProfile>
                  <BCMProfileimg
                    alt="pic"
                    src={
                      profile_picture
                        ? profile_picture
                        : "https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmTKv1yHQKRDQcmc5Jkv2jkaTx2Q1jJE9srHEmyYPq53vJ?preview=1"
                    }
                  />
                </BCMProfile>
                <BCMProfileUsername>
                  {username ? username : "@user.near"}
                </BCMProfileUsername>
              </BCMHeader>
              <BCMMessage>
                {" "}
                {originalComment
                  ? originalComment
                  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integerquam enim, dignissim sed ante at, convallis maximus enim. Duis  condimentum aliquam nisl nec sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quam enim, dignissim  sed ante at, convallis maximus enim. Duis condimentum aliquam nisl nec sagittis."}
              </BCMMessage>
            </BCommentmessage>
          </BComment>
          <BFooter>
            <BFootercont>
              <BFootercontTime>
                <img
                  alt="schedule"
                  src={
                    "https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmP3uRUgZtqV3HAgcZoYaDA6JSPpFcpqULvgenWUs3ctSP"
                  }
                />
                <BFCTimetext> {timeago ? timeago : "2 hours ago"}</BFCTimetext>
              </BFootercontTime>
              <BFCButton>
                <OverlayTrigger
                  key={placement}
                  placement={placement}
                  overlay={
                    <Tooltip id={`tooltip-${placement}`}>
                      Copy to clipboard <strong>{placement}</strong>.
                    </Tooltip>
                  }
                >
                  <BFCButtonitem
                    onClick={() => {
                      clipboard.writeText(state.share_url);
                    }}
                  >
                    <BFCBIText>Share</BFCBIText>
                    <img
                      alt="share"
                      src={
                        "https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmdFMobsnCyj9USY2mHtLzhu58Mz6BFpMx7tKPQGoWmsHY?preview=1"
                      }
                    />
                  </BFCButtonitem>
                </OverlayTrigger>
              </BFCButton>
            </BFootercont>
          </BFooter>
        </CommentBody>
        <hr
          style={{
            width: "100%",
            height: "0px",
            border: "1px solid rgba(130, 134, 136, 0.20)",
            flex: "none",
            background: "rgba(130, 134, 136, 0.20)",
            margin: "0px",
            "flex-grow": "0",
          }}
        />
        <NewComment
          placeholder="Replay here"
          onChange={(e) => {
            State.update({ reply: e.target.value });
          }}
        />
        <CommentFooter>
          <CFCancel
            onClick={() => {
              State.update({ cancel: true });
            }}
          >
            Cancel
          </CFCancel>
          <CFSubmit
            onClick={() => {
              Submit();
            }}
          >
            Submit
          </CFSubmit>
        </CommentFooter>
      </Ccontainer>
    </CommentCard>
  </ModalCard>
);
