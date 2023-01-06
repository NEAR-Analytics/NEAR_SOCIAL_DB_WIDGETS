State.init({
  _is_on: ["off", "off", "off", "off", "off", "off", "off"],
  _from: ["0", "0", "0", "0", "0", "0", "0"],
  _to: ["1", "1", "1", "1", "1", "1", "1"],
  _time_zone: "(UTC+00:00) UTC",
  _validate_result: true,
  _validate_error: [true, true, true, true, true, true, true],
});
const widgetName = "Instance_time";
const widgetPath = `vow_owner_123.near/widget/${widgetName}`;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);
const card = {
  background: "linear-gradient(to right, #4deeea, #f000ff)",
  border: "1px solid black",
  borderRadius: "5px",
  textAlign: "center",
  color: "white",
  padding: "10px",
};
const button = {
  borderRadius: "5px",
  margin: "5px 0",
  padding: "8px",
  textAlign: "center",
  background: "linear-gradient(to right, #4deeea, #f000ff)",
  border: "2px solid black",
  fontWeight: "bold",
};
const imgWH = {
  width: "25px",
  height: "25px",
};
const time_zones = [
  "(UTC-11:00) Samoa",
  "(UTC-10:00) Hawaii",
  "(UTC-09:00) Alaska",
  "(UTC-08:00) Pacific Time (US &amp; Canada)",
  "(UTC-07:00) Arizona",
  "(UTC-06:00) Central America",
  "(UTC-06:00) Saskatchewan",
  "(UTC-05:00) Eastern Time (US &amp; Canada)",
  "(UTC-04:00) Atlantic Time (Canada)",
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
const utc_times = [
  -11, -10, -9, -8, -7, -6, -6, -5, -4, -4.5, -4, -3.5, -3, -2, -1, 0, 1, 2, 3,
  4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 9, 9, 9, 9.5, 10, 11, 12, 13,
];
const hours = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
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
const data = Social.index("Instance_time", "data");
if (!data) {
  return "Loading datas";
}
var sortedData = data.sort((d1, d2) => d2.blockHeight - d1.blockHeight);
var finalData = [];
var accountIds = [];
const validate = () => {
  var result = true;
  for (var i = 0; i < 7; i++) {
    if (!state._validate_error[i]) result = false;
  }
  State.update({ _validate_result: result });
};
const onTimeChanged = (e, index, is_from_to) => {
  let temp = state._from;
  temp[index] = e.target.value;
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
for (let i = 0; i < sortedData.length; i++) {
  if (accountIds.indexOf(sortedData[i].accountId) < 0) {
    accountIds.push(sortedData[i].accountId);
    var date = new Date();
    var utc_offset = -date.getTimezoneOffset() / 60;
    var times = sortedData[i].value._data;
    var temp = [];
    var flag = false;

    for (var j = 0; j < times.length; j++) {
      const time = times[j] + utc_offset;
      if (time > 168) {
        temp.push(time - 168);
        flag = true;
      } else if (time < 0) {
        temp.push(time + 168);
        flag = true;
      } else temp.push(time);
    }
    const final = sortAndRemoveRepeated(flag, temp);
    for (var m = 0; m < final.length - 1; m += 2) {
      const _from = final[m];
      const _to = final[m + 1];
      for (var o = 1; o < 7; o++) {
        if (o * 24 > _from && o * 24 < _to) {
          final.push(o * 24, o * 24);
        }
      }
    }
    var sortedTimeDataNew = final.sort((d2, d1) => d2 - d1);
    var weeklyData = [];
    for (var t = 0; t < 7; t++) {
      var dailyData = [];
      var exist = false;
      for (var p = 0; p < sortedTimeDataNew.length - 1; p += 2) {
        var _from = sortedTimeDataNew[p];
        var _to = sortedTimeDataNew[p + 1];
        if (_to > t * 24 && _to <= (t + 1) * 24) {
          dailyData.push({
            _from: _from - t * 24,
            _to: _to - t * 24,
          });
          exist = true;
        }
      }
      if (!exist) weeklyData.push({ on_off: "off", data: [] });
      else weeklyData.push({ on_off: "on", data: dailyData });
    }
    finalData.push({
      accountId: sortedData[i].accountId,
      value: {
        _data: weeklyData,
      },
    });
  }
}
return (
  <div>
    <br />
    <br />
    <h3>Weekly Schedule</h3>
    <p>current_user: {context.accountId}</p>
    <div className="d-flex">
      <p>Select Time zone: </p>
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
    <div className="d-flex flex-column w-75 justify-content-around">
      {days.map((day, index) => (
        <div>
          <p>{day}</p>
          <div className="d-flex justify-content-around">
            <p>On or Off</p>
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
            {state._is_on[index] == "on" && (
              <>
                <p>From</p>
                <select
                  value={state._from[index]}
                  onChange={(e) => {
                    onTimeChanged(e, index, true);
                  }}
                >
                  {hours.map((hour) => (
                    <option value={hour}>{hour}</option>
                  ))}
                </select>
                <p>To</p>
                <select
                  value={state._to[index]}
                  onChange={(e) => {
                    onTimeChanged(e, index, false);
                  }}
                >
                  {hours.map((hour) => (
                    <option value={hour}>{hour}</option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
    <p>
      {days.map((day, index) => {
        return !state._validate_error[index] && `${day} `;
      })}
      {!state._validate_result && "time set wrong"}
    </p>
    <CommitButton
      style={button}
      disabled={!state._validate_result}
      data={() => {
        const offset = -utc_times[time_zones.indexOf(state._time_zone)];
        var temp = [];
        var flag = false;
        for (var i = 0; i < 7; i++) {
          if (state._is_on[i] == "on") {
            const _from = parseInt(state._from[i]) + 24 * i + offset;
            const _to = parseInt(state._to[i]) + 24 * i + offset;
            if (_from > 168) {
              temp.push(_from - 168);
              flag = true;
            } else if (_from < 0) {
              temp.push(_from + 168);
              flag = true;
            } else temp.push(_from);
            if (_to < 0) {
              temp.push(_to + 168);
              flag = true;
            } else if (_to > 168) {
              temp.push(_to - 168);
              flag = true;
            } else temp.push(_to);
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
      }}
    >
      Send It!
    </CommitButton>
    <br />
    <br />
    <div>
      {finalData
        ? finalData.map((d) => (
            <div style={card}>
              <Widget
                src="mob.near/widget/ProfileImage"
                props={{
                  accountId: d.accountId,
                  className: "d-inline-block",
                  style: { width: "1.5em", height: "1.5em" },
                }}
              />
              <a
                href={`#/mob.near/widget/ProfilePage?accountId=${d.accountId}`}
              >
                {d.accountId}
              </a>
              <div>
                <div>
                  <b>
                    {d.value._data.map((week, index) => {
                      return (
                        <>
                          <div>{`${days[index]} : ${week.on_off}`}</div>
                          <div>
                            {week.data.map((y) => (
                              <li>{`${y._from} - ${y._to}`}</li>
                            ))}
                          </div>
                        </>
                      );
                    })}
                  </b>
                </div>
              </div>
            </div>
          ))
        : "Loading..."}
    </div>
  </div>
);
