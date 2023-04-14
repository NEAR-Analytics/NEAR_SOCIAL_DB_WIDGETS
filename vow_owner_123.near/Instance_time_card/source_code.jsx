const accountId = props.accountId;
const data = Social.index("Instance_time", "schedule");
if (!data) {
  return "Loading datas";
}
var sortedData = data.sort((d1, d2) => d1.blockHeight - d2.blockHeight);
var finalData = {};

for (let i = 0; i < sortedData.length; i++) {
  if (sortedData[i].accountId == accountId) {
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

console.log("*****", accountId, finalData);

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
          maxWidth: "1000px",
          height: "1000px",
          margin: "2rem 0.5rem 2rem 2rem",
          borderRadius: "18px",
          background: "white",
          boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
        }}
      >
        <div className="d-flex justify-content-between">
          <div className="d-flex">
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
              <p style={{ fontWeight: "500" }}>
                {sliceString(context.accountId, 18)}
              </p>
            </div>
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
                  d.is_on == "on" ? "rgb(217, 252, 239)" : "rgb(255, 229, 229)",
                textAlign: "center",
                borderRadius: "16px",
                fontSize: "0.8rem",
                color:
                  d.is_on == "on" ? "rgb(0, 179, 125)" : "rgb(255, 71, 71)",
                fontWeight: "500",
                padding: "0.5rem 1rem",
              }}
            >
              {d.is_on ?? "off"}
            </span>
          </div>

          <div>{"d.time_zone"}</div>
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
          <p style={{ fontSize: "0.9rem" }}>
            {showDescription(state.poll.value.description)}
          </p>
          <div
            style={{
              position: "absolute",
              bottom: "-1.125rem",
              left: "0",
              right: "0",
              marginRight: "auto",
              marginLeft: "auto",
              textAlign: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);
