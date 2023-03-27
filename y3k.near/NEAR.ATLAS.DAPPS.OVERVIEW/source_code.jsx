// Monthly Active Accounts Example
let rawData = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/85a8dba4-b7d8-49ed-aa26-7f56ec9f2df4/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

// data.body = data.body.sort((a, b) => new Date(a.MONTH) - new Date(b.MONTH));

let Style = styled.div`

        `;

let data = rawData.body;
return (
  <Style>
    <div className="text-bg-dark rounded-4 p-3 mb-4">
      {data !== null ? (
        <div class="bg-dark">
          <div>
            <div>
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>Contract Address</th>
                    <th>Past 30 Days</th>
                    <th>New - Past 30 Days</th>
                    <th>Percent New - 30D</th>
                    <th>30-60 Days Ago</th>
                    <th>Monthly Trend</th>
                    <th>60-90 Days Ago</th>
                    <th>Past 24 Hours</th>
                    <th>New - Past 24 Hours</th>
                    <th>Percent New - 24H</th>
                    <th>24-48 Hours Ago</th>
                    <th>Daily Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row["Contract Address"]}</td>
                      <td>{row["Past 30 Days"]}</td>
                      <td>{row["New - Past 30 Days"]}</td>
                      <td>{row["Percent New - 30D"]}</td>
                      <td>{row["30-60 Days Ago"]}</td>
                      <td>{row["Monthly Trend"]}</td>
                      <td>{row["60-90 Days Ago"]}</td>
                      <td>{row["Past 24 Hours"]}</td>
                      <td>{row["New - Past 24 Hours"]}</td>
                      <td>{row["Percent New - 24H"]}</td>
                      <td>{row["24-48 Hours Ago"]}</td>
                      <td>{row["Daily Trend"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  </Style>
);
