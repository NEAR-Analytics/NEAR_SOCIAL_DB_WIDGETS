const _account = props.accountId ?? "All";
console.log("accountId", props.accountId);
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
const container_on = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  padding: "1rem",
  margin: "0.5rem",
  background: "white",
  color: "black",
  fontWeight: 400,
  fontSize: "16px",
  borderRadius: "1rem",
  border: "1px solid black",
  flexDirection: "column",
};
const container_off = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  padding: "1rem",
  margin: "0.5rem",
  background: "grey",
  fontWeight: 400,
  fontSize: "16px",
  borderRadius: "1rem",
  border: "1px solid black",
  flexDirection: "column",
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
const data = Social.index("Instance_time", "data");
if (!data) {
  return "Loading datas";
}
var sortedData = data.sort((d1, d2) => d2.blockHeight - d1.blockHeight);
var finalData = [];
var accountIds = ["All"];

const sortAndRemoveRepeated = (flag, data) => {
  var temp = data;
  console.log("temp", temp);
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
  if (accountIds.indexOf(sortedData[i].accountId) < 0) {
    accountIds.push(sortedData[i].accountId);
    var date = new Date();
    var utc_offset = -date.getTimezoneOffset() / 60;
    var times = sortedData[i].value._data;
    var temp = [];
    var flag = false;
    console.log("times", times);
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
    console.log("final", final);
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
    console.log(weeklyData);
    finalData.push({
      accountId: sortedData[i].accountId,
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
  <div className="w-100">
    {finalData
      ? finalData.map((d) => {
          if (_account == "All" || _account == d.accountId) {
            return (
              <div style={card}>
                <Widget
                  src="mob.near/widget/ProfileImage"
                  props={{
                    accountId: d.accountId,
                    className: "d-inline-block",
                    style: {
                      width: "1.5em",
                      height: "1.5em",
                      fontSize: "x-large",
                    },
                  }}
                />
                <a
                  href={`#/mob.near/widget/ProfilePage?accountId=${d.accountId}`}
                >
                  {d.accountId}
                </a>
                <div>
                  <div className="d-flex flex-row">
                    {d.value._data.map((week, index) => {
                      return (
                        <div
                          style={
                            week.on_off == "on" ? container_on : container_off
                          }
                        >
                          <div>{`${days[index]}`}</div>
                          <div>
                            {week.data.map((y) => (
                              <div>
                                <br />
                                <div>{getFormatedTime(y._from)}</div>~
                                <div>{getFormatedTime(y._to)}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }
        })
      : "Loading..."}
  </div>
);
