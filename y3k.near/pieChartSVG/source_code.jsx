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

const values = [10, 20, 50, 40];
const labels = ["a", "b", "c", "d"];

const total = values.reduce((acc, value) => acc + value, 0);
let startAngle = 0;

// near social doesn't allow MathPI
const math_PI = 3.14159;

return (
  <Style>
    <>
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
            />
          );
        })}
      </svg>
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
          </div>
        ))}
      </div>
    </>
  </Style>
);
