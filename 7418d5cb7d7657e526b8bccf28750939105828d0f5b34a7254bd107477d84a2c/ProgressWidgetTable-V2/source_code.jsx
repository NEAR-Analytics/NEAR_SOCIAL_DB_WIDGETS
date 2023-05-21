const TableWrapper = styled.div`
    display: flex;
    width: 100%;
    overflow-x: scroll;
    padding-top: 25px;
    @media (min-width: 1024px) {
      overflow-x: initial;
  }
`;

const OverflowWrapper = styled.div`
  position: relative;
  min-width: 300%;
  height: 100%;
  display: flex;
  flex-flow: column;
  @media (min-width: 580px) {
    min-width: 150%;
  }
  @media (min-width: 768px) {
    min-width: 120%;
  }
  @media (min-width: 860px) {
    min-width: 100%;
    max-width: 100%;
  }
  @media (min-width: 1140px) {
    min-width: 1024px;
    min-width: 1024px;
    margin: 0 auto;
  }
`;

const ChartWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-flow: column;
  &:before {
    content: "";
    position: absolute;
    width: 3px;
    height: 104%;
    top: -4%;
    background: rgb(145 135 137);
    left: calc(16% + 10px);
    z-index: 10;
  }
  &:after {
    content: "";
    position: absolute;
    width: 85%;
    height: 3px;
    background: rgb(145 135 137);
    left: calc(16% + 10px);
    top: 100%;
    z-index: 10;

  }
  @media (min-width: 450px) {
    &:before {
    left: calc(12% + 10px);
    }
    &:after {
      width: 89%;
      left: calc(12% + 10px);
    }
  }
  @media (min-width: 580px) {
    &:before {
      left: calc(18% + 10px);
    }
    &:after {
      width: 83%;
      left: calc(18% + 10px);
    }
    
  }
  @media (min-width: 1024px) {
    &:before {
      left: calc(16% + 10px);
    }
    &:after {
      width: 85%;
      left: calc(16% + 10px);
    }
  }
  @media (min-width: 1140px) {
    &:before {
      left: calc(16% + 10px);
    }
    &:after {
      width: 85%;
      left: calc(16% + 10px);
    }
  }
`;

const GradientContainer = styled.div`
  position: absolute;
  left: calc(16% + 10px);
  width: 85%;
  height: 100%;
  background: linear-gradient(90deg, rgba(242,155,192,1) 7%, rgba(244,162,170,1) 21%, rgba(255,213,13,1) 100%);
  @media (min-width: 450px) {
    width: 88%;
    left: calc(12% + 10px);
  }
  @media (min-width: 580px) {
    width: 84%;
    left: calc(18% + 10px);
  }
  @media (min-width: 1024px) {
    width: 84%;
    left: calc(16% + 10px);
  }
  @media (min-width: 1140px) {

  }

`;

const Row = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 6px;
`;

const ItemTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  max-width: 16%;
  width: 100%;
  min-width: fit-content;
  text-align: right;
  font-size: 14px;
  margin: 0 20px 0 0; 
  text-align: right;
  @media (min-width: 450px) {
    max-width: 12%;
  }
  @media (min-width: 450px) {
    max-width: 12%;
  }
  @media (min-width: 580px) {
    max-width: 18%;
  }
  @media (min-width: 1024px) {
    max-width: 16%;
  }
`;

const SingleMeterBarWrapper = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SingleMeterBar = styled.div`
    position: relative;
    top: 2px;
    height: 20px;
    width: ${({ width }) => `${width}%`};
    background: ${({ color }) => `${color}`};
    color: #fff;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    box-sizing: border-box;
    &:after{
      content: '';
      position: absolute;
      top: 0px;
      right: -10px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${({ color }) => `${color}`};

      /* border-style: solid;
      border-width: 5px 0 5px 10px;
      border-color: transparent transparent transparent #4497e0; */
    }
`;

const AgendaWrapper = styled.div`
  position: relative;
  display: flex;
  left: 18%;
  width: 84%;
  height: 100px;
  @media (min-width: 450px) {
   left: 15.5%;
  }
  @media (min-width: 580px) {
    left: 19%;
  }
  @media (min-width: 1024px) {
    left: 18%;
  }
`;
const StepWrapper = styled.div`
  display: flex;
  position: absolute;
  max-width: 10%;
  min-width: 10%;
  width: 10%;
  left: ${({ left }) => left}%;
  p{
    font-size: 12px;
  }
`;

const PercentageItem = styled.p`
margin: 10px 0;
`;

const StepItem = styled.p`
  position: absolute;
  transform: rotate(-45deg);
  font-size: 12px;
  width: fit-content;
  top: 85%;
  left: -30px;
  width: 100%;
`;
const percentage = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const steps = [
  "Not Started",
  "Planning",
  "Requirements gathered",
  "Designing",
  "Design Complete",
  "Building",
  "Building complete",
  "Testing",
  "Tests complete",
  "Launching",
  "Deployed",
];

const testObj = {
  "NDC Academy": 20,
  "EasyPoll v1": 50,
  "EasyPoll v2": 90,
  "Kudos V1": 10,
  "Kudos V2": 40,
  "Near Docs": 40,
  Nominate: 40,
  "NDC Dashboard": 40,
  "NDC Gateway": 40,
  "NDC Voting": 100,
  "NDC Elections": 90,
  "NDC TrackMyGrants": 30,
  "Regional Communities": 20,
};

const colors = {
  yellow: "#FFD50D",
  blue: "#4498E0",
  pink: "#F29BC0",
};

return (
  <TableWrapper>
    <OverflowWrapper>
      <ChartWrapper className="CHARTWRAPPER">
        <GradientContainer className="GRADIENT"></GradientContainer>

        {Object.entries(testObj).map((item) => (
          <Row>
            <ItemTitle className="ITEM_TITLE">{item[0]}</ItemTitle>
            <SingleMeterBarWrapper>
              <SingleMeterBar width={item[1] + 2} color={colors.blue}>
                {item[1]}%
              </SingleMeterBar>
            </SingleMeterBarWrapper>
          </Row>
        ))}
      </ChartWrapper>
      <AgendaWrapper className="AGENDA">
        {steps.map((item, index) => (
          <StepWrapper left={index !== 10 ? index * 10 : 98}>
            <PercentageItem>
              {index === 0 ? `${index}%` : `${index}0%`}
            </PercentageItem>
            <StepItem>{item}</StepItem>
          </StepWrapper>
        ))}
      </AgendaWrapper>
    </OverflowWrapper>
  </TableWrapper>
);
