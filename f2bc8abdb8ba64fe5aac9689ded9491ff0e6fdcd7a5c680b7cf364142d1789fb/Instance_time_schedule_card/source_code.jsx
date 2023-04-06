const finalData = props.schedule_data ?? null;
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const getFormatedTime = (time) => {
  const hours = parseInt(time);
  const mins = (time - hours) * 60;
  let formated =
    hours > 12
      ? `${hours - 12}:${mins == 0 ? "00" : mins} PM`
      : `${hours}:${mins == 0 ? "00" : mins} AM`;
  return formated;
};

return (
  <>
    <div
      className="p-2"
      style={{
        position: "relative",
        border: "1.5px solid rgb(206, 212, 218)",
        borderRadius: "24px",
        wordWrap: "anywhere",
        width: "100%",
      }}
    >
      <h3
        style={{
          fontWeight: "700",
          fontSize: "1.2rem",
          marginBottom: "1.2rem",
        }}
      >
        Schedule
      </h3>
      {finalData &&
        finalData.value._data.map((week, index) => {
          return (
            <div
              style={{
                paddingTop: font_small,
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.5rem",
              }}
            >
              <div style={{ fontSize: font_small }}>{`${days[index]}`}</div>
              <div style={{ display: "flex" }}>
                {week.on_off == "on" ? (
                  week.data.map((y) => (
                    <p style={{ paddingRight: "0.7rem", fontSize: font_small }}>
                      {getFormatedTime(y._from)}~{getFormatedTime(y._to)}
                    </p>
                  ))
                ) : (
                  <span
                    style={{
                      backgroundColor: "#FFE5E5",
                      textAlign: "center",
                      borderRadius: "16px",
                      marginRight: font_small,
                      fontSize: font_small,
                      letterSpacing: "-0.025rem",
                      color: "#FF4747",
                      fontWeight: "500",
                      padding: "0.5rem 2rem",
                    }}
                  >
                    Off
                  </span>
                )}
              </div>
            </div>
          );
        })}
    </div>
  </>
);
