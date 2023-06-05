const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-gap: .5em;
  gap: .5em;
  margin-bottom: 3em;
  padding: 9em 2em;
  background: linear-gradient(255.93deg,#eff3f9 -39.69%,#eff3f9 5.2%,rgba(205,237,255,.65) 49.41%,#fff 91.12%);
}
`;
const MainHeading = styled.h1`
  font-weight: 700;
  font-size: 14vw;
  line-height: 1em;
  text-align: center;
  color: #2d3748;
  white-space: nowrap;
`;
const SubHeading = styled.h3`
font-size: 4vw;
font-weight: 500;
text-align: center;
color: #2d3748;
//  @media (max-width: 992px) {
//     text-align:center;
//   }
`;

const HeaderButtonsContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
text-align: center;
grid-gap: 2em;
gap: 2em;
margin-top: 1.5em;

`;

const PrimaryButton = styled.div`
padding: .75em 4em;
border-radius: .7em;
color: var(--main-color);
border: 1px solid transparent;
transition: all .3s;
cursor: pointer;
    color: #fff;
    background: #0d99ff;
    &:hover{
        color: #0d99ff;
        background:#fff;
    }
@media screen and (max-width: 540px){
    padding: .5em 2em;    
    }
`;
const SecondaryButton = styled.div`
    padding: .75em 4em;
    border-radius: .7em;
    color: var(--main-color);
    border: 1px solid transparent;
    transition: all .3s;
    cursor: pointer;
    color: #0d99ff;
    background:#fff;
    &:hover{
        color: #fff;
        background: #0d99ff;
    }
    @media screen and (max-width: 540px){
    padding: .5em 2em;    
    }
`;

return (
  <div>
    <Hero>
      <MainHeading>Create. Mint. Sell.</MainHeading>
      <SubHeading>
        {"Create content + Art that you own in < 5 minutes"}
      </SubHeading>
      <HeaderButtonsContainer>
        <a
          style={{ textDecoration: "none" }}
          href="https://bos.genadrop.io/#/jgodwill.near/widget/genadropMinter"
        >
          <PrimaryButton>Create</PrimaryButton>
        </a>
        <a
          style={{ textDecoration: "none" }}
          href="https://bos.genadrop.io/#/jgodwill.near/widget/genadropExplore"
        >
          <SecondaryButton>Explore</SecondaryButton>
        </a>
      </HeaderButtonsContainer>
    </Hero>
  </div>
);
