// Query API
State.init({
  queryResults: "",
});

function queryComplete(success, results) {
  State.update({
    queryResults: results,
  });
  console.log("results: " + JSON.stringify(state.queryResults.records));
}

const myProps = {
  query: `select substr(date_trunc('day', block_timestamp),0,10) as day_date, count(1) as num_blocks from near.core.fact_blocks where block_timestamp > '2023-03-01' and block_timestamp < '2023-03-07' group by 1 order by 1`,
  debug: "true",
  onComplete: queryComplete,
};

// Chart Query
let Style = styled.div`
.barTextH{
  transition: fill 0.2s;

}
.barTextH:hover{
  fill: #ad610a;

}
.bar {
  transition: fill 0.2s;
}

.bar:hover {
  fill: #ffa726;
}

.bar-chart {
  display: flex;
  align-items: center;
  justify-content: center;
}

svg {
  width: 80%;
}

rect {
  shape-rendering: crispEdges;
  fill: #61dafb;
  stroke: #333;
  stroke-width: 1;
}
`;

const width = 800;
const height = 500;
let maxValue = 0;
if (state.queryResults !== "") {
  state.queryResults.rows.map((d) => {
    if (d[1] > maxValue) {
      maxValue = d[1];
    }
  });
}
/*
if (state.queryResults !== "") {
  maxValue = Math.max(state.queryResults.rows.map((d) => d[0])) * 1.1;
}
*/

return (
  <>
    <Widget
      src="0e7a82d0ef92b5559ef04df11f5de68ac4c4479319da5a72b3e2799c4717a422/widget/Flipside-API-Getter"
      props={myProps}
    ></Widget>
    <Style>
      <div className="text-bg-light rounded-4 p-3 mb-4">
        {state.queryResults !== "" ? (
          <p>
            <div class="d-flex clearfix flex-wrap flex-column flex-sm-row">
              <div class="p-2">
                <div>
                  <h2>Metric: Near Blocks Per Day</h2>
                </div>
              </div>
            </div>
            <div className="bar-chart">
              <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height + 200} `}
                preserveAspectRatio="xMidYMid meet"
              >
                {state.queryResults.rows.map((d, i) => {
                  console.log("d0", d[1]);
                  console.log("mv", maxValue);
                  const yPos = height - (d[1] / maxValue) * height;
                  //const yPos = height;
                  const yHeight = (d[1] / maxValue) * height;
                  //const yHeight = height;
                  return (
                    <g key={i} className="barTextH">
                      <rect
                        className="bar"
                        x={i * (width / state.queryResults.records.length)}
                        y={yPos}
                        width={width / state.queryResults.records.length - 2}
                        height={yHeight}
                        fill="#61dafb"
                      />
                      <text
                        className="text-primary-emphasis"
                        x={
                          i * (width / state.queryResults.records.length) +
                          width / state.queryResults.records.length / 2.5
                        }
                        y={height + 40}
                        transform={`rotate(-75 ${
                          i * (width / state.queryResults.records.length) +
                          width / state.queryResults.records.length / 2
                        } ${height + 40})`}
                        textAnchor="middle"
                      >
                        {d[0]}
                      </text>
                      <text
                        className="text-primary-emphasis"
                        x={
                          i * (width / state.queryResults.records.length) +
                          width / state.queryResults.records.length / 2
                        }
                        y={height + 90}
                        transform={`rotate(-75 ${
                          i * (width / state.queryResults.records.length) +
                          width / state.queryResults.records.length / 2
                        } ${height + 110})`}
                        textAnchor="middle"
                      >
                        {d[1]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div>
              <hr />
            </div>
          </p>
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </Style>
  </>
);
