const Candidate = styled.div`
display: inline-flex;
padding: 20px 20px 0px 20px;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
gap: 16px;
border-radius: 8px;
background: #F8F8F9;
@media only screen and (max-width: 480px) {
 
}
`;
const Candidatetitle = styled.label`
color: var(--000000, #000);
font-size: 20px;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
@media only screen and (max-width: 480px) {
 
}
`;
const CandidateAfiliations = styled.div`
display: flex;
width: 465px;
flex-direction: column;
align-items: flex-start;
gap: 8px;
@media only screen and (max-width: 480px) {
 
}
`;
const Afiliation = styled.div`
display: flex;
padding: 16px;
flex-direction: column;
align-items: flex-start;
gap: 16px;
align-self: stretch;
border-radius: 8px;
background: #FFF;
@media only screen and (max-width: 480px) {
 display: none;
}
`;
const AfiliationHead = styled.div`
display: flex;
align-items: center;
gap: 8px;
align-self: stretch;
@media only screen and (max-width: 480px) {
 
}
`;
const Cicle = styled.div`
width: 32px;
height: 32px;
border-radius: 32px;
background: #D9D9D9;
@media only screen and (max-width: 480px) {
 
}
`;
const TagContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 4px;
flex: 1 0 0;
 
@media only screen and (max-width: 480px) {
 
}
`;
const TagmobileContainer = styled.div`
display: none;
align-items: flex-start;
gap: 4px;
width: 465px;
flex-wrap: wrap;
@media only screen and (max-width: 480px) {
  display: flex;
}
`;
const Tags = styled.button`
display: flex;
padding: 6px 16px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 100px;
border-width: 1px;
border: solid 1px #F19D38;
 
 
  background-image: linear-gradient(#F0E1CE, #F0E1CE), radial-gradient(circle at top left,#F0E1CE, #F0E1CE);
  background-origin: border-box;
  background-clip: padding-box, border-box;
@media only screen and (max-width: 480px) {
 
 
}
`;
const TagsText = styled.label`
font-size: 12px;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
color: #F19D38;
@media only screen and (max-width: 480px) {
 
 
}

`;
const DateText = styled.label`
display: flex;
flex-direction: column;
align-self: stretch;
color: var(--primary-828688, #828688);
font-size: 10px;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
@media only screen and (max-width: 480px) {
 
 
}

`;
const AfiliationBody = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 4px;
align-self: stretch;
@media only screen and (max-width: 480px) {
 
}
`;
const BodyTitle = styled.div`
display: flex;
flex-direction: column;
align-self: stretch;
color: var(--000000, #000);
font-size: 12px;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
@media only screen and (max-width: 480px) {
 
}
`;
const BodySubTitle = styled.div`
display: flex;
flex-direction: column;
align-self: stretch;
color: var(--primary-828688, #828688);
font-size: 12px;
font-family: Avenir;
line-height: 130%;
@media only screen and (max-width: 480px) {
 
}
`;
const { affiliations } = props;
return (
  <Candidate>
    {" "}
    <Candidatetitle>Candidate Affiliations </Candidatetitle>
    <TagmobileContainer>
      {affiliations.length > 0 ? (
        affiliations.map((tag, index) => {
          {
            console.log(tag);
          }
          return (
            <Tags>
              <TagsText>{tag.affiliation}</TagsText>
            </Tags>
          );
        })
      ) : (
        <></>
      )}
    </TagmobileContainer>
    <CandidateAfiliations>
      {affiliations.length > 0 ? (
        affiliations.map((tag, index) => {
          {
            console.log(tag);
          }
          return (
            <Afiliation>
              <AfiliationHead>
                <Cicle />
                <TagContainer>
                  {" "}
                  <Tags>
                    <TagsText>{tag.affiliation}</TagsText>
                  </Tags>
                  <DateText>{tag.affilationDate}</DateText>
                </TagContainer>
              </AfiliationHead>
              <AfiliationBody>
                <BodyTitle>{tag.affiliationtitle}</BodyTitle>
                <BodySubTitle>{tag.affiliationSubtitle}</BodySubTitle>
              </AfiliationBody>
            </Afiliation>
          );
        })
      ) : (
        <></>
      )}
    </CandidateAfiliations>
  </Candidate>
);
