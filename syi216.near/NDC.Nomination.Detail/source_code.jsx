const DetailContent = styled.div`
display: inline-flex;
flex-direction: column;
align-items: flex-start;
gap: 12px;
`;
const DetailCard = styled.div`
display: flex;
width: 358px;
padding: 16px;
flex-direction: column;
align-items: flex-start;
gap: 16px;
border-radius: 10px;
background: #F8F8F9;
`;

const DetailHeader = styled.div`
display: flex;
width: 326px;
align-items: center;
gap: 12px;
`;

const ProfilePicture = styled.img`
width: 40px;
height: 40px;
flex-shrink: 0;
`;

const HeaderDetailContent = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 4px;
flex: 1 0 0;
`;

const TagContainer = styled.div`
display: flex;
align-items: flex-start;
gap: 4px;
`;

const HouseTagDiv = styled.div`
display: flex;
padding: 4px 8px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 100px;
background: var(--gradient-purple-gradient, linear-gradient(90deg, #9333EA 0%, #4F46E5 100%));
`;

const HouseTagText = styled.p`
color: #FFF;
font-size: 8px;
font-family: Avenir;
margin:0px;
font-weight: 500;
line-height: 120%;
`;

const TagDiv = styled.div`
display: flex;
padding: 4px 8px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 100px;
background: linear-gradient(90deg, rgba(147, 51, 234, 0.10) 0%, rgba(79, 70, 229, 0.10) 100%);
`;

const TagDivText = styled.p`
font-size: 8px;
font-family: Avenir;
margin: 0px;
font-weight: 500;
line-height: 120%;
background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
`;

const NominationTitleContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
`;

const NominationTitle = styled.p`
display: flex;
flex-direction: column;
justify-content: center;
margin: 0px;
color: #000;
font-size: 14px;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
`;

const NominationUser = styled.p`
display: flex;
flex-direction: column;
justify-content: center;
color: #828688;
margin:0px;
font-size: 12px;
font-family: Avenir;
line-height: 120%;
`;

const UpvoteButton = styled.button`
display: flex;
padding: 2px 12px;
align-items: center;
gap: 6px;
border-radius: 4px;
`;

const UpvoteCount = styled.p`
font-size: 12px;
font-family: Avenir;
font-weight: 500;
line-height: 24px;
margin: 0px;
`;

const UpvoteIcon = styled.img`
width: 14px;
height: 14px;
`;

const PlatformCard = styled.div`
display: flex;
width: 326px;
padding: 8px 12px;
align-items: flex-start;
gap: 12px;
border-radius: 6px;
background: #FFF;
`;

const PlatformContent = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 12px;
`;

const PlatformHeaderDiv = styled.div`
display: flex;
width: 302px;
align-items: flex-start;
gap: 12px;
`;

const PlatformHeaderText = styled.p`
display: flex;
flex-direction: column;
flex: 1 0 0;
color: #000;
font-size: 12px;
font-family: Avenir;
font-weight: 800;
line-height: 120%;
margin: 0px;
`;

const PlatformInfoDiv = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 8px;
`;

const PlatformInfoHeader = styled.div`
display: flex;
width: 302px;
flex-direction: column;
align-items: flex-start;
gap: 2px;
`;

const PlatInforHeadText = styled.p`
margin: 0px;
color: var(--000000, #000);
font-size: 10px;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
`;

const PlatInfoHeadSeparator = styled.hr`
width: 302px;
height: 0px;
margin: 0px;

border: 1px solid rgba(208, 214, 217, 1);
`;

const KeyIssuesContainer = styled.div`
display: flex;
width: 302px;
flex-direction: column;
align-items: flex-start;
gap: 2px;
`;

const KeyIssueTitle = styled.p`
color: var(--primary-000000, #000);
font-size: 12px;
font-family: Avenir;
line-height: 120%;
margin: 0px;
`;

const KeyIssueDescription = styled.p`
color: #828688;
font-size: 12px;
font-family: Avenir;
line-height: 120%;
margin: 0px;
`;

const CandidateCard = styled.div`
display: flex;
padding: 16px 12px;
align-items: center;
gap: 12px;
align-self: stretch;
border-radius: 6px;
background: #FFF;
`;

const CandidateContent = styled.div`
display: flex;
width: 302px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 4px;
`;

const CandidateHeader = styled.div`
display: flex;
align-items: center;
gap: 12px;
align-self: stretch;
`;

const CandidateHeaderText = styled.p`
color: #000;
font-size: 12px;
font-family: Avenir;
font-weight: 800;
line-height: 120%;
margin: 0px;
`;

const CandidateInfoDiv = styled.div`
display: flex;
width: 290px;
padding: 8px;
flex-direction: column;
align-items: flex-start;
gap: 16px;
`;

const CandidateInfoHeader = styled.div`
display: flex;
align-items: center;
gap: 8px;
align-self: stretch;
`;

const CandidateImage = styled.img`
width: 32px;
height: 32px;
`;

const CandidateInfoData = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 4px;
flex: 1 0 0;
`;

const CandidateTagDiv = styled.div`
display: flex;
height: 20px;
padding: 4px 8px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 100px;
border: 1px solid var(--secondary-warning, #F19D38);
background: #F0E1CE;
`;

const CandidateTagText = styled.p`
color: var(--secondary-warning, #F19D38);
font-size: 10px;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
margin: 0px;
`;

const CandidateTime = styled.p`
margin: 0px;
color: var(--primary-828688, #828688);
font-size: 10px;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
`;

const CandidateTextInfo = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 4px;
align-self: stretch;
`;

const CandidateTitle = styled.p`
color: var(--000000, #000);
font-size: 12px;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
margin:0px;
`;

const CandidateDescription = styled.p`
color: var(--primary-828688, #828688);
font-size: 12px;
font-family: Avenir;
line-height: 130%;
margin: 0px;
`;

const DeclarationCard = styled.div`
display: flex;
padding: 16px 12px;
align-items: center;
gap: 12px;
align-self: stretch;
border-radius: 6px;
background: #FFF;
`;

const DeclarationContent = styled.div`
display: flex;
width: 302px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 4px;
`;

const DeclarationHeader = styled.div`
display: flex;
align-items: center;
gap: 12px;
align-self: stretch;
`;

const DeclarationHeaderText = styled.p`
color: #000;
font-size: 12px;
font-family: Avenir;
font-weight: 800;
line-height: 120%;
`;

const DeclarationInfo = styled.div`
display: flex;
width: 290px;
padding: 8px 0px;
flex-direction: column;
align-items: flex-start;
gap: 16px;
border-radius: 8px;
background: #FFF;
`;

const DeclarationDescription = styled.p`
color: var(--primary-828688, #828688);
font-size: 12px;
font-family: Avenir;
line-height: 130%;
`;

const DeclarationImage = styled.img`
width: 290px;
height: 234px;
`;

return (
  <DetailContent>
    <DetailCard>
      <DetailHeader>
        <ProfilePicture
          src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmZBPPMKLdZG2zVpYaf9rcbtNfAp7c3BtsvzxzBb9pNihm?_gl=1*6avmrp*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzMzM2NC4zLjEuMTY4NjkzMzM4Ni4zOC4wLjA."
          alt="pic"
        ></ProfilePicture>
        <HeaderDetailContent>
          <TagContainer>
            <HouseTagDiv>
              <HouseTagText>House intended</HouseTagText>
            </HouseTagDiv>
            <TagDiv>
              <TagDivText>#amazing</TagDivText>
            </TagDiv>
            <TagDiv>
              <TagDivText>#thank you</TagDivText>
            </TagDiv>
          </TagContainer>
          <NominationTitleContainer>
            <NominationTitle>Candidate Name</NominationTitle>
            <NominationUser>candidate.near</NominationUser>
          </NominationTitleContainer>
        </HeaderDetailContent>
        <UpvoteButton>
          <UpvoteCount>+354</UpvoteCount>
          <UpvoteIcon
            src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmXqGSZvrgGkVviBJirnBtT9krTHHsjPYX1UM8EWExFxCM?_gl=1*1hd2izc*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzOTYyNC40LjAuMTY4NjkzOTYyNC42MC4wLjA."
            alt="pic"
          ></UpvoteIcon>
        </UpvoteButton>
      </DetailHeader>
      <PlatformCard>
        <PlatformContent>
          <PlatformHeaderDiv>
            <PlatformHeaderText>Platform</PlatformHeaderText>
          </PlatformHeaderDiv>
          <PlatformInfoDiv>
            <PlatformInfoHeader>
              <PlatInforHeadText>
                Key Issues and Candidate's Position
              </PlatInforHeadText>
              <PlatInfoHeadSeparator></PlatInfoHeadSeparator>
            </PlatformInfoHeader>
            <KeyIssuesContainer>
              <KeyIssueTitle>Restoring Community Funding</KeyIssueTitle>
              <KeyIssueDescription>
                Candidate's Position Description
              </KeyIssueDescription>
            </KeyIssuesContainer>
            <KeyIssuesContainer>
              <KeyIssueTitle>Key Issue 2</KeyIssueTitle>
              <KeyIssueDescription>
                Candidate's Position Description
              </KeyIssueDescription>
            </KeyIssuesContainer>
            <KeyIssuesContainer>
              <KeyIssueTitle>Key Issue 3</KeyIssueTitle>
              <KeyIssueDescription>
                Candidate's Position Description
              </KeyIssueDescription>
            </KeyIssuesContainer>
          </PlatformInfoDiv>
        </PlatformContent>
      </PlatformCard>
      <CandidateCard>
        <CandidateContent>
          <CandidateHeader>
            <CandidateHeaderText>Candidate Affiliations</CandidateHeaderText>
          </CandidateHeader>
          <CandidateInfoDiv>
            <CandidateInfoHeader>
              <CandidateImage
                src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmZBPPMKLdZG2zVpYaf9rcbtNfAp7c3BtsvzxzBb9pNihm?_gl=1*6avmrp*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzMzM2NC4zLjEuMTY4NjkzMzM4Ni4zOC4wLjA."
                alt="pic"
              ></CandidateImage>
              <CandidateInfoData>
                <CandidateTagDiv>
                  <CandidateTagText>Near Foundation</CandidateTagText>
                </CandidateTagDiv>
                <CandidateTime>Oct 2018 - Present</CandidateTime>
              </CandidateInfoData>
            </CandidateInfoHeader>
            <CandidateTextInfo>
              <CandidateTitle>Lorem Ipsum Dolor Sit</CandidateTitle>
              <CandidateDescription>
                Lorem ipsum dolor sit amet consectetur. Turpis maecenas pulvinar
                quis massa tristique velit.
              </CandidateDescription>
            </CandidateTextInfo>
          </CandidateInfoDiv>
          <CandidateInfoDiv>
            <CandidateInfoHeader>
              <CandidateImage
                src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmZBPPMKLdZG2zVpYaf9rcbtNfAp7c3BtsvzxzBb9pNihm?_gl=1*6avmrp*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzMzM2NC4zLjEuMTY4NjkzMzM4Ni4zOC4wLjA."
                alt="pic"
              ></CandidateImage>
              <CandidateInfoData>
                <CandidateTagDiv>
                  <CandidateTagText>Near Foundation</CandidateTagText>
                </CandidateTagDiv>
                <CandidateTime>Oct 2018 - Present</CandidateTime>
              </CandidateInfoData>
            </CandidateInfoHeader>
            <CandidateTextInfo>
              <CandidateTitle>Lorem Ipsum Dolor Sit</CandidateTitle>
              <CandidateDescription>
                Lorem ipsum dolor sit amet consectetur. Turpis maecenas pulvinar
                quis massa tristique velit.
              </CandidateDescription>
            </CandidateTextInfo>
          </CandidateInfoDiv>
          <CandidateInfoDiv>
            <CandidateInfoHeader>
              <CandidateImage
                src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmZBPPMKLdZG2zVpYaf9rcbtNfAp7c3BtsvzxzBb9pNihm?_gl=1*6avmrp*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzMzM2NC4zLjEuMTY4NjkzMzM4Ni4zOC4wLjA."
                alt="pic"
              ></CandidateImage>
              <CandidateInfoData>
                <CandidateTagDiv>
                  <CandidateTagText>Near Foundation</CandidateTagText>
                </CandidateTagDiv>
                <CandidateTime>Oct 2018 - Present</CandidateTime>
              </CandidateInfoData>
            </CandidateInfoHeader>
            <CandidateTextInfo>
              <CandidateTitle>Lorem Ipsum Dolor Sit</CandidateTitle>
              <CandidateDescription>
                Lorem ipsum dolor sit amet consectetur. Turpis maecenas pulvinar
                quis massa tristique velit.
              </CandidateDescription>
            </CandidateTextInfo>
          </CandidateInfoDiv>
        </CandidateContent>
      </CandidateCard>
      <DeclarationCard>
        <DeclarationContent>
          <DeclarationHeader>
            <DeclarationHeaderText>Declaration</DeclarationHeaderText>
          </DeclarationHeader>
          <DeclarationInfo>
            <DeclarationDescription>
              Lorem ipsum dolor sit amet consectetur. Turpis maecenas pulvinar
              quis massanibh porttitor non lacus venenatis. Mi in iaculis
              viverra ac sapien augue nisl odio. Neque eget magna nibh sed neque
              ipsum enim sed. Consectetur dictum quisque faucibus nunc.
              Suspendisse lacus tempus tempor nisl .
            </DeclarationDescription>
            <DeclarationImage
              src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmRXqPtacR16tfe7EoA55u97FkXa1EoHvrPZrLfMk8wZs1?_gl=1*1dx7soz*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NzQ4MTc4Ni42LjEuMTY4NzQ4MTgxOC4yOC4wLjA."
              alt="pic"
            ></DeclarationImage>
          </DeclarationInfo>
        </DeclarationContent>
      </DeclarationCard>
    </DetailCard>
  </DetailContent>
);
