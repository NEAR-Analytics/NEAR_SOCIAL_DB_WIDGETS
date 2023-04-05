const data = props.data ?? Social.index("Instance_time", "schedule");

if (!data) {
  return "Loading datas";
}

const thisWidgetInlineStyles = props.allWidgetsInlineStyles.instance_time_card;
const thisWidgetClassNames = props.allWidgetsClassNames.instance_time_card;

const accountId = props.accountId ?? context.accountId;
const updateInstanceTimeState = props.updateInstanceTimeState;
const tabs = props.tabs;
const style = props.style ?? "large";
const font_small = style == "small" ? "0.8rem" : "0.9rem";
const font_big = style == "small" ? "0.8rem" : "1rem";

const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

State.init({
  is_on: false,
});

var sortedData =
  data && data.length
    ? data.sort((d1, d2) => d1.blockHeight - d2.blockHeight)
    : [];
var finalData = {
  accountId: "",
  time_zone: "(UTC-04:00) Atlantic Time",
  value: {
    _data: [
      {
        on_off: "off",
        data: [],
      },
      {
        on_off: "off",
        data: [],
      },
      {
        on_off: "off",
        data: [],
      },
      {
        on_off: "off",
        data: [],
      },
      {
        on_off: "off",
        data: [],
      },
      {
        on_off: "off",
        data: [],
      },
      {
        on_off: "off",
        data: [],
      },
    ],
  },
};

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

const getFormatedTime = (time) => {
  const hours = parseInt(time);
  const mins = (time - hours) * 60;
  let formated =
    hours > 12
      ? `${hours - 12}:${mins == 0 ? "00" : mins} PM`
      : `${hours}:${mins == 0 ? "00" : mins} AM`;
  return formated;
};

var date = new Date();
var utc_offset = -date.getTimezoneOffset() / 60;
for (let i = 0; i < sortedData.length; i++) {
  if (sortedData[i].accountId == accountId) {
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
      accountId: sortedData[i].accountId,
      is_on: sortedData[i].value._is_on,
      time_zone: sortedData[i].value._time_zone,
      value: {
        _data: weeklyData,
      },
    };
  }
}

function sliceString(string, newStringLength) {
  if (string.length > newStringLength) {
    return string.slice(0, newStringLength) + "...";
  }
  return string;
}

const code = `
<script>
    window.addEventListener("message", (event) => {
        setInterval(() => event.source.postMessage("ping", "*"), event.data.timeout);
    });
</script>
`;

function onInterval() {
  const day = new Date().getDay() == 0 ? 6 : new Date().getDay() - 1;
  const hours = new Date().getHours();
  const mins = new Date().getMinutes();
  const now = hours + mins / 60;
  var is_on = false;
  var temp = finalData.value._data[day];
  if (temp.on_off == "on") {
    for (var j = 0; j < temp.data.length; j++) {
      if (now >= temp.data[j]._from && now < temp.data[j]._to) {
        is_on = true;
      }
    }
  }
  State.update({ is_on: is_on });
}

return (
  <div>
    <iframe
      style={{ height: "0px" }}
      srcDoc={code}
      message={{ timeout: 1000 }}
      onMessage={onInterval}
    />

    <div
      className={thisWidgetClassNames.widgetGeneralContainer}
      style={thisWidgetInlineStyle.widgetGeneralContainer}
    >
      <div style={thisWidgetInlineStyles.generalContainer}>
        <div className={thisWidgetClassNames.widgetHeaderContainer}>
          <h2 style={thisWidgetInlineStyles.widgetTitle}>
            {tabs.OPEN_SCHEDULE.text}
          </h2>
          <i
            className={thisWidgetClassNames.closeIcon}
            style={thisWidgetInlineStyles.closeIcon}
            onClick={() => {
              updateInstanceTimeState({
                tab: props.prevTab,
              });
            }}
          ></i>
        </div>
        <div className={thisWidgetClassNames.widgetBodyContainer}>
          <div className={thisWidgetClassNames.userInfoContainer}>
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                accountId,
                className: "float-start d-inline-block me-2",
                style: {
                  width: style == "small" ? "2.5rem" : "3.5rem",
                  height: style == "small" ? "2.5rem" : "3.5rem",
                  aspectRatio: "1",
                  marginLeft: font_small,
                  borderRadius: "100%",
                  overflow: "hidden",
                },
              }}
            />
            <div>
              <p style={thisWidgetInlineStyles.shceduleOfText}>Schedule of</p>
              <p style={thisWidgetInlineStyles.showAccountId}>
                {sliceString(accountId, 18)}
              </p>
            </div>
          </div>
          <div className={thisWidgetClassNames.sheculeStatusContainer}>
            <span
              style={
                state.is_on
                  ? thisWidgetInlineStyles.scheduleStatusOn
                  : thisWidgetInlineStyles.scheduleStatusOff
              }
            >
              {state.is_on ? "on" : "off"}
            </span>
            {accountId == context.accountId && (
              <button
                onClick={updateInstanceTimeState({
                  tab: tabs.NEW_SCHEDULE.id,
                  prevTab: tabs.OPEN_SCHEDULE.id,
                })}
                onMouseEnter={() => {
                  State.update({ hoveringElement: "edit" });
                }}
                onMouseLeave={() => {
                  State.update({ hoveringElement: "" });
                }}
                style={
                  state.hoveringElement == "edit"
                    ? thisWidgetInlineStyles.editScheduleButtonHovering
                    : thisWidgetInlineStyles.editScheduleButton
                }
              >
                Edit Schedules
              </button>
            )}
          </div>
        </div>
        <div className={thisWidgetClassNames.instanceTimeTextContainer}>
          <div style={thisWidgetInlineStyles.instanceTimeTextDecorativeDiv}>
            {/*Decorative div, do not delete*/}
          </div>
          <h2 style={thisWidgetInlineStyles.instanceTimeText}>Instance Time</h2>
        </div>
        <div style={thisWidgetInlineStyles.otherWidgetsContainer}>
          <div style={thisWidgetInlineStyles.instanceTimeShareGeneralContainer}>
            <div style={thisWidgetInlineStyles.instanceTimeShareContainer}>
              <Widget
                src={`${widgetOwner}/widget/Instance_time_share`}
                props={{
                  accountId,
                }}
              />
            </div>
          </div>

          <div style={thisWidgetInlineStyles.showCurrentTimecontainer}>
            <Widget
              src={`${widgetOwner}/widget/ShowCurrentTime`}
              props={{
                time_zone: finalData.time_zone,
                style: {
                  display: "flex",
                },
              }}
            />
          </div>
        </div>
        <Widget
          src={`${widgetOwner}/widget/Instance_time_schedule_card`}
          props={{
            schedule_data: finalData,
            style: {
              display: "flex",
            },
          }}
        />
      </div>
    </div>
  </div>
);
