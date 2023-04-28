State.init({
  contractName: "marketplace.paras.near",
  daysRange: 7, // 7, 14, 30, ... or 0 (all time),
  diagramKey: "unique_users", // unique_users, new_users or tx_count
});

const Container = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
`;

const ContractSearch = styled.div`
    display: flex;
    direction: row;
    height: 40px;
    width: 100%;
    font-family: "Inter";
    font-size: 24px;
    margin-bottom: 10px;
    gap: 10px;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: none;
    outline: none;
    font-size: 1rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;

    &:focus {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ContractSearchIcon = styled.div`
    width: 20px;
    height: 20px;
`;

const TilesRow = styled.div`
    display: flex;
    align-items: display-start;
    direction: row;
    justify-content: space-between;
    gap: 50px;
`;

const Tile = styled.div`
    height: 160px;
    width: 100%;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    color: rgb(17, 25, 39);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 5px;
    overflow: hidden;
    display: flex;
    direction: row;
`;

const ColLeft = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
`;

const ColRight = styled.div`
    width: 20%;
`;

const TileName = styled.div`
    font-family: Inter;
    color: #6C737F;
    font-size: 14px;
    font-weight: bold;
`;

const StatNumber = styled.div`
    font-family: "Inter";
    color: #111927;
    font-size: 48px;
    font-weight: 500;
`;

const BottomRow = styled.div`
    display: flex;
    direction: row;
    font-family: Inter;
    font-size: 14px;
    gap: 10px;
`;

const PercentChange = styled.div`
    //(green for ↑) color: #3dc699;
    color: #f47269;
`;

const Label = styled.div`
    color: #6C737F;
`;

const TileIcon = styled.div`
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 99999px;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    filter: invert(100%);
`;

const Title = styled.div`
    font-family: Inter;
    color: #6C737F;
    font-size: 24px;
    font-weight: bold;
    margin: 20px;
`;

const ChartNavigation = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const ButtonsRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

const Button = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #f8f9fa;
    outline: 0px;
    border: 0px currentcolor;
    margin: 0px;
    cursor: pointer;
    font-family: Inter;
    font-size: 0.875rem;
    font-weight: 600;
    min-width: 64px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 12px;
    padding: 9px 16px;

    &:active {
    background-color: #6366f1;
    color: #ffffff;
    }
`;

const response = fetch(
  `https://api.pikespeak.ai/contract-analysis/metrics/${state.contractName}`,

  {
    headers: {
      "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5",
    },

    subscribe: true,
  }
);

const lastData = response && response.body[response.body.length - 1];

const yesterdayData = response && response.body[response.body.length - 2];

let uniqueUsers;
let newUsers;
let transitionsCount;
let uniqueUsersSign;
let uniqueUsersDiffPercent;
let newUsersSign;
let newUsersDiffPercent;
let transitionsSign;
let transitionsDiffPercent;

if (response) {
  uniqueUsers = lastData ? lastData.unique_users : 0;
  newUsers = lastData ? lastData.new_users : 0;
  transitionsCount = lastData ? lastData.tx_count : 0;
  if (parseInt(lastData.unique_users) > parseInt(yesterdayData.unique_users)) {
    uniqueUsersSign = "+";

    uniqueUsersDiffPercent =
      100 -
      Math.round(
        (parseInt(yesterdayData.unique_users) /
          parseInt(lastData.unique_users)) *
          100
      );
  } else {
    uniqueUsersSign = "-";

    uniqueUsersDiffPercent =
      100 -
      Math.round(
        (parseInt(lastData.unique_users) /
          parseInt(yesterdayData.unique_users)) *
          100
      );
  }

  if (parseInt(lastData.new_users) > parseInt(yesterdayData.new_users)) {
    newUsersSign = "+";

    newUsersDiffPercent =
      100 -
      Math.round(
        (parseInt(yesterdayData.new_users) / parseInt(lastData.new_users)) * 100
      );
  } else {
    newUsersSign = "-";

    newUsersDiffPercent =
      100 -
      Math.round(
        (parseInt(lastData.new_users) / parseInt(yesterdayData.new_users)) * 100
      );
  }

  if (parseInt(lastData.tx_count) > parseInt(yesterdayData.tx_count)) {
    transitionsSign = "+";

    transitionsDiffPercent =
      100 -
      Math.round(
        (parseInt(yesterdayData.tx_count) / parseInt(lastData.tx_count)) * 100
      );
  } else {
    transitionsSign = "-";

    transitionsDiffPercent =
      100 -
      Math.round(
        (parseInt(lastData.tx_count) / parseInt(yesterdayData.tx_count)) * 100
      );
  }
}

const dataSlice = response
  ? state.daysRange === 0
    ? response.body
    : response.body.slice(state.daysRange * -1)
  : [];

const data = dataSlice.map((el) => {
  return {
    label: new Date(Date.parse(el.day)).toLocaleString("en-US").split(",")[0],
    value: el[state.diagramKey],
  };
});

const chartWidth = 650;
const chartHeight = 325;
const chartMargin = 60;
const tickSize = 5;

const maxDataValue = Math.max(...data.map((item) => item.value));

const xScale = (chartWidth - chartMargin * 2) / (data.length - 1);

const yScale = (chartHeight - chartMargin * 2) / maxDataValue;

const points = data.map((item, index) => ({
  x: chartMargin + index * xScale,
  y: chartHeight - chartMargin - item.value * yScale,
}));

const path =
  `M ${points[0].x} ${points[0].y} ` +
  points
    .slice(1)
    .map((point) => `L ${point.x} ${point.y}`)
    .join(" ");

const xTicks = data.map((item, index) => ({
  x: chartMargin + index * xScale,
  y: chartHeight - chartMargin + tickSize,
  label: item.label,
}));

const yTicks = [...Array(6).keys()].map((index) => ({
  x: chartMargin - tickSize,
  y: chartHeight - chartMargin - (index * (chartHeight - chartMargin * 2)) / 5,
  label: (index * maxDataValue) / 5,
}));

const viewBox = `0 0 ${chartWidth} ${chartHeight}`;

let xTicksFontSize;
switch (state.daysRange) {
  case 7:
    xTicksFontSize = 0.8;
    break;
  case 14:
    xTicksFontSize = 0.5;
    break;
  case 30:
    xTicksFontSize = 0.45;
    break;
  default:
    xTicksFontSize = 0.1;
}

let diagramFill;
switch (state.diagramKey) {
  case "unique_users":
    diagramFill = "#6366f1";
    break;
  case "new_users":
    diagramFill = "#10b981";
    break;
  case "tx_count":
    diagramFill = "#f79009";
    break;
}

return (
  <Container>
    <ContractSearch>
      <ContractSearchIcon>
        <img
          src="https://img.icons8.com/?size=512&id=100947&format=png"
          height="100%"
          width="100%"
        />
      </ContractSearchIcon>

      <input
        type="text"
        placeholder="Enter contract name..."
        value={state.contractName}
        onChange={(e) => State.update({ contractName: e.target.value })}
      />
    </ContractSearch>
    <Title>Today</Title>
    {response ? (
      <>
        <TilesRow>
          <Tile>
            <ColLeft>
              <TileName>UNIQUE USERS</TileName>

              <StatNumber>{uniqueUsers}</StatNumber>

              <BottomRow>
                <PercentChange
                  style={{
                    color: uniqueUsersSign == "+" ? "#3dc699" : "#f47269",
                  }}
                >
                  {uniqueUsersSign == "+" ? "↑" : "↓"}
                  {uniqueUsersDiffPercent}%
                </PercentChange>

                <Label>Since yesterday</Label>
              </BottomRow>
            </ColLeft>

            <ColRight>
              <TileIcon style={{ backgroundColor: "#6366f1" }}>
                <Icon>
                  <img
                    src="https://img.icons8.com/ios-glyphs/256/user--v1.png"
                    height="100%"
                    width="100%"
                  />
                </Icon>
              </TileIcon>
            </ColRight>
          </Tile>

          <Tile>
            <ColLeft>
              <TileName>NEW USERS</TileName>

              <StatNumber>{newUsers}</StatNumber>

              <BottomRow>
                <PercentChange
                  style={{
                    color: newUsersSign == "+" ? "#3dc699" : "#f47269",
                  }}
                >
                  {newUsersSign == "+" ? "↑" : "↓"}
                  {newUsersDiffPercent}%
                </PercentChange>

                <Label>Since yesterday</Label>
              </BottomRow>
            </ColLeft>

            <ColRight>
              <TileIcon style={{ backgroundColor: "#10b981" }}>
                <Icon>
                  <img
                    src="https://img.icons8.com/material/256/add-user-male--v1.png"
                    height="100%"
                    width="100%"
                  />
                </Icon>
              </TileIcon>
            </ColRight>
          </Tile>

          <Tile>
            <ColLeft>
              <TileName>TRANSACTION COUNT</TileName>

              <StatNumber>{transitionsCount}</StatNumber>

              <BottomRow>
                <PercentChange
                  style={{
                    color: transitionsSign == "+" ? "#3dc699" : "#f47269",
                  }}
                >
                  {transitionsSign == "+" ? "↑" : "↓"}
                  {transitionsDiffPercent}%
                </PercentChange>

                <Label>Since yesterday</Label>
              </BottomRow>
            </ColLeft>

            <ColRight>
              <TileIcon style={{ backgroundColor: "#f79009" }}>
                <Icon>
                  <img
                    src="https://img.icons8.com/material/256/purchase-order--v1.png"
                    height="100%"
                    width="100%"
                  />
                </Icon>
              </TileIcon>
            </ColRight>
          </Tile>
        </TilesRow>

        <div>
          <Title>Historical Data</Title>

          <ChartNavigation>
            <ButtonsRow>
              <Button
                style={{
                  backgroundColor:
                    state.daysRange === 7 ? "#6366f1" : "#f8f9fa",
                  color: state.daysRange === 7 ? "#fff" : "#000",
                }}
                onClick={() => State.update({ daysRange: 7 })}
              >
                7 days
              </Button>

              <Button
                style={{
                  backgroundColor:
                    state.daysRange === 14 ? "#6366f1" : "#f8f9fa",
                  color: state.daysRange === 14 ? "#fff" : "#000",
                }}
                onClick={() => State.update({ daysRange: 14 })}
              >
                14 days
              </Button>

              <Button
                style={{
                  backgroundColor:
                    state.daysRange === 30 ? "#6366f1" : "#f8f9fa",
                  color: state.daysRange === 30 ? "#fff" : "#000",
                }}
                onClick={() => State.update({ daysRange: 30 })}
              >
                30 days
              </Button>
            </ButtonsRow>

            <ButtonsRow>
              <Button
                style={{
                  backgroundColor:
                    state.diagramKey === "unique_users" ? "#6366f1" : "#f8f9fa",
                  color: state.diagramKey === "unique_users" ? "#fff" : "#000",
                }}
                onClick={() => State.update({ diagramKey: "unique_users" })}
              >
                Unique users
              </Button>

              <Button
                style={{
                  backgroundColor:
                    state.diagramKey === "new_users" ? "#10b981" : "#f8f9fa",
                  color: state.diagramKey === "new_users" ? "#fff" : "#000",
                }}
                onClick={() => State.update({ diagramKey: "new_users" })}
              >
                New users
              </Button>

              <Button
                style={{
                  backgroundColor:
                    state.diagramKey === "tx_count" ? "#f79009" : "#f8f9fa",
                  color: state.diagramKey === "tx_count" ? "#fff" : "#000",
                }}
                onClick={() => State.update({ diagramKey: "tx_count" })}
              >
                Transaction count
              </Button>
            </ButtonsRow>
          </ChartNavigation>

          <svg
            viewBox={viewBox}
            preserveAspectRatio="xMidYMid meet"
            width="100%"
            height="100%"
          >
            <path d={path} fill="none" stroke={diagramFill} strokeWidth="2" />

            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="5"
                fill={diagramFill}
              />
            ))}

            {xTicks.map((tick, index) => (
              <g key={index}>
                <line
                  x1={tick.x}
                  y1={tick.y}
                  x2={tick.x}
                  y2={tick.y - tickSize}
                  stroke="black"
                  strokeWidth="1"
                />

                <text
                  x={tick.x}
                  y={tick.y + 20}
                  fontSize={`${xTicksFontSize}em`}
                  transform={`rotate(-45, ${tick.x}, ${tick.y + 20})`}
                  textAnchor="middle"
                >
                  {tick.label}
                </text>
              </g>
            ))}

            {yTicks.map((tick, index) => (
              <g key={index}>
                <line
                  x1={tick.x - tickSize}
                  y1={tick.y}
                  x2={tick.x}
                  y2={tick.y}
                  stroke="black"
                  strokeWidth="1"
                />

                <text x={tick.x - tickSize - 5} y={tick.y} textAnchor="end">
                  {tick.label}
                </text>
              </g>
            ))}

            {points.map((point, index) => (
              <line
                key={index}
                x1={point.x}
                y1={point.y}
                x2={point.x}
                y2={chartHeight - chartMargin}
                stroke="lightgray"
                strokeWidth="1"
                strokeDasharray="5, 5"
              />
            ))}
          </svg>
        </div>
      </>
    ) : (
      <h1>Loading...</h1>
    )}
  </Container>
);
