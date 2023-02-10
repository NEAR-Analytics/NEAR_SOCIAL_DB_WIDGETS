// Monthly Active Accounts Example
let data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/da1fb143-e325-43ea-a07d-8fcf750eea16/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

data.body = data.body.sort((a, b) => new Date(a.MONTH) - new Date(b.MONTH));
const METRIC_NAME = "Monthly Active Accounts";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  return `${year} - ${month}`;
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

const width = 800;
const height = 500;
const maxValue = Math.max(...data.body.map((d) => d.ACTIVE_WALLETS)) * 1.1;

return (
  <Style>
    <div className="text-bg-light rounded-4 p-3 mb-4">
      {data !== null ? (
        <p>
          <div class="d-flex clearfix flex-wrap flex-column flex-sm-row">
            <div class="p-2">
              <div>
                <h2>Metric: {METRIC_NAME}</h2>
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
                {data.body.map((d, i) => (
                  <g key={i} className="barTextH">
                    <rect
                      className="bar"
                      x={i * (width / data.body.length)}
                      y={height - (d.ACTIVE_WALLETS / maxValue) * height}
                      width={width / data.body.length - 2}
                      height={(d.ACTIVE_WALLETS / maxValue) * height}
                      fill="#61dafb"
                    />
                    <text
                      className="text-primary-emphasis"
                      x={
                        i * (width / data.body.length) +
                        width / data.body.length / 2
                      }
                      y={height + 40}
                      transform={`rotate(-75 ${
                        i * (width / data.body.length) +
                        width / data.body.length / 2
                      } ${height + 40})`}
                      textAnchor="middle"
                    >
                      / {formatDate(d.MONTH)}
                    </text>
                    <text
                      className="text-primary-emphasis"
                      x={
                        i * (width / data.body.length) +
                        width / data.body.length / 2
                      }
                      y={height + 90}
                      transform={`rotate(-75 ${
                        i * (width / data.body.length) +
                        width / data.body.length / 2
                      } ${height + 110})`}
                      textAnchor="middle"
                    >
                      {formatNumberWithCommas(d.ACTIVE_WALLETS)}
                    </text>
                  </g>
                ))}
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
);
