let Style = styled.div`
                `;

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      type: "line",
      label: "Dataset 1",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: {
        January: 521,
        February: 1372,
        March: 95,
        April: 772,
        May: 314,
        June: 683,
        July: 191,
      },
    },
    {
      type: "bar",
      label: "Dataset 2",
      backgroundColor: "rgb(75, 192, 192)",
      data: {
        January: 21,
        February: 1372,
        March: 995,
        April: 772,
        May: 314,
        June: 63,
        July: 1491,
      },
      borderColor: "white",
      borderWidth: 2,
    },
    {
      type: "bar",
      label: "Dataset 3",
      backgroundColor: "rgb(53, 162, 235)",
      data: {
        January: 521,
        February: 1372,
        March: 995,
        April: 72,
        May: 314,
        June: 683,
        July: 141,
      },
    },
  ],
};

return (
  <Style>
    <div className="text-bg-dark rounded-4 p-3 mb-4">
      {data !== null ? (
        <p>
          <ChartEl type="type" data={data} />
        </p>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  </Style>
);
