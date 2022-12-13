if (!props.timeInFuture) return "timeInFuture prop not set";

State.init({
  now: Date.now(),
});

const timeMs = props.timeInFuture;

function timeInFuture(timeInMillis) {
  let negative = timeInMillis < 0;
  timeInMillis = Math.abs(timeInMillis);
  let timesString = [];
  const timeInSeconds = Math.floor(timeInMillis / 1000);
  const s = timeInSeconds % 60;
  if (s == 1) {
    timesString.push(`1 second`);
  } else if (s > 1 && s < 60) {
    timesString.push(`${s} seconds`);
  }
  const timeInMinutes = (timeInSeconds - s) / 60;
  const m = timeInMinutes % 60;
  if (m == 1) {
    timesString.push(`1 minute`);
  } else if (m > 1 && m < 60) {
    timesString.push(`${m} minutes`);
  }
  const timeInHours = (timeInMinutes - m) / 60;
  const h = timeInHours % 24;
  if (h == 1) {
    timesString.push(`1 hour`);
  } else if (h > 1 && h < 24) {
    timesString.push(`${h} hours`);
  }
  const timeInDays = (timeInHours - h) / 24;
  const d = timeInDays;
  if (d == 1) {
    timesString.push(`1 day`);
  } else if (d > 1) {
    timesString.push(`${d} days`);
  }
  let output = "";
  if (props.reduced) {
    output = timesString[timesString.length - 1];
  } else {
    output = timesString.reverse().join(" ");
  }
  if (negative) output += " ago";
  return output;
}

return timeInFuture(timeMs - state.now);
