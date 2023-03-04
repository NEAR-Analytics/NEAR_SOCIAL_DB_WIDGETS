const generate = () => {
  // Create an empty array to hold the objects
  const dataArray = [] || [{ empty: true }];

  // Loop through each day of 2023
  for (let i = 0; i < 365; i++) {
    // Create a new date object for the current day
    const date = new Date(2023, 0, i + 1);

    // Generate a random number between 0-6 for the value
    const value = Math.floor(Math.random() * 7);

    // Create a new object with the date and value and add it to the array
    dataArray.push({ date: date.toISOString(), value });
  }

  // Print the array to the console
  // console.log(dataArray);

  return dataArray;
};

const array = generate();

return (
  <div className="contributions">
    <div className="header">
      <div className="headerContent">
        <p>Jan</p>
        <p>Feb</p>
        <p>Mar</p>
        <p>Apr</p>
        <p>May</p>
        <p>Jun</p>
        <p>Jul</p>
        <p>Aug</p>
        <p>Sep</p>
        <p>Oct</p>
        <p>Nov</p>
        <p>Dec</p>
      </div>
    </div>

    <div className="contributionsContainer">
      <div className="weekdays">
        <p className="weekday" />
        <p className="weekday">Mon</p>
        <p className="weekday" />
        <p className="weekday">Wed</p>
        <p className="weekday" />
        <p className="weekday">Fir</p>
        <p className="weekday" />
      </div>
      <div className="contributionsContent">
        {array?.map((item, index) => {
          let color;

          if (item?.value === 0)
            color = props.theme === "light" ? "#ebedf0" : "#161b22";
          else if (item?.value === 1)
            color = props.theme === "light" ? "#9be9a8" : "#0e4429";
          else if (item?.value === 2)
            color = props.theme === "light" ? "#40c463" : "#26a641";
          else if (item?.value === 3)
            color = props.theme === "light" ? "#30a14e" : "#26a641";
          else color = props.theme === "light" ? "#216e39" : "#39d353";

          const date = new Date(item.date);
          const options = {
            day: "2-digit",
            month: "short",
            year: "numeric",
          };
          const formattedDate = date.toLocaleDateString("en-GB", options);

          return (
            <Widget
              src="saidulbadhon.testnet/widget/Profile.Contributions.Item"
              props={{
                color: color,
                date: formattedDate,
                item,
                theme: props.theme,
              }}
            />
          );
        })}
      </div>
    </div>

    <div className="footer">
      <p className="footerText">Less</p>
      <div
        style={{
          backgroundColor: props.theme === "light" ? "#ebedf0" : "#161b22",
        }}
      />
      <div
        style={{
          backgroundColor: props.theme === "light" ? "#9be9a8" : "#0e4429",
        }}
      />
      <div
        style={{
          backgroundColor: props.theme === "light" ? "#40c463" : "#26a641",
        }}
      />
      <div
        style={{
          backgroundColor: props.theme === "light" ? "#30a14e" : "#26a641",
        }}
      />
      <div
        style={{
          backgroundColor: props.theme === "light" ? "#216e39" : "#39d353",
        }}
      />
      <p className="footerText">More</p>
    </div>
  </div>
);
