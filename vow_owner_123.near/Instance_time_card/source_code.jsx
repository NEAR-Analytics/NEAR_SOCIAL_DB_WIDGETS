const accountId = props.accountId ?? context.accountId;
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
      accountId: sortedData[i].accountId,
      is_on: sortedData[i].value._is_on,
      time_zone: sortedData[i].value._time_zone,
      value: {
        _data: weeklyData,
      },
    };
  }
}
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

State.init({
  showQuestionsByThisUser: false,
  descriptionHeightLimited: true,
  poll: {},
  polls: [{}],
  profile: {},
  pollsByThisCreator: [{}],
  answers: [{}],
});

function sliceString(string, newStringLength) {
  if (string.length > newStringLength) {
    return string.slice(0, newStringLength) + "...";
  }
  return string;
}

const renderQuestionsByThisCreator = () => {
  return <></>;
};

function showDescription(description) {
  if (state.descriptionHeightLimited && description.length > 501) {
    return description.slice(0, 500) + "...";
  } else {
    return description;
  }
}

return (
  <div>
    <div className="d-flex content-align-start justify-content-between">
      <div
        style={{
          width: "100%",
          margin: "2rem 0.5rem 2rem 2rem",
          borderRadius: "18px",
          background: "white",
          boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
        }}
      >
        <div className="d-flex justify-content-between">
          <div
            className="d-flex"
            style={{
              justifyContent: "space-between",
            }}
          >
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                profile,
                question: state.poll.accountId,
                className: "float-start d-inline-block me-2",
                style: {
                  width: "3.5rem",
                  aspectRatio: "1",
                  marginLeft: "1rem",
                  borderRadius: "100%",
                  overflow: "hidden",
                },
              }}
            />
            <div>
              <p style={{ margin: "0", fontWeight: "300" }}>Created by</p>
              <p style={{ fontWeight: "500" }}>{sliceString(accountId, 18)}</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <a
              href="https://near.social/#/vow_owner_123.near/widget/Instance_time"
              onMouseEnter={() => {
                State.update({ hoveringElement: "view" });
              }}
              onMouseLeave={() => {
                State.update({ hoveringElement: "" });
              }}
              style={
                state.hoveringElement == "view"
                  ? {
                      border: "2px solid transparent",
                      fontWeight: "500",
                      fontSize: "1rem",
                      padding: "0.3rem 1.5rem",
                      backgroundColor: "#010A2D",
                      borderRadius: "12px",
                      color: "white",
                      textDecoration: "none",
                      marginBottom: "0.5rem",
                    }
                  : {
                      border: "2px solid black",
                      color: "black",
                      backgroundColor: "white",
                      fontWeight: "500",
                      fontSize: "1rem",
                      padding: "0.3rem 1.5rem",
                      borderRadius: "12px",
                      textDecoration: "none",
                      marginBottom: "0.5rem",
                    }
              }
            >
              View Schedules
            </a>
            <a
              href="https://near.social/#/vow_owner_123.near/widget/Instance_time_edit"
              onMouseEnter={() => {
                State.update({ hoveringElement: "edit" });
              }}
              onMouseLeave={() => {
                State.update({ hoveringElement: "" });
              }}
              style={
                state.hoveringElement == "edit"
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
                      textDecoration: "none",
                    }
              }
            >
              Edit Schedules
            </a>
          </div>
        </div>
        <div className="d-flex my-3">
          <div
            style={{
              height: "inherit",
              backgroundColor: "#AAC8F7",
              width: "0.5rem",
              minWidth: "5px",
              marginRight: "0.5rem",
              borderRadius: "8px",
            }}
          >
            {/*Decorative div, do not delete*/}
          </div>
          <h2
            style={{
              fontWeight: "700",
              fontSize: "2rem",
              letterSpacing: "0.1px",
              color: "#010A2D",
              wordWrap: "anywhere",
            }}
          >
            Instance Time
          </h2>
        </div>
        <div
          style={{
            position: "relative",
            width: "max-content",
            display: "flex",
            padding: "0.5rem 1rem",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                paddingRight: "2rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Widget
                src={`vow_owner_123.near/widget/Instance_time_share`}
                props={{ accountId: "vow_owner_123.near" }}
              />
            </div>
            <span
              style={{
                backgroundColor:
                  finalData.is_on == "on"
                    ? "rgb(217, 252, 239)"
                    : "rgb(255, 229, 229)",
                textAlign: "center",
                borderRadius: "16px",
                fontSize: "0.8rem",
                color:
                  finalData.is_on == "on"
                    ? "rgb(0, 179, 125)"
                    : "rgb(255, 71, 71)",
                fontWeight: "500",
                padding: "0.5rem 1rem",
              }}
            >
              {finalData.is_on ?? "off"}
            </span>
          </div>

          <div>{finalData.time_zone}</div>
        </div>
        <div
          className="p-3"
          style={{
            position: "relative",
            border: "1.5px solid rgb(206, 212, 218)",
            borderRadius: "24px",
            wordWrap: "anywhere",
            width: "100%",
          }}
        >
          <h3
            style={{
              fontWeight: "700",
              fontSize: "1.2rem",
              marginBottom: "1.2rem",
            }}
          >
            Schedule
          </h3>
          {finalData.value._data.map((week, index) => {
            return (
              <div
                style={{
                  paddingTop: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>{`${days[index]}`}</div>
                <div style={{ display: "flex" }}>
                  {week.on_off == "on" ? (
                    week.data.map((y) => (
                      <p style={{ paddingRight: "0.7rem" }}>
                        {getFormatedTime(y._from)}~{getFormatedTime(y._to)}
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
    </div>
  </div>
);
