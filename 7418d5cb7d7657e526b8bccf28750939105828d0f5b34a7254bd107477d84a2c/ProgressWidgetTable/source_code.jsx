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
    width: 2px;
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
    height: 2px;
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
      width: 90%;
      left: calc(12% + 10px);
    }
  }
  @media (min-width: 580px) {
    &:before {
      left: calc(18% + 10px);
    }
    &:after {
      width: 84%;
      left: calc(18% + 10px);
    }
    
  }
  @media (min-width: 1024px) {
    &:before {
      left: calc(16% + 10px);
    }
    &:after {
      width: 86%;
      left: calc(16% + 10px);
    }
  }
  @media (min-width: 1140px) {
    &:before {
      left: calc(16% + 10px);
    }
    &:after {
      width: 86%;
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
    width: 89%;
    left: calc(12% + 10px);
  }
  @media (min-width: 580px) {
    width: 85%;
    left: calc(18% + 10px);
  }
  @media (min-width: 1024px) {
    width: 85%;
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
  height: 28px;
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
    height: 28px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SingleMeterBar = styled.div`
    position: relative;
    top: 2px;
    height: 2px;
    width: ${({ width }) => `${width}%`};
    background: ${({ color }) => `${color}`};
    &:after{
      content: '';
      position: absolute;
      top: -4px;
      left: 100%;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 0 5px 10px;
      border-color: transparent transparent transparent #4497e0;
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
  text-align: center;
  top: 100%;
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

const accountId = context.accountId;

if (!accountId) {
  return <h1>Please sign in with NEAR wallet</h1>;
}

let items = Social.get(`${accountId}/testWidget/**`);
if (items == null || items == undefined) {
  console.log("Items", items);
  return <h1>No Data</h1>;
}

const chartState = State.init({
  allItems: items,
});

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

        {Object.entries(chartState.allItems).map((item) => (
          <Row>
            <ItemTitle className="ITEM_TITLE">
              {item[0].replace(/-/g, " ")}
            </ItemTitle>
            <SingleMeterBarWrapper>
              <SingleMeterBar
                width={parseInt(item[1]) + 2}
                color={colors.blue}
              ></SingleMeterBar>
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
