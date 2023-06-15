const { end } = props;

State.init({
  days: "-",
  hours: "-",
  minutes: "-",
  seconds: "-",
});

const formatTime = (time) => (time < 10 ? `0${time}` : time);

const timer = setInterval(() => {
  const diff = new Date(parseInt(end)).getTime() - new Date().getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  State.update({
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  });

  clearInterval(timer);
}, 1000);

const Logo = styled.img`
    width: 130px;
`;

const H1 = styled.h1`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 0;
`;

const H6 = styled.h6`
  font-size: 12px;
  font-weight: 300;
  margin-right: 32px;
  margin-bottom: 0;
  line-height: 1.5;
  align-items: center;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const Timer = styled.div`
  .time {
    font-size: 48px;
    font-weight: 800;
    color: #FFD50D;
    width: 100px;
    line-height: 1;
  }
  small {
    margin-bottom: 0;
    align-items: center;
  }
`;

const TimerContainer = styled.div`
  .time {
    font-size: 48px;
    font-weight: 800;
    color: #FFD50D;
    width: 100px;
    line-height: 1;
  }
  small {
    margin-bottom: 0;
    align-items: center;
  }
`;

const SmallTimerContainer = styled.div`
  background: #FFD50D;

  .time {
    font-size: 36px;
    font-weight: 700;
    color: #000;
    width: 70px;
    line-height: 1;
  }
  small {
    margin-bottom: 0;
    align-items: center;
    color: grey;
  }
`;

const TitleContainer = () => (
  <>
    <Logo src="https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq" />
    <H1>NDC Nomination</H1>
  </>
);

const TimerContent = () => {
  const TimeSlot = ({ time, title }) => (
    <div>
      <div className="time">{formatTime(time)}</div>
      <small>{title}</small>
    </div>
  );

  return (
    <>
      <H6>
        Time remaining in <br /> current nomination
      </H6>
      <Timer className="d-flex">
        <TimeSlot title="days" time={state.days} />
        <TimeSlot title="hours" time={state.hours} />
        <TimeSlot title="minutes" time={state.minutes} />
        <TimeSlot title="seconds" time={state.seconds} />
      </Timer>
    </>
  );
};

return (
  <>
    <div className="px-3 py-2 bg-black text-white d-none d-lg-flex rounded justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <TitleContainer />
      </div>
      <TimerContainer className="d-flex align-items-center">
        <TimerContent />
      </TimerContainer>
    </div>
    <div className="d-md-flex row d-lg-none d-xl-none rounded bg-black">
      <div className="d-flex align-items-center justify-content-center rounded-top bg-black text-white">
        <TitleContainer />
      </div>
      <SmallTimerContainer className="d-flex p-3 align-items-center rounded-bottom justify-content-between">
        <TimerContent />
      </SmallTimerContainer>
    </div>
  </>
);
