const Card = styled.div`
display: flex;
flex-direction:column;
width: 358px;
height: 391px;
background: #F8F8F9;
border-radius: 10px;
 
`;
const NominationCard = styled.div`
 
 
width: 326px;
height: 328px;

margin-left:auto;
margin-right:auto;
background: #FFFFFF;
border-radius: 10px;

`;

const NominationTitle = styled.div`
 /* Auto layout */

display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;
  

width: 294px;
height: 50px;
margin-left:16px;
margin-top:16px;
margin-right:16px;

`;

const H1styled = styled.h1`

width: 86px;
height: 19px;
margin-left:16px;
margin-top:16px;
margin-bottom:12px;
font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 120%;
/* or 19px */


/* #000000 */

color: #000000;
`;
const ProfileImgStyled = styled.img`
 
width: 32px;
height: 32px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
 
  `;

const NominationName = styled.div`
 /* Auto layout */

display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 194px;
height: 50px;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 1;

 
  `;

const NominationHouse = styled.div`
    box-sizing: border-box;

/* Auto layout */

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 4px 8px;
gap: 10px;

width: 60px;
height: 15px;

background: linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%);
border-radius: 100px;

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
 
`;
const NominationHouse_text = styled.div`
   box-sizing: border-box;


width: 44px;
height: 7px;

font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 6px;
line-height: 120%;
/* or 7px */

display: flex;
align-items: center;

/* Gradient/Purple gradient */

background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
 
`;
const NominationName_Name = styled.div`
    /* Auto layout */

display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 228px;
height: 31px;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
 
`;
const NominationName_Name_text = styled.p`
width: 228px;
height: 17px;

font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 14px;
 
/* identical to box height, or 17px */

display: flex;
align-items: center;
margin:0px;
color: #000000;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
 
`;
const NominationName_Name_tag = styled.p`
 width: 228px;
height: 14px;

font-family: 'Avenir';
font-style: normal;
font-weight: 400;
font-size: 12px;
 
/* or 14px */

display: flex;
align-items: center;
margin:0px;
color: #828688;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
 
`;
const Upvote = styled.div`
/* Auto layout */

display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 0px;
gap: 6px;

width: 44px;
height: 22px;


/* Inside auto layout */

flex: none;
order: 2;
flex-grow: 0;
`;
const UpvoteImgStyled = styled.img`
 

 
  `;
const NominationBody = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;
margin-top:12px;
margin-left:auto;
margin-right:auto;

width: 294px;
height: 170px;


`;
const Plattform = styled.div`
  display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 294px;
height: 58px;


/* Inside auto layout */

flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;

`;
const Plattform_title = styled.h3`
width: 326px;
height: 14px;

font-family: 'Avenir';
font-style: normal;
font-weight: 800;
font-size: 12px;
line-height: 120%;
/* or 14px */
margin:0px;

color: #000000;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;

`;
const Plattform_text = styled.p`
width: 294px;
height: 42px;
margin:0px;
font-family: 'Avenir';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 120%;
/* or 14px */


color: #828688;


/* Inside auto layout */

flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;

`;

const TimePeriod = styled.div`
  display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 294px;
height: 58px;


/* Inside auto layout */

flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;

`;
const TimePeriod_title = styled.h3`
width: 326px;
height: 14px;

font-family: 'Avenir';
font-style: normal;
font-weight: 800;
font-size: 12px;
line-height: 120%;
/* or 14px */
margin:0px;

color: #000000;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;

`;
const TimePeriod_text = styled.p`
width: 294px;
height: 42px;
margin:0px;
font-family: 'Avenir';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 120%;
/* or 14px */


color: #828688;


/* Inside auto layout */

flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;

`;
const NominationFooter = styled.div`
  
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

 
width: 294px;
height: 44px;
margin-top:12px;
margin-left:auto;
margin-right:auto;

`;
const TagSection = styled.div`
  
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 206px;
height: 18px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;
const TagItem = styled.div`
 display: flex;
flex-direction: row;
align-items: flex-start;
padding: 2px 7px;
gap: 10px;

width: 66px;
height: 18px;

background: #F19D38;
border-radius: 4px;

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;
const TagItemText = styled.div`
width: 52px;
height: 14px;

font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 14px;
/* identical to box height */

display: flex;
align-items: center;

color: #FFFFFF;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

const ButtonSection = styled.div`
 display: flex;
flex-direction: row;
align-items: flex-end;
padding: 0px;

width: 294px;
height: 22px;


/* Inside auto layout */

flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
`;
const TimeAgo = styled.div`
 display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

width: 204px;
height: 19.39px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 1;
`;
const TimeAgoIcon = styled.img`
 width: 12px;
height: 12px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;
const TimeAgoText = styled.p`
 width: 188px;
height: 19.39px;

font-family: 'Avenir';
font-style: italic;
font-weight: 300;
font-size: 10px;
line-height: 14px;
display: flex;
align-items: center;

color: #000000;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 1;
`;
const Buttons = styled.div`
/* Auto layout */

display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

width: 90px;
height: 22px;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`;
const ButtonsItems = styled.img`
width: 22px;
height: 22px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;
return (
  <Card name="previewcard">
    <H1styled>Nomination</H1styled>

    <NominationCard>
      <NominationTitle>
        <ProfileImgStyled
          alt="pic"
          src={`https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmSvFXCFoR89xvnJKRER2DWEAqRhxtC6DxhyCrzdbP8g41?preview=1&_gl=1*ppkzv7*rs_ga*YTcxZDg1OTgtZTYyOC00M2U2LWE4MTctNzUzMDRkMjA3ZWVl*rs_ga_5RMPXG14TE*MTY4Njc4NDA5Ni41LjAuMTY4Njc4NDA5Ni42MC4wLjA.`}
        ></ProfileImgStyled>
        <NominationName>
          <NominationHouse>
            <NominationHouse_text>House intended</NominationHouse_text>
          </NominationHouse>
          <NominationName_Name>
            <NominationName_Name_text>Nomination Name</NominationName_Name_text>
            <NominationName_Name_tag>@user.name"</NominationName_Name_tag>
          </NominationName_Name>
        </NominationName>
        <Upvote>
          <UpvoteImgStyled
            alt="pic"
            src={`https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmdB3CFm8wDyhM6EajXTTH7ZHJjjmGCeaDySUAdsRkbtFb?preview=1&_gl=1*7yu692*rs_ga*YTcxZDg1OTgtZTYyOC00M2U2LWE4MTctNzUzMDRkMjA3ZWVl*rs_ga_5RMPXG14TE*MTY4Njc4NDA5Ni41LjEuMTY4Njc4NDE5OS42MC4wLjA.`}
          ></UpvoteImgStyled>
          <p>60</p>
        </Upvote>
      </NominationTitle>
      <NominationBody>
        <Plattform>
          <Plattform_title>Plattform</Plattform_title>
          <Plattform_text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            quam enim, dignissim sed ante at, convallis maximus enim. Duis
            aliquam...
            <a className="text-underline-position: under; color:#000000">
              {" "}
              See more
            </a>
          </Plattform_text>
        </Plattform>
        <Plattform>
          <Plattform_title>Afiliations</Plattform_title>
          <Plattform_text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            quam enim, dignissim sed ante at, convallis maximus enim. Duis
            aliquam...
            <a className="text-underline-position: under; color:#000000">
              {" "}
              See more
            </a>
          </Plattform_text>
        </Plattform>
        <TimePeriod>
          <TimePeriod_title>Time period</TimePeriod_title>
          <TimePeriod_text>00:00 to 00:00 </TimePeriod_text>
        </TimePeriod>
      </NominationBody>
      <NominationFooter>
        <TagSection>
          <TagItem>
            <TagItemText>#ThisIsATag</TagItemText>
          </TagItem>
          <TagItem>
            <TagItemText>#ThisIsATag</TagItemText>
          </TagItem>
          <TagItem>
            <TagItemText>#ThisIsATag</TagItemText>
          </TagItem>
        </TagSection>
        <ButtonSection>
          <TimeAgo>
            <TimeAgoIcon
              alt="clock"
              src={`https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmP3uRUgZtqV3HAgcZoYaDA6JSPpFcpqULvgenWUs3ctSP?preview=1&_gl=1*1roqun2*rs_ga*YTcxZDg1OTgtZTYyOC00M2U2LWE4MTctNzUzMDRkMjA3ZWVl*rs_ga_5RMPXG14TE*MTY4Njc4OTIzNy42LjEuMTY4Njc5MDQxMy43LjAuMA..`}
            />
            <TimeAgoText>2 hours ago by user.near</TimeAgoText>
          </TimeAgo>
          <Buttons>
            <ButtonsItems
              alt="happy"
              src={`https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmVH8S8LuEwRh9y4WcXPRbFUMyYSX2qJNhVm95v7JV5CTZ?_gl=1*1no7p6u*rs_ga*YTcxZDg1OTgtZTYyOC00M2U2LWE4MTctNzUzMDRkMjA3ZWVl*rs_ga_5RMPXG14TE*MTY4Njc4OTIzNy42LjEuMTY4Njc5MDg1NC41Mi4wLjA.`}
            ></ButtonsItems>
            <ButtonsItems
              alt="reply"
              src={`https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmQR4LU5NGVGFqkSfHpyAMQrEG1T65LueMhNwb9NN3UJds?_gl=1*1l7jb2r*rs_ga*YTcxZDg1OTgtZTYyOC00M2U2LWE4MTctNzUzMDRkMjA3ZWVl*rs_ga_5RMPXG14TE*MTY4Njc4OTIzNy42LjEuMTY4Njc5MDc3Ni42MC4wLjA.`}
            ></ButtonsItems>
            <ButtonsItems
              alt="share"
              src={`https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmZWp66XzL6NPw4dMC1rn72JQ8BC2id3u224NUXV1nECc3`}
            ></ButtonsItems>
          </Buttons>
        </ButtonSection>
      </NominationFooter>
    </NominationCard>
  </Card>
);
