let Style = styled.div`
                `;

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      type: "line",
      fill: true,
      label: "Dataset 1",
      borderWidth: 2,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
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
