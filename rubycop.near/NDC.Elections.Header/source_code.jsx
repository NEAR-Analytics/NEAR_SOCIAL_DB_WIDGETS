const { startTime, endTime, type } = props;

State.init({
  days: "-",
  hours: "-",
  minutes: "-",
  seconds: "-",
  title: "",
});

const formatTime = (time) => (time < 10 ? `0${time}` : time);

const timer = setInterval(() => {
  const now = new Date().getTime();
  const start = new Date(parseInt(startTime)).getTime();
  const end = new Date(parseInt(endTime)).getTime();
  let title = "";

  if (now < start)
    title = (
      <>
        Time before <br /> {type} starts
      </>
    );
  else if (now > start && now < end)
    title = (
      <>
        Time remaining in <br /> current {type}
      </>
    );
  else title = <>{type} is ended;</>;

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
    title: title,
  });

  clearInterval(timer);
}, 1000);

const Logo = styled.img`
    width: 60px;
    margin: 0 20px 0 10px;
`;

const H1 = styled.h1`
  font-size: 40px;
  font-weight: 500;
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
    font-weight: 700;
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
    <Logo src="https://pbs.twimg.com/profile_images/1622941553839816707/nmf3MWw1_400x400.jpg" />
    <H1>NDC Elections</H1>
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
      <H6>{state.title}</H6>
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
    <div className="p-4 bg-black text-white d-none d-lg-flex rounded justify-content-between align-items-center">
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
