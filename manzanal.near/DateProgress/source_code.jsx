const UPDATE_INTERVAL = props.updateInterval ?? 10000;
const getProgress = () => {
  const date = new Date();
  const months = [
    31,
    28 +
      (date.getFullYear() % 4 === 0 ||
      (date.getFullYear() % 400 === 0 && date.getFullYear() % 100 !== 0)
        ? 1
        : 0),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  const yearProgress = () => {
    let sum = 0;

    months.forEach(
      (month, index) =>
        (sum +=
          index < date.getMonth()
            ? month
            : index === date.getMonth()
            ? date.getDate()
            : 0)
    );

    sum--;
    sum +=
      (date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) /
      24;

    const yearDays =
      date.getFullYear() % 4 === 0 ||
      (date.getFullYear() % 400 === 0 && date.getFullYear() % 100 !== 0)
        ? 366
        : 365;

    return (sum / yearDays) * 100;
  };

  const monthProgress = () => {
    let sum = date.getDate() - 1;

    sum +=
      (date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) /
      24;

    return (sum / months[date.getMonth()]) * 100;
  };

  const dayProgress =
    ((date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) /
      24) *
    100;

  const workDayProgress = () => {
    let timeRange = 0;
    let timeDay = "";

    if (date.getHours() < 6) timeDay = "Early Morning";
    else if (date.getHours() < 12) {
      timeDay = "Morning";
      num = 6;
    } else if (date.getHours() < 18) {
      timeDay = "Afternoon";
      num = 12;
    } else {
      timeDay = "Night";
      num = 18;
    }

    return {
      timeDay,
      progress:
        ((date.getHours() -
          timeRange +
          date.getMinutes() / 60 +
          date.getSeconds() / 3600) /
          6) *
        100,
    };
  };

  return {
    yearProgress: yearProgress(),
    monthProgress: monthProgress(),
    dayProgress: dayProgress,
    workDayProgress: workDayProgress(),
  };
};

if (state === undefined) {
  State.init({ ...getProgress() });
  setInterval(() => {
    State.update((state) => ({
      ...state,
      ...getProgress(),
    }));
  }, UPDATE_INTERVAL);
}

const ProgressBar = styled.div`
   width:${(props) => props.width}%
`;

return (
  <>
    <h3>Date Progress</h3>
    <div class="d-grid gap-3">
      <div class="column justify-content-evenly">
        <p class="fs-7 fw-light text text-muted">
          {" "}
          <i class="bi-calendar" />
          Year
        </p>
        <div class="progress">
          <ProgressBar
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={state.yearProgress}
            aria-valuemin="0"
            aria-valuemax="100"
            width={state.yearProgress}
          >
            {Math.round(state.yearProgress)}%
          </ProgressBar>
        </div>
      </div>
      <div class="column justify-content-evenly">
        <p class="fs-7 fw-light text text-muted">
          <i class="bi-calendar-month" /> Month
        </p>
        <div class="progress">
          <ProgressBar
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={state.monthProgress}
            aria-valuemin="0"
            aria-valuemax="100"
            width={state.monthProgress}
          >
            {Math.round(state.monthProgress)}%
          </ProgressBar>
        </div>
      </div>
      <div class="column justify-content-evenly">
        <p class="fs-7 fw-light text text-muted">
          {" "}
          <i class="bi-calendar-day" /> Day
        </p>
        <div class="progress">
          <ProgressBar
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={state.dayProgress}
            aria-valuemin="0"
            aria-valuemax="100"
            width={state.dayProgress}
          >
            {Math.round(state.dayProgress)}%
          </ProgressBar>
        </div>
      </div>
      <div class="column justify-content-evenly">
        <p class="fs-7 fw-light text text-muted">
          <i class="bi-calendar4-range" />
          Workday - {state.workDayProgress.timeDay}
        </p>
        <div class="progress">
          <ProgressBar
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={state.workDayProgress.progress}
            aria-valuemin="0"
            aria-valuemax="100"
            width={state.workDayProgress.progress}
          >
            {Math.round(state.workDayProgress.progress)}%
          </ProgressBar>
        </div>
      </div>
    </div>
  </>
);
