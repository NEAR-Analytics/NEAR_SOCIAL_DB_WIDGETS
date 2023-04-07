const updateInstanceTimeState = props.updateInstanceTimeState;
const tabs = props.tabs;

const thisWidgetInlineStyles =
  props.allWidgetsInlineStyles.instance_time_setting;
const thisWidgetClassNames = props.allWidgetsClassNames.instance_time_setting;

const sortAndRemoveRepeated = (flag, data) => {
  var temp = data;
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
    if (!repeated) final.push(sortedTimeData[k]);
  }
  return final;
};

const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

const getFormatedTime = (time) => {
  const hours = parseInt(time);
  const mins = (time - hours) * 60;
  const formated =
    hours > 12
      ? `${hours - 12 < 10 ? "0" : ""}${hours - 12}:${
          mins == 0 ? "00" : mins
        } PM`
      : `${hours < 10 ? "0" : ""}${hours}:${mins == 0 ? "00" : mins} AM`;
  return formated;
};
const time_zone = props.data.time_zone ?? "(UTC+00:00) UTC";
var is_on = [false, false, false, false, false, false, false];
var _from = [
  "10:00 AM",
  "10:00 AM",
  "10:00 AM",
  "10:00 AM",
  "10:00 AM",
  "10:00 AM",
  "10:00 AM",
];
var _to = [
  "06:00 PM",
  "06:00 PM",
  "06:00 PM",
  "06:00 PM",
  "06:00 PM",
  "06:00 PM",
  "06:00 PM",
];

if (props.data.schedule) {
  for (var i = 0; i < 7; i++) {
    is_on[i] = props.data.schedule[i].on_off;
    if (is_on[i] == "on") {
      _from[i] = getFormatedTime(props.data.schedule[i].data[0]._from);
      _to[i] = getFormatedTime(props.data.schedule[i].data[0]._to);
    }
  }
}
State.init({
  _is_on: is_on,
  _from: _from,
  _to: _to,
  _validate_result: true,
  _validate_error: [true, true, true, true, true, true, true],
  _sent: false,
  hoveringElement: "",
});

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
const tbl_headers = ["Day", "Off/On", "From", "To"];
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

const getData = () => {
  var zone = time_zone.split(" ")[0].split("UTC")[1].split(":");
  var hours = parseInt(zone[0]);
  var offset = hours + (parseInt(zone[1]) / 60) * ((hours > 0) * 2 - 1);
  var temp = [];
  var flag = false;
  for (var i = 0; i < 7; i++) {
    if (state._is_on[i]) {
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
  return {
    index: {
      Instance_time: JSON.stringify(
        {
          key: "schedule",
          value: {
            _data: final,
            _time_zone: time_zone,
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
    <div style={thisWidgetInlineStyles.timeSelectorContainer}>
      <div className={thisWidgetClassNames.timeSelector}>
        <select
          style={
            state._is_on[index]
              ? thisWidgetInlineStyles.comboBoxActive
              : thisWidgetInlineStyles.comboBoxInactive
          }
          value={f ? state._from[index] : state._to[index]}
          disabled={!state._is_on[index]}
          onChange={(e) => {
            onTimeChanged(e.target.value, index, f, 0);
          }}
        >
          {hours.map((hour) => (
            <option value={hour}>{hour}</option>
          ))}
        </select>
      </div>
      <div className={thisWidgetClassNames.caretsContainer}>
        <div
          onClick={() => {
            if (state._is_on[index]) {
              const value = f ? state._from[index] : state._to[index];
              onTimeChanged(value, index, f, 1);
            }
          }}
        >
          <i
            className={thisWidgetClassNames.caretUpIcon}
            style={
              state._is_on[index]
                ? thisWidgetInlineStyles.colorActive
                : thisWidgetInlineStyles.colorInactive
            }
          ></i>
        </div>
        <div
          onClick={() => {
            if (state._is_on[index]) {
              const value = f ? state._from[index] : state._to[index];
              onTimeChanged(value, index, f, -1);
            }
          }}
        >
          <i
            className={thisWidgetClassNames.caretDownIcon}
            style={
              state._is_on[index]
                ? thisWidgetInlineStyles.colorActive
                : thisWidgetInlineStyles.colorInactive
            }
          ></i>
        </div>
      </div>
    </div>
  );
};

const renderDayRow = (day, index, size) => {
  return (
    <>
      <div
        className={`${thisWidgetClassNames.dayContainer} ${
          size == "big"
            ? thisWidgetClassNames.showInMidAndBigScreens
            : thisWidgetClassNames.showInSmallerScreens
        }`}
        style={thisWidgetInlineStyles.dayContainer}
      >
        <div style={thisWidgetInlineStyles.dayPartContainer}>
          <div
            className={thisWidgetClassNames.infoAndTitleContainer}
            style={thisWidgetInlineStyles.infoAndTitleContainer}
          >
            <p
              className={thisWidgetClassNames.showInResponsive}
              style={thisWidgetInlineStyles.fontW600}
            >
              {tbl_headers[0]}
            </p>
            <p style={thisWidgetInlineStyles.fontW600}>{day}</p>
          </div>
          <div
            className={thisWidgetClassNames.infoAndTitleContainer}
            style={thisWidgetInlineStyles.infoAndTitleContainer}
          >
            <p
              className={thisWidgetClassNames.showInResponsive}
              style={thisWidgetInlineStyles.fontW600}
            >
              {tbl_headers[1]}
            </p>

            <div className="form-check form-switch">
              <input
                style={
                  state._is_on[index]
                    ? thisWidgetInlineStyles.inputActive
                    : thisWidgetInlineStyles.inputInactive
                }
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={state._is_on[index]}
                id={day + index}
                key={day + index + state._is_on[index]}
                onChange={(e) => {
                  let temp = state._is_on;
                  temp[index] = !temp[index];
                  State.update({ _is_on: temp });
                  if (!e.target.value) {
                    state._from[index] = "0";
                    state._to[index] = "0";
                    let error_temp = state._validate_error;
                    State.update({
                      _error_msg: `${(error_temp[index] = true)}`,
                    });
                    validate();
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div style={thisWidgetInlineStyles.dayPartContainer}>
          <div
            className={thisWidgetClassNames.infoAndTitleContainer}
            style={thisWidgetInlineStyles.infoAndTitleContainer}
          >
            <p
              className={thisWidgetClassNames.showInResponsive}
              style={thisWidgetInlineStyles.fontW600}
            >
              {tbl_headers[2]}
            </p>
            {timeSelector(true, index)}
          </div>
          <div
            className={thisWidgetClassNames.infoAndTitleContainer}
            style={thisWidgetInlineStyles.infoAndTitleContainer}
          >
            <p
              className={thisWidgetClassNames.showInResponsive}
              style={thisWidgetInlineStyles.fontW600}
            >
              {tbl_headers[3]}
            </p>
            {timeSelector(false, index)}
          </div>
        </div>
      </div>
    </>
  );
};

return (
  <div>
    {context.accountId ? (
      <div
        style={thisWidgetInlineStyles.logedInGeneralContainer}
        className={thisWidgetClassNames.logedInGeneralContainer}
      >
        <div style={thisWidgetInlineStyles.logedInSecondContainer}>
          <div
            style={thisWidgetInlineStyles.logedInThirdContainer}
            className={thisWidgetInlineStyles.logedInThirdContainer}
          >
            <div
              style={thisWidgetInlineStyles.headerContainer}
              className={thisWidgetClassNames.headerContainer}
            >
              {tbl_headers.map((header) => (
                <div style={thisWidgetInlineStyles.headerElement}>{header}</div>
              ))}
            </div>
            {days.map((day, index) => (
              <>
                {renderDayRow(day, index, "big")}

                {renderDayRow(day, index, "small")}
              </>
            ))}
          </div>
        </div>
        <div style={thisWidgetInlineStyles.showErrorContainer}>
          {days.map((day, index) => {
            return !state._validate_error[index] && `${day} `;
          })}
          {!state._validate_result && "time set wrong"}
        </div>
        <div className={thisWidgetClassNames.buttonsContainer}>
          {!state._sent ? (
            <CommitButton
              style={
                state.hoveringElement == "saveButton"
                  ? thisWidgetInlineStyles.buttonHovered
                  : thisWidgetInlineStyles.buttonStandard
              }
              onMouseEnter={() => {
                State.update({ hoveringElement: "saveButton" });
              }}
              onMouseLeave={() => {
                State.update({ hoveringElement: "" });
              }}
              onCommit={() => {
                State.update({ _sent: true });
              }}
              disabled={!state._validate_result}
              data={getData()}
            >
              Save
            </CommitButton>
          ) : (
            <button
              onClick={() => {
                updateInstanceTimeState({ tab: tabs.ALL_SCHEDULE.id });
              }}
              style={
                state.hoveringElement == "viewScheduels"
                  ? thisWidgetInlineStyles.buttonHovered
                  : thisWidgetInlineStyles.buttonStandard
              }
              onMouseEnter={() => {
                State.update({ hoveringElement: "viewScheduels" });
              }}
              onMouseLeave={() => {
                State.update({ hoveringElement: "" });
              }}
            >
              View Scheduels
            </button>
          )}

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
                ? thisWidgetInlineStyles.buttonHovered
                : thisWidgetInlineStyles.buttonStandard
            }
          >
            Cancel
          </button>
        </div>
      </div>
    ) : (
      <div>SignIn first plz!</div>
    )}
  </div>
);
