const data = props.data;

const thisWidgetClassNames = props.allWidgetsClassNames.instance_time_review;
const thisWidgetInlineStyles =
  props.allWidgetsInlineStyles.instance_time_review;

const _account = props.accountId ?? "All";
const tabs = props.tabs;
const owner = context.accountId;
const text = props.text;
const updateInstanceTimeState = props.updateInstanceTimeState;

State.init({
  is_on: [],
  accounts: [],
});

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

var sortedData =
  data && data.length
    ? data.sort((d1, d2) => d2.blockHeight - d1.blockHeight)
    : [];
var finalData = [];
var accountIds = ["All"];

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

var date = new Date();
var utc_offset = -date.getTimezoneOffset() / 60;
for (let i = 0; i < sortedData.length; i++) {
  if (accountIds.indexOf(sortedData[i].accountId) < 0) {
    accountIds.push(sortedData[i].accountId);

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

    finalData.push({
      accountId: sortedData[i].accountId,
      is_on: sortedData[i].value._is_on,
      time_zone: sortedData[i].value._time_zone,
      value: {
        _data: weeklyData,
      },
    });
  }
}

const getFormatedTime = (time) => {
  const hours = parseInt(time);
  const mins = (time - hours) * 60;
  let formated =
    hours > 12
      ? `${hours - 12}:${mins == 0 ? "00" : mins} PM`
      : `${hours}:${mins == 0 ? "00" : mins} AM`;
  return formated;
};

setInterval(() => {
  const day = new Date().getDay() == 0 ? 6 : new Date().getDay() - 1;
  const hours = new Date().getHours();
  const mins = new Date().getMinutes();
  const now = hours + mins / 60;
  var is_on_all = [];
  var accounts = [];
  for (var i = 0; i < finalData.length; i++) {
    var is_on = false;
    var temp = finalData[i].value._data[day];
    if (temp.on_off == "on") {
      for (var j = 0; j < temp.data.length; j++) {
        if (now >= temp.data[j]._from && now < temp.data[j]._to) {
          is_on = true;
        }
      }
    }
    accounts.push(finalData[i].accountId);
    is_on_all.push(is_on);
  }

  State.update({ is_on: is_on_all, accounts: accounts });
}, 1000);

function makeStringShorter(string, length) {
  if (string.length > length) {
    return string.slice(0, length) + "...";
  }
  return string;
}

return (
  <div
    className={thisWidgetClassNames.generalContainer}
    style={thisWidgetInlineStyles.generalContainer}
  >
    <div className={thisWidgetClassNames.widgetHeaderContainer}>
      <h2 style={thisWidgetInlineStyles.titleInHeader}>{text}</h2>
      <p
        className={thisWidgetClassNames.textInheader}
        style={thisWidgetInlineStyles.textInheader}
      >
        {`Your time is UTC ${getFormatedTime(
          new Date().getTimezoneOffset() / 60
        )} ${new Date()
          .toLocaleDateString(undefined, {
            day: "2-digit",
            timeZoneName: "long",
          })
          .substring(4)}`}
      </p>
    </div>
    <div className={thisWidgetClassNames.cardsContainer}>
      {finalData
        ? finalData.map((d) => {
            if (_account == "All" || _account == d.accountId) {
              const profileName = Social.getr(`${d.accountId}/profile`).name;

              if (!profileName) {
                return "Loading";
              }
              return (
                <div
                  style={
                    context.accountId != d.accountId
                      ? thisWidgetInlineStyles.cardGeneralContainerDisabled
                      : cardGeneralContainer
                  }
                  onClick={() => {
                    updateInstanceTimeState({
                      userScheduleShown: d.accountId,
                      prevTab:
                        _account == "All"
                          ? tabs.ALL_SCHEDULE.id
                          : tabs.MY_SCHEDULE.id,
                      tab: tabs.OPEN_SCHEDULE.id,
                    });
                  }}
                >
                  <div style={thisWidgetInlineStyles.cardContainer}>
                    <div
                      style={thisWidgetInlineStyles.cardHeaderGeneralContainer}
                    >
                      <div style={thisWidgetInlineStyles.cardHeaderUserInfo}>
                        <Widget
                          src="mob.near/widget/ProfileImage"
                          props={{
                            accountId: d.accountId,
                            className: "d-inline-block",
                            style: {
                              width: "2em",
                              height: "2em",
                              fontSize: "xx-large",
                            },
                          }}
                        />
                        <div>{profileName}</div>
                      </div>
                      <div style={thisWidgetInlineStyles.cardBodyContainer}>
                        <div style={thisWidgetInlineStyles.cardBodyUserInfo}>
                          {makeStringShorter(d.accountId, 12)}
                        </div>
                        <div
                          style={
                            thisWidgetInlineStyles.cardBodyContentContainer
                          }
                        >
                          <div>
                            <div
                              style={thisWidgetInlineStyles.contentSeparation}
                            >
                              <span
                                style={
                                  state.is_on[
                                    state.accounts.indexOf(d.accountId)
                                  ]
                                    ? thisWidgetInlineStyles.statusIndicationOn
                                    : thisWidgetInlineStyles.statusIndicationOff
                                }
                              >
                                {state.is_on[
                                  state.accounts.indexOf(d.accountId)
                                ]
                                  ? "on"
                                  : "off"}
                              </span>
                            </div>
                          </div>
                          <div>{d.time_zone}</div>
                        </div>
                      </div>
                    </div>
                    {d.value._data.map((week, index) => {
                      return (
                        <div style={thisWidgetInlineStyles.valuesContainer}>
                          <div style={thisWidgetInlineStyles.daysContainer}>
                            {`${days[index]}`}
                          </div>
                          <div className="d-flex">
                            {week.on_off == "on" ? (
                              week.data.map((y) => (
                                <p style={thisWidgetInlineStyles.timeContainer}>
                                  {getFormatedTime(y._from)}~
                                  {getFormatedTime(y._to)}
                                </p>
                              ))
                            ) : (
                              <span
                                style={thisWidgetInlineStyles.offIndication}
                              >
                                Off
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })
        : "Loading..."}
    </div>
  </div>
);
