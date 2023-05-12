const MainWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: ${({ props }) => props.width}px;
`;
const HalfArch = styled.div`
  position: relative;
  width: ${({ props }) => props.width}px;
  height: ${({ props }) => props.height}px;
  border-top-left-radius: ${({ props }) => props.border}px;
  border-top-right-radius: ${({ props }) => props.border}px;
  border-bottom: 0;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  &:before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  border-radius: 50%;
    background-image: ${({ percentage }) =>
      `conic-gradient(#FFD50D, #F29BC0 calc((${percentage}%, 0) / 2), #E5E9EC 0)`} ;

  transition: transform .5s ease-in-out;
  z-index: 1;
  transform: rotate(270deg);
}
&:after {
  content: "";
  position: absolute;
  display: block;
  background: white;
  z-index: 2;
  width: calc(100% - 32px);
  height: calc(200% - 32px);
  border-radius: 50%;
  top: 16px;
  left: 16px;
}
 `;

const ContentBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    align-items: center;
    z-index: 10;
    p {
      margin: 0;
    }
  `;

const PercentageNum = styled.p`
    font-size: ${({ size }) => (size == "large" ? "38px" : "24px")};
    font-weight: bold;
  `;

const TotalRegNum = styled.p`
font-size: ${({ size }) => (size == "large" ? "22px" : "16px")};

  color: #9FA7AD;
`;
const sizes = {
  small: {
    width: 200,
    height: 100,
    border: 120,
  },
  medium: {
    width: 250,
    height: 125,
    border: 150,
  },
  large: {
    width: 300,
    height: 150,
    border: 180,
  },
};

const TextContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 14px;
  z-index: 10;
  p {
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 6px;
  }
  a {
    font-size: 14px;
    color: #4498E0;
  }
`;

const propsSize = props.size ? props.size : "small";
const registerUsersNum = Near.view("registry.i-am-human.near", "sbt_supply", {
  issuer: "gooddollar-v1.i-am-human.near",
});

const totalUsrNum = 1000;
const percentage = (registerUsersNum / 1000) * 100;
return (
  <MainWrapper props={sizes[propsSize]}>
    <HalfArch percentage={25} props={sizes[propsSize]}>
      <ContentBox size={propsSize}>
        <PercentageNum size={propsSize}>
          {Math.round(percentage)}%
        </PercentageNum>
        <TotalRegNum size={propsSize}>
          {registerUsersNum}/{totalUsrNum}
        </TotalRegNum>
      </ContentBox>
    </HalfArch>
    <TextContainer>
      <p>Humans on NEAR</p>
      <a href="">join the movement</a>
    </TextContainer>
  </MainWrapper>
);
