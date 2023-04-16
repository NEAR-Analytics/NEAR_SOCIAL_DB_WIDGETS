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

const sentiment = fetch(
  "https://fetcher-api.lionhack.workers.dev/api/sentiment",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const values = Object.values(sentiment.body.sentiment);
const labels = Object.keys(sentiment.body.sentiment);

// near social doesn't allow MathPI
const math_PI = 3.14159;

const total = values.reduce((acc, value) => acc + value, 0);
let startAngle = 0;
const [tooltip, setTooltip] = State.init({
  show: false,
  value: "",
  x: 0,
  y: 0,
});

const handleMouseEnter = (value, event) => {
  setTooltip({
    show: true,
    value: value,
    x: event.clientX + 10,
    y: event.clientY + 10,
  });
};

const handleMouseLeave = () => {
  setTooltip({ show: false, value: "", x: 0, y: 0 });
};

const actives = fetch("https://fetcher-api.lionhack.workers.dev/api/active");
// console.log(Object.keys(actives.body.active["0"]));
const users = Object.keys(actives.body.active["0"]);
const num = Object.values(actives.body.active["0"]);
console.log(users);

const itemList = users.map((item, index) => <li key={index}>{item}</li>);

return (
  <>
    <>
      <h1 className="text-center">Top Posters on NEAR Social</h1>
      <div className="flex flex-row">
        {Object.entries(actives.body.active["0"]).map(([key, value]) => {
          let accountId = key;
          return (
            <div className="d-flex justify-content-between mb-3">
              <div className="me-4" style={{ width: "90%" }}>
                <Widget src="mob.near/widget/Profile" props={{ accountId }} />
              </div>
              <div
                style={{ width: "12%", padding: 0, justifyContent: "center" }}
              >{`Posts: ${value}`}</div>
              <div style={{ width: "10%" }}>
                <Widget
                  src="mob.near/widget/FollowButton"
                  props={{ accountId }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
    <h1 className="text-center">AI Sentiment Analysis</h1>
    <svg viewBox="0 0 100 100">
      {values.map((value, index) => {
        const angle = (value / total) * 360;
        const endAngle = startAngle + angle;

        const largeArc = angle > 180 ? 1 : 0;

        const x1 = 50 + 30 * Math.cos((startAngle - 90) * (math_PI / 180));
        const y1 = 50 + 30 * Math.sin((startAngle - 90) * (math_PI / 180));
        const x2 = 50 + 30 * Math.cos((endAngle - 90) * (math_PI / 180));
        const y2 = 50 + 30 * Math.sin((endAngle - 90) * (math_PI / 180));

        const path = `M 50,50  L ${x1},${y1}  A 30,30 0 ${largeArc} 1 ${x2},${y2} Z`;

        startAngle = endAngle;

        return (
          <path
            key={index}
            d={path}
            fill={`hsl(${(index * 30) % 360}, 70%, 70%)`}
            onMouseEnter={handleMouseEnter.bind(null, value)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </svg>
    {tooltip.show && (
      <div
        style={{
          position: "absolute",
          left: tooltip.x,
          top: tooltip.y,
          backgroundColor: "white",
          padding: "5px 10px",
          border: "1px solid black",
          borderRadius: "5px",
        }}
      >
        {tooltip.value}
      </div>
    )}
    <div style={{ display: "flex", alignItems: "center" }}>
      {labels.map((label, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: `hsl(${(index * 30) % 360}, 70%, 70%)`,
              marginRight: 5,
            }}
          />
          {label}
          {"  "}
        </div>
      ))}
    </div>
  </>
);
