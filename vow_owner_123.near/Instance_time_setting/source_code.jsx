State.init({
  _is_on: ["on", "on", "on", "on", "on", "off", "off"],
  _from: [
    "10:00 AM",
    "10:00 AM",
    "10:00 AM",
    "10:00 AM",
    "10:00 AM",
    "10:00 AM",
    "10:00 AM",
  ],
  _to: [
    "06:00 PM",
    "06:00 PM",
    "06:00 PM",
    "06:00 PM",
    "06:00 PM",
    "06:00 PM",
    "06:00 PM",
  ],
  _validate_result: true,
  _validate_error: [true, true, true, true, true, true, true],
  hoveringElement: "",
});
const time_zone = props.time_zone ?? "(UTC+00:00) UTC";
const container = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  color: "black",
  fontWeight: 400,
  borderRadius: "1rem",
  flexDirection: "column",
};
const tbl_container = {
  display: "flex",
  marginTop: "1rem",
  justifyContent: "center",
  padding: "2rem",
  color: "black",
  fontWeight: 400,
  borderRadius: "1rem",
  flexDirection: "column",
};
const button = {
  borderRadius: "5px",
  margin: "5px 0",
  padding: "8px",
  marginTop: "10px",
  textAlign: "center",
  fontSize: "x-large",
  border: "2px solid black",
  fontWeight: "bold",
};
const comboBox = {
  borderRadius: "1rem",
  padding: "1rem",
};
const table = {
  display: "flex",
  flex: "1",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 600,
};
const flex_row = {
  display: "flex",
  flex: "1",
  flexDirection: "row",
  fontSize: "large",
};
const hours = [];
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const tbl_headers = ["Day", "On", "From", "To"];
const initialize = () => {
  hours = [];
  for (var i = 0; i < 2; i++)
    for (var j = 0; j <= 12; j++)
      for (var k = 0; k < 4; k++) {
        i % 2 == 0
          ? hours.push(`${j < 10 ? `0${j}` : j}:${k == 0 ? "00" : k * 15} AM`)
          : hours.push(`${j < 10 ? `0${j}` : j}:${k == 0 ? "00" : k * 15} PM`);
      }
};
initialize();

const validate = () => {
  var result = true;
  for (var i = 0; i < 7; i++) {
    if (!state._validate_error[i]) result = false;
  }
  State.update({ _validate_result: result });
};
const getTime = (time) => {
  const ap = time.split(" ")[1];
  const hour = parseInt(time.split(":")[0]);
  const mins = parseInt(time.split(":")[1]) / 60;
  const time_by_hours = ap == "AM" ? hour + mins : hour + 12 + mins;
  return time_by_hours;
};
const onTimeChanged = (value, index, is_from_to, in_de) => {
  let temp = is_from_to ? state._from : state._to;
  const i = hours.indexOf(value);
  console.log(i, in_de);
  if (i + in_de >= 0 && i + in_de < hours.length) {
    temp[index] = hours[i + in_de];
    is_from_to ? State.update({ _from: temp }) : State.update({ _to: temp });
    let error_temp = state._validate_error;
    if (getTime(state._from[index]) >= getTime(state._to[index])) {
      error_temp[index] = false;
    } else {
      error_temp[index] = true;
    }
    validate();
    State.update({
      _validate_error: error_temp,
    });
  }
};
const sortAndRemoveRepeated = (flag, data) => {
  var temp = data;
  if (flag) temp.push(0, 168);
  var sortedTimeData = temp.sort((d2, d1) => d2 - d1);

  var final = [];
  for (var k = 0; k < sortedTimeData.length; k++) {
    var repeated = false;
    for (var l = 0; l < sortedTimeData.length; l++) {
      if (k != l && sortedTimeData[k] == sortedTimeData[l]) {
        repeated = true;
      }
    }
    if (!repeated) final.push(sortedTimeData[k]);
  }
  return final;
};
const getData = () => {
  var zone = time_zone.split(" ")[0].split("UTC")[1].split(":");
  var hours = parseInt(zone[0]);
  var offset = hours + (parseInt(zone[1]) / 60) * ((hours > 0) * 2 - 1);
  var temp = [];
  var flag = false;
  for (var i = 0; i < 7; i++) {
    if (state._is_on[i] == "on") {
      for (var j = 0; j < 2; j++) {
        const time =
          j == 0
            ? getTime(state._from[i]) + 24 * i - offset
            : getTime(state._to[i]) + 24 * i - offset;
        if (time > 168) {
          temp.push(time - 168);
          flag = true;
        } else if (time < 0) {
          temp.push(time + 168);
          flag = true;
        } else temp.push(time);
      }
    }
  }
  const final = sortAndRemoveRepeated(flag, temp);
  console.log("final", final);
  return {
    index: {
      Instance_time: JSON.stringify(
        {
          key: "data",
          value: {
            _data: final,
          },
        },
        undefined,
        0
      ),
    },
  };
};
const timeSelector = (f, index) => {
  return (
    <div style={table}>
      <div className="d-flex">
        <select
          style={comboBox}
          value={f ? state._from[index] : state._to[index]}
          disabled={state._is_on[index] == "off"}
          onChange={(e) => {
            onTimeChanged(e.target.value, index, f, 0);
          }}
        >
          {hours.map((hour) => (
            <option value={hour}>{hour}</option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          onClick={() => {
            const value = f ? state._from[index] : state._to[index];
            onTimeChanged(value, index, f, 1);
          }}
        >
          <i class="bi-caret-up"></i>
        </div>
        <div
          onClick={() => {
            const value = f ? state._from[index] : state._to[index];
            onTimeChanged(value, index, f, -1);
          }}
        >
          <i class="bi-caret-down"></i>
        </div>
      </div>
    </div>
  );
};

return (
  <div
    style={{
      borderRadius: "3px",
      backgroundColor: "rgb(230, 230, 230)",
      width: "100%",
      padding: "0.5rem",
    }}
  >
    {context.accountId ? (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        className="align-items-center"
      >
        <div style={container}>
          <div style={tbl_container}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              className="mt-3"
            >
              <div
                style={{
                  display: "flex",
                  background: "white",
                  border: "2px solid grey",
                  padding: "6px",
                }}
              >
                <div style={flex_row}>
                  {tbl_headers.map((header) => (
                    <div style={table}>{header}</div>
                  ))}
                </div>
              </div>
              {days.map((day, index) => (
                <div
                  style={{
                    display: "flex",
                    background: "white",
                    borderBottom: "2px solid grey",
                    borderLeft: "2px solid grey",
                    borderRight: "2px solid grey",
                    padding: "6px",
                  }}
                >
                  <div style={flex_row}>
                    <div style={table}>{day}</div>
                    <div style={table}>
                      <select
                        style={comboBox}
                        value={state._is_on[index]}
                        onChange={(e) => {
                          let temp = state._is_on;
                          temp[index] = e.target.value;
                          State.update({ _is_on: temp });
                          if (e.target.value == "off") {
                            state._from[index] = "0";
                            state._to[index] = "0";
                            let error_temp = state._validate_error;
                            State.update({
                              _error_msg: `${(error_temp[index] = true)}`,
                            });
                            validate();
                          }
                        }}
                      >
                        <option value="on">on</option>
                        <option value="off">off</option>
                      </select>
                    </div>
                    {timeSelector(true, index)}
                    {timeSelector(false, index)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: "1",
            flexDirection: "row",
            fontSize: "large",
            color: "red",
          }}
        >
          {days.map((day, index) => {
            return !state._validate_error[index] && `${day} `;
          })}
          {!state._validate_result && "time set wrong"}
        </div>
        <div
          style={flex_row}
          onMouseEnter={() => {
            State.update({ hoveringElement: "send" });
          }}
          onMouseLeave={() => {
            State.update({ hoveringElement: "" });
          }}
        >
          <CommitButton
            className="m-2"
            style={{
              border: "2px solid transparent",
              fontWeight: "500",
              fontSize: "1.5rem",
              padding: "0.3rem 1.5rem",
              backgroundColor: "#010A2D",
              borderRadius: "12px",
              color: "white",
            }}
            disabled={!state._validate_result}
            data={getData()}
          >
            Send It!
          </CommitButton>
        </div>
      </div>
    ) : (
      <div>SignIn first plz!</div>
    )}
  </div>
);
