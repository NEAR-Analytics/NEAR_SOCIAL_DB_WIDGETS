const data = Social.index("Instance_time", "schedule");
if (!data) {
  return "Loading datas";
}
var sortedData = data.sort((d1, d2) => d1.blockHeight - d2.blockHeight);
var finalData = {};

const sortAndRemoveRepeated = (flag, data) => {
  var temp = data;
  const flag1 = data.indexOf(0);
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
    if (!repeated) {
      if (
        !(
          (flag1 && sortedTimeData[k] == 0) ||
          (flag1 && sortedTimeData[k] == 168)
        )
      )
        final.push(sortedTimeData[k]);
    }
  }
  return final;
};

for (let i = 0; i < sortedData.length; i++) {
  if (sortedData[i].accountId == context.accountId) {
    var time_zone = sortedData[i].value._time_zone ?? "(UTC+00:00) UTC";
    var zone = time_zone.split(" ")[0].split("UTC")[1].split(":");
    var hour = parseInt(zone[0]);
    var utc_offset = hour + (parseInt(zone[1]) / 60) * ((hour > 0) * 2 - 1);
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
    finalData = {
      schedule: weeklyData,
      time_zone: time_zone,
      is_on: sortedData[i].value._is_on,
    };
  }
}
console.log("finalData: ", finalData);

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
const getFormatedTime = (time) => {
  const hours = parseInt(time);
  const mins = (time - hours) * 60;
  let formated = `${hours}:${mins == 0 ? "00" : mins}`;

  return formated;
};
State.init({
  hoveringElement: "",
  _account: "All",
  _time_zone: finalData.time_zone ?? "(UTC+00:00) UTC",
  _is_on: finalData.is_on ?? "off",
});

const profile = Social.getr(`${context.accountId}/profile`);
const flex_column = {
  display: "flex",
  flexDirection: "column",
};
const comboBox = {
  background: "rgb(230, 230, 230)",
  color: "black",
  borderRadius: "1rem",
  padding: "1rem",
  fontWeight: "500",
  fontSize: "1rem",
};
const set_schedule = () => {
  State.update({ _time_zone: finalData.time_zone ?? "(UTC+00:00) UTC" });
};
return (
  <div>
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
            color: "black",
            borderRadius: "2rem",
            fontWeight: 600,
            fontSize: "x-large",
          }}
        >
          Weekly Schedule
        </div>
        <div class="d-flex flex-column">
          <div>{profile.name}</div>
          <div>@{context.accountId}</div>
          <div>
            {`(UTC ${getFormatedTime(
              new Date().getTimezoneOffset() / 60
            )}) ${new Date()
              .toLocaleDateString(undefined, {
                day: "2-digit",
                timeZoneName: "long",
              })
              .substring(4)}`}
          </div>
        </div>
      </div>
      <div className="w-100 d-flex flex-row justify-content-between align-items-center">
        <div>
          <select
            style={comboBox}
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
          <select
            style={comboBox}
            value={state._is_on}
            onChange={(e) => {
              State.update({ _is_on: e.target.value });
            }}
          >
            <option value="on">on</option>
            <option value="off">off</option>
          </select>
        </div>
        <div>
          <a
            href="https://near.social/#/vow_owner_123.near/widget/Instance_time"
            onMouseEnter={() => {
              State.update({ hoveringElement: "create" });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            style={
              state.hoveringElement == "create"
                ? {
                    border: "2px solid transparent",
                    fontWeight: "500",
                    fontSize: "1rem",
                    padding: "0.3rem 1.5rem",
                    backgroundColor: "#010A2D",
                    borderRadius: "12px",
                    color: "white",
                    textDecoration: "none",
                  }
                : {
                    border: "2px solid black",
                    color: "black",
                    backgroundColor: "white",
                    fontWeight: "500",
                    fontSize: "1rem",
                    padding: "0.3rem 1.5rem",
                    borderRadius: "12px",
                  }
            }
          >
            View Schedules
          </a>
        </div>
      </div>
    </div>
    <div className="align-items-center pt-3">
      <Widget
        src={`vow_owner_123.near/widget/Instance_time_setting`}
        props={{
          data: {
            schedule: finalData.schedule,
            time_zone: state._time_zone,
            is_on: state._is_on,
          },
          style: { width: "100%", height: "1.5em" },
        }}
        rawCode={show}
      />
    </div>
  </div>
);
