State.init({
  _is_on: ["on", "on", "on", "on", "on", "off", "off"],
  _from: ["10", "10", "10", "10", "10", "10", "10"],
  _to: ["18", "18", "18", "18", "18", "18", "18"],
  _time_zone: "(UTC+00:00) UTC",
  _validate_result: true,
  _validate_error: [true, true, true, true, true, true, true],
});
const button = {
  borderRadius: "5px",
  margin: "5px 0",
  padding: "8px",
  marginTop: "10px",
  textAlign: "center",
  background: "linear-gradient(to right, #4deeea, #f000ff)",
  border: "2px solid black",
  fontWeight: "bold",
};
const table = {
  display: "flex",
  flex: "1",
  marginTop: "1rem",
};
const flex_row = {
  display: "flex",
  flexDirection: "row",
};
const flex_column = {
  display: "flex",
  flexDirection: "column",
};
const time_zones = [
  "(UTC-11:00) Samoa",
  "(UTC-10:00) Hawaii",
  "(UTC-09:00) Alaska",
  "(UTC-08:00) Pacific Time",
  "(UTC-07:00) Arizona",
  "(UTC-06:00) Central America",
  "(UTC-06:00) Saskatchewan",
  "(UTC-05:00) Eastern Time",
  "(UTC-04:00) Atlantic Time",
  "(UTC-04:30) Caracas",
  "(UTC-04:00) Santiago",
  "(UTC-03:30) Newfoundland",
  "(UTC-03:00) Brasilia",
  "(UTC-02:00) Mid-Atlantic",
  "(UTC-01:00) Azores",
  "(UTC+00:00) UTC",
  "(UTC+01:00) Amsterdam",
  "(UTC+02:00) Athens",
  "(UTC+03:00) Baghdad",
  "(UTC+04:00) Abu Dhabi",
  "(UTC+04:30) Kabul",
  "(UTC+05:00) Islamabad",
  "(UTC+05:30) Chennai",
  "(UTC+05:45) Kathmandu",
  "(UTC+06:00) Almaty",
  "(UTC+06:30) Rangoon",
  "(UTC+07:00) Bangkok",
  "(UTC+08:00) Beijing",
  "(UTC+09:00) Irkutsk",
  "(UTC+09:00) Seoul",
  "(UTC+09:00) Tokyo",
  "(UTC+09:30) Adelaide",
  "(UTC+10:00) Guam",
  "(UTC+11:00) Vladivostok",
  "(UTC+12:00) Auckland",
  "(UTC+13:00) Nuku'alofa",
];
const hours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24,
];
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

const validate = () => {
  var result = true;
  for (var i = 0; i < 7; i++) {
    if (!state._validate_error[i]) result = false;
  }
  State.update({ _validate_result: result });
};
const onTimeChanged = (value, index, is_from_to) => {
  let temp = is_from_to ? state._from : state._to;
  temp[index] = value;
  is_from_to ? State.update({ _from: temp }) : State.update({ _to: temp });
  let error_temp = state._validate_error;
  if (parseInt(state._from[index]) >= parseInt(state._to[index])) {
    error_temp[index] = false;
  } else {
    error_temp[index] = true;
  }
  validate();
  State.update({
    _validate_error: error_temp,
  });
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
  var zone = state._time_zone.split(" ")[0].split("UTC")[1].split(":");
  var hours = parseInt(zone[0]);
  var offset = hours + (parseInt(zone[1]) / 60) * ((hours > 0) * 2 - 1);
  var temp = [];
  var flag = false;
  for (var i = 0; i < 7; i++) {
    if (state._is_on[i] == "on") {
      for (var j = 0; j < 2; j++) {
        const time =
          j == 0
            ? parseInt(state._from[i]) + 24 * i - offset
            : parseInt(state._to[i]) + 24 * i - offset;
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

return (
  <div>
    <br />
    <br />
    <div style={flex_column} className="align-self-center">
      <h3>Weekly Schedule</h3>
      <div style={flex_row} className="align-items-center">
        <div className="p-2" style={table}>
          current_user:
        </div>
        <div style={table}>{context.accountId}</div>
      </div>
      <div style={flex_row}>
        <div className="p-2 flex-1" style={table}>
          Select Time zone:
        </div>
        <div style={table}>
          <select
            name="zones"
            id="zones"
            value={state._time_zone}
            onChange={(e) => {
              State.update({ _time_zone: e.target.value });
            }}
          >
            {time_zones.map((zone) => (
              <option value={zone}>{zone}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
    <div style={flex_column} className="mt-3">
      <div style={flex_row}>
        {tbl_headers.map((header) => (
          <div style={table}>{header}</div>
        ))}
      </div>
      {days.map((day, index) => (
        <div style={flex_row}>
          <div style={table}>{day}</div>
          <div style={table}>
            <select
              value={state._is_on[index]}
              onChange={(e) => {
                let temp = state._is_on;
                temp[index] = e.target.value;
                State.update({ _is_on: temp });
                if (e.target.value == "off") {
                  state._from[index] = "0";
                  state._to[index] = "1";
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
          <div style={table}>
            <div className="d-flex">
              <select
                value={state._from[index]}
                disabled={state._is_on[index] == "off"}
                onChange={(e) => {
                  onTimeChanged(e.target.value, index, true);
                }}
              >
                {hours.map((hour) => (
                  <option value={hour}>{hour}</option>
                ))}
              </select>
            </div>
            <div style={flex_column}>
              <div
                onClick={() => {
                  onTimeChanged(parseInt(state._from[index]) + 1, index, true);
                }}
              >
                <i class="bi-caret-up"></i>
              </div>
              <div
                onClick={() => {
                  onTimeChanged(parseInt(state._from[index]) - 1, index, true);
                }}
              >
                <i class="bi-caret-down"></i>
              </div>
            </div>
          </div>
          <div style={table}>
            <div style={flex_row}>
              <select
                value={state._to[index]}
                disabled={state._is_on[index] == "off"}
                onChange={(e) => {
                  onTimeChanged(e.target.value, index, false);
                }}
              >
                {hours.map((hour) => (
                  <option value={hour}>{hour}</option>
                ))}
              </select>
            </div>
            <div style={flex_column}>
              <div
                onClick={() => {
                  onTimeChanged(parseInt(state._to[index]) + 1, index, false);
                }}
              >
                <i class="bi-caret-up"></i>
              </div>
              <div
                onClick={() => {
                  onTimeChanged(parseInt(state._to[index]) - 1, index, false);
                }}
              >
                <i class="bi-caret-down"></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <CommitButton
      style={button}
      disabled={!state._validate_result}
      data={getData()}
    >
      Send It!
    </CommitButton>
    <div className="pt=4">
      {days.map((day, index) => {
        return !state._validate_error[index] && `${day} `;
      })}
      {!state._validate_result && "time set wrong"}
    </div>
    <br />
    <br />
    <div>
      <Widget
        src="vow_owner_123.near/widget/Instance_time_review"
        props={{
          accountId: d.accountId,
          className: "d-inline-block",
          style: { width: "1.5em", height: "1.5em" },
        }}
      />
    </div>
  </div>
);
