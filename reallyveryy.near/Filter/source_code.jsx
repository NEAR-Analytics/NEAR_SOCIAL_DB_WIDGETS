// data  = number array or object
// labels = string array, overwritten if data is object
let { title, data, labels, config, width, height } = props;

let { isDate, includeDate, startFromZero } = config;

let isObject = false;
let maxValue = undefined;
let minValue = undefined;

if (!Array.isArray(data)) {
  labels = Object.keys(data);
  isObject = true;
  for (const [key, value] of Object.entries(data)) {
    if (maxValue == undefined) {
      maxValue = value;
    }

    if (minValue == undefined) {
      minValue = value;
    }

    maxValue = maxValue < value ? value : maxValue;
    minValue = minValue > value ? value : minValue;
  }
} else {
  for (const value of data) {
    console.log({ value });
    if (maxValue == undefined) {
      maxValue = value;
    }

    if (minValue == undefined) {
      minValue = value;
    }

    maxValue = maxValue < value ? value : maxValue;
    minValue = minValue > value ? value : minValue;
  }
}

startFromZero = startFromZero && maxValue > 0;
if (startFromZero) {
  minValue = 0;
}

console.log({ maxValue, minValue });

let dataLength = labels.length;

function toLocaleDecimal(x, minDecimal, maxDecimal) {
  return x.toLocaleString("en", {
    minimumFractionDigits: minDecimal,
    maximumFractionDigits: maxDecimal,
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear().toString().slice(-2);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  return `${year} - ${month}${includeDate ? ` - ${date.getDate()}` : ""}`;
}

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

maxValue = maxValue * 1.1;

return (
  <>
    <Style>
      <div className="text-bg-light rounded-4 p-3 mb-4">
        {data !== null ? (
          <p>
            <div class="d-flex clearfix flex-wrap flex-column flex-sm-row">
              <div class="p-2">
                <div>
                  <h2>{title}</h2>
                </div>
              </div>
            </div>

            <div>
              <hr />
              <div className="bar-chart">
                <svg
                  width={width}
                  height={height}
                  viewBox={`0 0 ${width} ${height + 200} `}
                  preserveAspectRatio="xMidYMid meet"
                >
                  {labels.map((label, i) => {
                    let d = data[i];

                    if (isObject) {
                      d = data[label];
                    }

                    let barHeight =
                      (startFromZero
                        ? d / maxValue
                        : (d - minValue) / (maxValue - minValue)) * height;
                    let barWidth = width / labels.length;

                    return (
                      <g key={title + i.toString()} className="barTextH">
                        <rect
                          className="bar"
                          x={i * barWidth}
                          y={height - barHeight}
                          width={barWidth - 2}
                          height={barHeight}
                          fill="#61dafb"
                        />
                        <text
                          className="text-primary-emphasis"
                          x={i * barWidth + barWidth / 2}
                          y={height + 40}
                          transform={`rotate(-75 ${
                            i * barWidth + barWidth / 2
                          } ${height + 40})`}
                          textAnchor="middle"
                        >
                          / {isDate ? formatDate(label) : label}
                        </text>
                        <text
                          className="text-primary-emphasis"
                          x={i * barWidth + barWidth / 2}
                          y={height + 90}
                          transform={`rotate(-75 ${
                            i * barWidth + barWidth / 2
                          } ${height + 110})`}
                          textAnchor="middle"
                        >
                          {toLocaleDecimal(d, 2, 2)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
            <div>
              <hr />
              <small className="fw-bold">
                Data is provided by{" "}
                <a
                  target="_blank"
                  style={{ color: "inherit" }}
                  variant="caption"
                  rel="nofollow"
                  href="https://www.flipsidecrypto.com/"
                >
                  Flipside Crypto
                </a>
              </small>
            </div>
          </p>
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </Style>
  </>
);
