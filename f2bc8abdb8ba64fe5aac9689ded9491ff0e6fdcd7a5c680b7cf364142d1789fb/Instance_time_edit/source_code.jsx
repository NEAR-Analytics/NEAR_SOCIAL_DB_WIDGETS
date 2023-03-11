const data = props.data;

const updateInstanceTimeState = props.updateInstanceTimeState;
const tabs = props.tabs;

var sortedData =
  data && data.length
    ? data.sort((d1, d2) => d1.blockHeight - d2.blockHeight)
    : [];
var finalData = {};

const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

const sortAndRemoveRepeated = (flag, data) => {
  var temp = data;
  const flag1 = data.indexOf(0);
  if (flag) temp.push(0, 168);
  var sortedTimeData =
    temp && temp.length ? temp.sort((d2, d1) => d2 - d1) : [];

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
    var sortedTimeDataNew =
      final && final.length ? final.sort((d2, d1) => d2 - d1) : [];
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
  sectionShown: "timeZoneSelector",
});

const flex_column = {
  display: "flex",
  flexDirection: "column",
};

const set_schedule = () => {
  State.update({ _time_zone: finalData.time_zone ?? "(UTC+00:00) UTC" });
};
return (
  <div
    className="px-4"
    style={{
      backgroundColor: "white",
      borderRadius: "28px",
      margin: "2rem auto 1rem auto",
      width: "60%",
    }}
  >
    <div className="w-100 d-flex flex-row justify-content-between align-items-center">
      <h2
        style={{
          padding: "2rem",
          margin: "2rem 0 0.5rem 0",
          fontWeight: "700",
        }}
      >
        {tabs.NEW_SCHEDULE.text}
      </h2>
      <i
        className="bi bi-x-lg"
        style={{
          right: "2rem",
          top: "2rem",
          cursor: "pointer",
        }}
        onClick={() => {
          updateInstanceTimeState({ showAbortScheduleCreation: true });
        }}
      ></i>
    </div>

    <div className="pt-4" style={{ margin: "0 auto" }}>
      <span
        style={
          state.sectionShown == "timeZoneSelector"
            ? {
                ...styleUnderline,
                color: "#353A40",
                fontSize: "0.8rem",
                userSelect: "none",
                cursor: "pointer",
                marginRight: "1rem",
              }
            : {
                color: "#767B8E",
                fontSize: "0.8rem",
                userSelect: "none",
                cursor: "pointer",
                marginRight: "1rem",
              }
        }
        onClick={() => {
          State.update({ sectionShown: "timeZoneSelector" });
        }}
      >
        <i className="bi bi-square-fill"></i> Time zone
      </span>

      <span
        style={
          state.sectionShown == "makeSchedule"
            ? {
                ...styleUnderline,
                color: "#353A40",
                fontSize: "0.8rem",
                userSelect: "none",
                position: "relative",
                cursor: "pointer",
              }
            : {
                color: "#767B8E",
                fontSize: "0.8rem",
                position: "relative",
                userSelect: "none",
                cursor: "pointer",
              }
        }
        onClick={() => {
          State.update({ sectionShown: "makeSchedule" });
        }}
      >
        <i className="bi bi-square-fill"></i>
        Shedule
      </span>
    </div>
    {state.sectionShown == "timeZoneSelector" ? (
      <div className="pb-4">
        <label
          for="pollTitle"
          style={{
            fontSize: "0.8rem",
            letterSpacing: "-0.01em",
            color: "#474D55",
            marginBottom: "0.3rem",
          }}
        >
          Select time zone:
        </label>
        <select
          style={{
            backgroundColor: "white",
            padding: "0.5rem 1.5rem",
            borderRadius: "0.8rem",
            border: "1.5px solid #E1E9F0",
            color: "#474D55",
            letterSpacing: "-0.01em",
            width: "50%",
            display: "block",
          }}
          className="mb-4"
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
        <div className="d-flex flex-row-reverse justify-content-between">
          <button
            style={
              state.hoveringElement == "continueButton"
                ? {
                    border: "2px solid black",
                    color: "black",
                    backgroundColor: "white",
                    fontWeight: "500",
                    fontSize: "1rem",
                    margin: "0",
                    padding: "0.3rem 1.5rem",
                    borderRadius: "12px",
                  }
                : {
                    border: "2px solid transparent",
                    fontWeight: "500",
                    fontSize: "1rem",
                    margin: "0",
                    padding: "0.3rem 1.5rem",
                    backgroundColor: "#010A2D",
                    borderRadius: "12px",
                    color: "white",
                  }
            }
            onMouseEnter={() => {
              State.update({ hoveringElement: "continueButton" });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            onClick={() => State.update({ sectionShown: "makeSchedule" })}
          >
            Continue
          </button>

          <button
            onMouseEnter={() => {
              State.update({ hoveringElement: "cancelNewSchedule" });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            onClick={() => {
              updateInstanceTimeState({ showAbortScheduleCreation: true });
            }}
            style={
              state.hoveringElement == "cancelNewSchedule"
                ? {
                    border: "2px solid transparent",
                    fontWeight: "500",
                    fontSize: "1rem",
                    padding: "0.3rem 1.5rem",
                    backgroundColor: "#010A2D",
                    borderRadius: "12px",
                    color: "white",
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
            Cancel
          </button>
        </div>
      </div>
    ) : (
      <div className="align-items-center pt-3 pb-4">
        <Widget
          src={`${widgetOwner}/widget/Instance_time_setting`}
          props={{
            data: {
              schedule: finalData.schedule,
              time_zone: state._time_zone,
            },
            style: { width: "100%", height: "1.5em" },
            updateInstanceTimeState,
            tabs,
          }}
          rawCode={show}
        />
      </div>
    )}
  </div>
);
