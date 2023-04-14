const _account = props.accountId ?? "All";
const owner = context.accountId;
const card = {
  border: "1px solid black",
  borderRadius: "5px",
  textAlign: "center",
  color: "white",
  padding: "10px",
  margin: "1rem",
};
const comboBox = {
  background: "black",
  color: "white",
  borderRadius: "1rem",
  padding: "1rem",
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
const data = Social.index("Instance_time", "schedule");
if (!data) {
  return "Loading datas";
}
var sortedData = data.sort((d1, d2) => d2.blockHeight - d1.blockHeight);
var finalData = [];
var accountIds = ["All"];

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

return (
  <div
    style={{
      borderRadius: "3px",
      backgroundColor: "rgb(230, 230, 230)",
      width: "100%",
      padding: "0.5rem",
    }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: " repeat(3, 1fr)",
      }}
    >
      {finalData
        ? finalData.map((d) => {
            if (_account == "All" || _account == d.accountId) {
              return (
                <a
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
                  href={`https://near.social/#/vow_owner_123.near/widget/Instance_time_card?accountId=${d.accountId}`}
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
                        <div>{Social.getr(`${d.accountId}/profile`).name}</div>
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
                          {d.accountId}
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
                                  backgroundColor:
                                    d.is_on == "on"
                                      ? "rgb(217, 252, 239)"
                                      : "rgb(255, 229, 229)",
                                  textAlign: "center",
                                  borderRadius: "16px",
                                  fontSize: "0.8rem",
                                  color:
                                    d.is_on == "on"
                                      ? "rgb(0, 179, 125)"
                                      : "rgb(255, 71, 71)",
                                  fontWeight: "500",
                                  padding: "0.5rem 1rem",
                                }}
                              >
                                {d.is_on ?? "off"}
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
                          <div>{`${days[index]}`}</div>
                          <div>
                            {week.on_off == "on" ? (
                              week.data.map((y) => (
                                <div>
                                  {getFormatedTime(y._from)}~
                                  {getFormatedTime(y._to)}
                                </div>
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
                </a>
              );
            }
          })
        : "Loading..."}
    </div>
  </div>
);
