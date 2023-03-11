const data = props.data;

const _account = props.accountId ?? "All";
const tabs = props.tabs;
const owner = context.accountId;
const text = props.text;
const updateInstanceTimeState = props.updateInstanceTimeState;

State.init({
  is_on: [],
  accounts: [],
});

const card = {
  border: "1px solid black",
  borderRadius: "5px",
  textAlign: "center",
  color: "white",
  padding: "10px",
  margin: "1rem",
};
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
  console.log(accountIds.indexOf(sortedData[i].accountId) < 0);
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
    className="px-4"
    style={{
      borderRadius: "3px",
      backgroundColor: "rgb(230, 230, 230)",
      width: "100%",
      padding: "0.5rem",
    }}
  >
    <div className="d-flex justify-content-between">
      <h2 style={{ margin: "2rem 0 0.5rem 0", fontWeight: "700" }}>{text}</h2>
      <p className="m-0 pt-3" style={{ margin: "0px", fontSize: "0.8rem" }}>
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: " repeat(3, 1fr)",
      }}
    >
      {finalData
        ? finalData.map((d) => {
            if (_account == "All" || _account == d.accountId) {
              const profileName = Social.getr(`${d.accountId}/profile`).name;

              if (!profileName) {
                return "Loading";
              }
              return (
                <div
                  style={{
                    boxSizing: "border-box",
                    boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "1rem",
                    margin: "8px",
                    cursor: "pointer",
                    disable: context.accountId != d.accountId,
                    textDecoration: "none",
                  }}
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
                  <div
                    style={{
                      padding: "1rem",
                    }}
                  >
                    <div
                      style={{
                        paddingBottom: "0.5rem",
                        borderBottom: "2px solid grey",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
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
                      <div
                        style={{
                          paddingLeft: "0.5rem",
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "800",
                          }}
                        >
                          {makeStringShorter(d.accountId, 12)}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                margin: "0.5rem 0rem",
                              }}
                            >
                              <span
                                style={{
                                  backgroundColor: state.is_on[
                                    state.accounts.indexOf(d.accountId)
                                  ]
                                    ? "rgb(217, 252, 239)"
                                    : "rgb(255, 229, 229)",
                                  textAlign: "center",
                                  borderRadius: "16px",
                                  fontSize: "0.8rem",
                                  color: state.is_on[
                                    state.accounts.indexOf(d.accountId)
                                  ]
                                    ? "rgb(0, 179, 125)"
                                    : "rgb(255, 71, 71)",
                                  fontWeight: "500",
                                  padding: "0.5rem 1rem",
                                }}
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
                        <div
                          style={{
                            paddingTop: "1rem",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "1rem",
                              fontWeight: "600",
                            }}
                          >{`${days[index]}`}</div>
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            {week.on_off == "on" ? (
                              week.data.map((y) => (
                                <p
                                  style={{
                                    display: "flex",
                                    fontSize: "0.9rem",
                                    paddingRight: "0.9rem",
                                  }}
                                >
                                  {getFormatedTime(y._from)}~
                                  {getFormatedTime(y._to)}
                                </p>
                              ))
                            ) : (
                              <span
                                style={{
                                  backgroundColor: "#FFE5E5",
                                  textAlign: "center",
                                  borderRadius: "16px",
                                  marginRight: "1rem",
                                  fontSize: "0.8rem",
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
                </div>
              );
            }
          })
        : "Loading..."}
    </div>
  </div>
);
