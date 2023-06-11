// props
// {
//   "date": "June 20, 2023 1:00:00"
// }

const countDownDate = props.date.getTime();

State.init({
  hours: "-",
  minutes: "-",
  seconds: "-",
  timerType: "0",
});

const formatTime = (time) => (time < 10 ? `0${time}` : time);

const timer = setInterval(() => {
  const distance = new Date(props.date).getTime() - new Date().getTime();

  const seconds = Math.floor((distance / 1000) % 60);
  const minutes = Math.floor((distance / 1000 / 60) % 60);
  const hours = Math.floor(distance / (1000 * 60 * 60));

  State.update({
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  });

  clearInterval(timer);
}, 1000);

const handleChange = (event) =>
  State.update({
    timerType: event.target.value,
  });

const Logo = styled.img`
    width: 70px;
    z-index: 1;
    border-radius: 50%;
    margin-right: 30px;
`;

const H1 = styled.h1`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 0;
`;

const H6 = styled.h6`
  font-size: 14px;
  font-weight: 300;
  margin-right: 10px;
  margin-bottom: 0;
`;

const Timer = styled.h2`
  font-size: 44px;
  font-weight: 300;
  margin-right: 20px;
  margin-bottom: 0;
`;

return (
  <div className="p-4 bg-light rounded d-flex flex-wrap justify-content-between align-items-center">
    <div className="d-flex align-items-center w-50">
      <Logo src="https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq" />
      <H1>NDC Elections</H1>
    </div>
    <div className="d-flex align-items-center w-50">
      <H6>
        Time remaining <br /> in current election
      </H6>
      <div className="w-50">
        <Timer>
          {[
            formatTime(state.hours),
            formatTime(state.minutes),
            formatTime(state.seconds),
          ].join(" : ")}
        </Timer>
      </div>
      <div className="w-25">
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={handleChange}
          value={state.timerType}
        >
          <option value="0">Congress</option>
          <option value="1">Time</option>
        </select>
      </div>
    </div>
  </div>
);
