// Monthly Active Accounts Example
let rawData = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/2122b458-2138-4d4b-b030-efa784fc04d3/data/latest",
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

let data = rawData.body || [];
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
                    <th>Percent New</th>
                    <th>30-60 Days Ago</th>
                    <th>M/M</th>
                    <th>60-90 Days Ago</th>
                    <th>M/2M</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row["Contract Address"]}</td>
                      <td>{row["Past 30 Days"]}</td>
                      <td>{row["Percent New"]}</td>
                      <td>{row["30-60 Days Ago"]}</td>
                      <td>{row["M/M"]}</td>
                      <td>{row["60-90 Days Ago"]}</td>
                      <td>{row["M/2M"]}</td>
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
