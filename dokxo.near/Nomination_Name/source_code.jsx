const ToVote = styled.div`
width: 505px;
height: 177px;
flex-shrink: 0;
border-radius: 8px;
background: #F8F8F9;
@media only screen and (max-width: 480px) {
 width: 358px;
 background: transparent;
}
`;
const ToVotebody = styled.div`
display: inline-flex;
align-items: center;
gap: 20px;
padding-left:20px;
padding-top:20px;
@media only screen and (max-width: 480px) {
 
display: flex;
width: 326px;

gap: 12px;
 
}
`;

const LikeButtonContainer = styled.button`

display: inline-flex;
padding: 8px 12px;
align-items: center;
gap: 6px;
border-radius: 10px;
border-width: 1px;
border: solid 1px transparent;
 
 
  background-image: linear-gradient(#F8F8F9, #F8F8F9), radial-gradient(circle at top left,#9333EA, #4F46E5);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  @media only screen and (max-width: 480px) {
 
padding: 2px 12px;
border-radius: 4px;
 
}
`;
const LikeButtonText = styled.div`
font-size: 14px;
font-family: Avenir;
font-weight: 500;
line-height: 24px;
color:rgba(79, 70, 229, .8)  ;
background:transparent;
  @media only screen and (max-width: 480px) {
 
font-size: 12px;

 
}
`;
const LikeButtonIcon = styled.img`
width: 18px;
height: 18px;
  @media only screen and (max-width: 480px) {
width: 14px;
height: 14px;
 
}
`;

const DivImgConteiner = styled.div`
width: 140px;
height: 140px;
display: inline-flex;
align-items: center;
gap: 20px;
border-radius: 20px;
background: #D9D9D9;
@media only screen and (max-width: 480px) {
width: 40px;
height:40px;
}
`;
const ImgConteiner = styled.img`
width: 140px;
height: 140px;
display: inline-flex;
align-items: center;
gap: 20px;
border-radius: 20px;
background: #D9D9D9;
@media only screen and (max-width: 480px) {
width: 40px;
height:40px;
}
`;
const Profilecontainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 12px;
`;
const Tags = styled.button`
display: flex;
padding: 6px 16px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 100px;
border-width: 1px;
border-color:  rgba(79, 70, 229, .8)  ;
background: linear-gradient(90deg, rgba(147, 51, 234, 0.10) 0%, rgba(79, 70, 229, 0.10) 100%);
@media only screen and (max-width: 480px) {
 
padding: 4px 8px;
 
}
`;
const TagsText = styled.label`
font-size: 12px;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
color:  rgba(79, 70, 229, 0.90);
@media only screen and (max-width: 480px) {
font-size: 8px;
 
}

`;
const NameContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 4px;
 
@media only screen and (max-width: 480px) {
 

}
`;
const NameTitle = styled.label`
display: flex;
align-items: flex-start;
gap: 4px;
color: var(--000000, #000);
font-size: 24px;
font-family: Avenir;
font-weight: 500;
line-height: 120%;

width:300px;
 
@media only screen and (max-width: 480px) {
 
font-size: 14px;
 
}
`;
const User = styled.label`
display: flex;
align-items: flex-start;
gap: 4px;
color: var(--828688, #828688);
font-size: 16px;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
@media only screen and (max-width: 480px) {
 
font-size: 12px;
 
}
`;
const SecondtagsContainer = styled.div`
display: flex;
width: 294px;
align-items: center;
gap: 12px;
overflow: auto;
@media only screen and (max-width: 480px) {
 
display:none;
 
}
`;
const SecondtagsItem = styled.button`
display: flex;
height: 20px;
padding: 4px 8px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 100px;
border-width: 1px;
border-color:  rgba(79, 70, 229, .8)  ;
background: linear-gradient(90deg, rgba(147, 51, 234, 0.10) 0%, rgba(79, 70, 229, 0.10) 100%);
`;
const Secondtagstext = styled.label`
font-size: 10px;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
 
color:  rgba(79, 70, 229, 0.90) ;
`;
const {
  house_intend,
  nominationName,
  username,
  tags,
  profileimg,
  likes_number,
} = props;
return (
  <ToVote>
    <ToVotebody>
      {profileimg != null ? (
        <ImgConteiner alt="profile pic" src={profileimg}></ImgConteiner>
      ) : (
        <DivImgConteiner></DivImgConteiner>
      )}

      <div class="row">
        <div class="col-8">
          <Profilecontainer>
            <Tags>
              <TagsText>
                {house_intend ? house_intend : "House intend"}
              </TagsText>
            </Tags>
            <NameContainer>
              <NameTitle>
                {" "}
                {nominationName ? nominationName : " Nomination Name "}
              </NameTitle>
              <User>{username ? username : "@username.near"}</User>
            </NameContainer>
            <SecondtagsContainer>
              {tags ? (
                tags.map((tag, index) => {
                  {
                    console.log(tag);
                  }
                  return (
                    <SecondtagsItem>
                      <Secondtagstext>{tag}</Secondtagstext>
                    </SecondtagsItem>
                  );
                })
              ) : (
                <></>
              )}
            </SecondtagsContainer>
          </Profilecontainer>
        </div>
        <div class="col-4">
          {" "}
          <LikeButtonContainer>
            <LikeButtonText>+{likes_number ? likes_number : 0}</LikeButtonText>
            <LikeButtonIcon
              src={
                "https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmW1DoHBr8aUgyqbQjc5r5mVoQyu46mxbivkUjCaT1ibyA?_gl=1*1was31a*_ga*NTIwNjIxMzEyLjE2ODc4MTYwMTE.*_ga_5RMPXG14TE*MTY4NzkwNDA4OC4yLjEuMTY4NzkwNDEyMy4yNS4wLjA."
              }
            />
          </LikeButtonContainer>
        </div>
      </div>
    </ToVotebody>
  </ToVote>
);
